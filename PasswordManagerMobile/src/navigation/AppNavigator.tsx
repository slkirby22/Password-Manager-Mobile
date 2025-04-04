import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddPasswordScreen from '../screens/AddPasswordScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  AddPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;