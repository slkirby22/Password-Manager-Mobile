import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

let authToken: string | null = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

(async () => {
  authToken = await AsyncStorage.getItem('authToken');
})();

// Modify the interceptor to use the in-memory token
apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
    console.log('Token attached to request:', authToken); // Debug
  }
  return config;
});

// Add this function to update token after login
export const setAuthToken = (token: string) => {
  authToken = token;
};

export default apiClient;