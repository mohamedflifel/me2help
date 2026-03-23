import api from './index';

export const predictEmotionApi = async (text: string) => {
  const response = await api.post('/emotion/predict', { text });
  return response.data;
};

export const predictEmotionBatchApi = async (texts: string[]) => {
  const response = await api.post('/emotion/predict/batch', { texts });
  return response.data;
};

export const checkEmotionHealthApi = async () => {
  const response = await api.get('/emotion/health');
  return response.data;
};