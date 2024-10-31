interface ApiLog {
  timestamp: string;
  pageNames: string[];
  totalRecords: number;
}

class ApiLogsService {
  private readonly STORAGE_KEY = 'sam_api_logs';

  private async getStoredLogs(): Promise<ApiLog[]> {
    try {
      const storedLogs = localStorage.getItem(this.STORAGE_KEY);
      return storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      console.error('Error retrieving logs:', error);
      return [];
    }
  }

  async logApiCall(pageNames: string[], totalRecords: number): Promise<void> {
    try {
      const logs = await this.getStoredLogs();
      const newLog: ApiLog = {
        timestamp: new Date().toISOString(),
        pageNames,
        totalRecords
      };

      logs.push(newLog);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
      
      console.log('API call logged successfully:', newLog);
    } catch (error) {
      console.error('Failed to log API call:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Failed to log API call');
    }
  }

  async getLogs(): Promise<ApiLog[]> {
    return this.getStoredLogs();
  }

  async clearLogs(): Promise<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear logs:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Failed to clear logs');
    }
  }
}

export const apiLogsService = new ApiLogsService();