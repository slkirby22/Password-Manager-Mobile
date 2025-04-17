import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '@/context/AuthContext';
import LoginScreen from '@/screens/LoginScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import AddPasswordScreen from '@/screens/AddPasswordScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

// Define your root stack param list for type checking
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AddPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen 
                name="Dashboard" 
                component={DashboardScreen} 
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen 
                name="AddPassword" 
                component={AddPasswordScreen}
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  title: 'Add New Password'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}