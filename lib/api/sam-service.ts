import axios from 'axios';
import { format } from 'date-fns';
import { API_ENDPOINTS } from './endpoints';
import { logger } from '@/lib/utils/logger';

interface SearchParams {
  postedFrom?: Date;
  postedTo?: Date;
  deadlineFrom?: Date;
  deadlineTo?: Date;
  limit?: number;
  offset?: number;
}

interface SamOpportunity {
  title: string;
  postedDate: string;
  responseDeadLine: string;
  description: string;
  type: string;
  solicitationNumber: string;
}

interface SamApiResponse {
  totalRecords: number;
  opportunitiesData: SamOpportunity[];
}

interface PaginatedResponse {
  totalRecords: number;
  pages: SamApiResponse[];
}

export async function searchOpportunities({
  postedFrom,
  postedTo,
  deadlineFrom,
  deadlineTo,
  limit = 1000,
  offset = 0,
}: SearchParams): Promise<PaginatedResponse> {
  const apiKey = process.env.NEXT_PUBLIC_SAM_API_KEY;
  
  if (!apiKey) {
    throw new Error('SAM.gov API key is required. Please add NEXT_PUBLIC_SAM_API_KEY to your environment variables.');
  }

  const formatDate = (date?: Date) => {
    if (!date) return undefined;
    try {
      return format(date, 'MM/dd/yyyy');
    } catch (error) {
      logger.error('Date formatting error:', error);
      return undefined;
    }
  };

  const fetchPage = async (pageOffset: number): Promise<SamApiResponse> => {
    const params = {
      api_key: apiKey,
      limit: limit.toString(),
      offset: pageOffset.toString(),
      postedFrom: formatDate(postedFrom),
      postedTo: formatDate(postedTo),
      rdlfrom: formatDate(deadlineFrom),
      rdlto: formatDate(deadlineTo),
      ptype: 'o,s,k',
      deptname: 'general',
      format: 'json'
    };

    // Remove undefined parameters
    Object.keys(params).forEach(key => 
      params[key as keyof typeof params] === undefined && delete params[key as keyof typeof params]
    );

    try {
      logger.apiRequest(API_ENDPOINTS.SAM_OPPORTUNITIES, {
        ...params,
        api_key: '***' // Hide API key in logs
      });

      const response = await axios.get<SamApiResponse>(API_ENDPOINTS.SAM_OPPORTUNITIES, {
        params,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      if (!response.data) {
        throw new Error('No data received from SAM.gov API');
      }

      logger.apiResponse(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`SAM.gov API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
        } else if (error.request) {
          throw new Error('No response received from SAM.gov API. Please check your internet connection.');
        }
      }
      throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching opportunities');
    }
  };

  // Fetch first page to get total records
  const firstPage = await fetchPage(offset);
  const totalRecords = firstPage.totalRecords;
  const pages: SamApiResponse[] = [firstPage];

  // Calculate remaining pages
  const remainingRecords = totalRecords - limit;
  if (remainingRecords > 0) {
    const totalPages = Math.ceil(totalRecords / limit);
    
    // Fetch remaining pages
    for (let currentPage = 1; currentPage < totalPages; currentPage++) {
      const pageOffset = offset + (currentPage * limit);
      const page = await fetchPage(pageOffset);
      pages.push(page);
      
      // Add delay between requests to avoid rate limiting
      if (currentPage < totalPages - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  return {
    totalRecords,
    pages
  };
}