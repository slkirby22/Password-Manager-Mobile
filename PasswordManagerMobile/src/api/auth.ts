import apiClient from './apiClient';

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
};