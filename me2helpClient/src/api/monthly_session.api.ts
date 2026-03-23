import api from './index';

export interface MonthlySummaryResponse {
  gratitudeCount: number;
  sessionCount: number;
  insight: string;
  month: number;
  year: number;
}

export const getMonthlySummaryApi = async (
  month: number,
  year: number
): Promise<MonthlySummaryResponse> => {
  const response = await api.get('/summary', { params: { month, year } });
  return response.data;
};