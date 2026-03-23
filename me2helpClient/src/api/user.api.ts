import api from './index';
import { AuthFormData, AuthUser } from '../types';

export const loginApi = async (
  data: Pick<AuthFormData, 'email' | 'password'>
): Promise<AuthUser> => {
  const response = await api.post('/auth/login', data);
  console.log('Login API response:', response.data);
  return response.data;
};

export const registerApi = async (data: AuthFormData): Promise<AuthUser> => {
  const response = await api.post('/auth/register', data);
  console.log('Register API response:', response.data);
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getMeApi = async (): Promise<AuthUser> => {
  const response = await api.get('/auth/me');
  console.log('Get Me API response:', response.data);
  return response.data;
};