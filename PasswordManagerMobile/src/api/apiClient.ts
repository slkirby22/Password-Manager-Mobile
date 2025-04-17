import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Replace with your actual API base URL

let authToken: string | null = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

(async () => {
  authToken = await AsyncStorage.getItem('authToken');
})();

// Modify the interceptor to use the in-memory token
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// Add this function to update token after login
export const setAuthToken = (token: string) => {
  authToken = token;
};

export default apiClient;