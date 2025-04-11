import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginResponse = {
  status: number;
  data: {
    access_token: string;
    user_id: number;
  };
  headers: any;
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password
    });
    
    // Return the entire response for proper error handling
    return {
      status: response.status,
      data: response.data, // Contains access_token and user_id
      headers: response.headers
    };
  } catch (error) {
    console.error('Login API error:', error);
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
    const response = await apiClient.get('/dashboard', {
      headers: {
        'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`
      }
    });
    return response.data.passwords; // Return just the passwords array
  } catch (error) {
    console.error('Dashboard error:', (error as any).response?.data || (error as any).message);
    throw error;
  }
};