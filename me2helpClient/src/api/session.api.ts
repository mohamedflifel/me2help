import api from './index';
import { Session, SessionWithMessages } from '../types';

export const getSessionsApi = async (): Promise<Session[]> => {
  const response = await api.get('/sessions');
  return response.data;
};

export const getSessionByIdApi = async (id: string): Promise<SessionWithMessages> => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

export const createSessionApi = async (title: string): Promise<Session> => {
  const response = await api.post('/sessions', { title });
  return response.data;
};

export const deleteSessionApi = async (id: string): Promise<void> => {
  await api.delete(`/sessions/${id}`);
};