import api from './index';
import { Message } from '../types';

export const sendMessageApi = async (
  sessionId: string,
  messages: { text: string }[]
): Promise<Message> => {
  const response = await api.post('/chat', { sessionId, messages });
  return response.data; // returns { id, aiResponse, emotion, timestamp }
};