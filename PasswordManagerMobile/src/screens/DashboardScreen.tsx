import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { getDashboardData } from '../api/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PasswordItem = {
  id: number;
  service_name: string;
  username: string;
  password: string;
  notes: string;
};

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddPassword'
>;

const DashboardScreen = () => {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardData();
      setPasswords(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', fetchData);
    return focusListener;
  }, [fetchData, navigation]);

  // Render loading state if needed
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderItem = ({ item }: { item: PasswordItem }) => (
    <View style={styles.item}>
      <Text style={styles.service}>{item.service_name}</Text>
      <Text>Username: {item.username}</Text>
      <Text>Password: {item.password}</Text>
      {item.notes && <Text>Notes: {item.notes}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Passwords</Text>
      <FlatList
        data={passwords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Password" onPress={() => navigation.navigate('AddPassword')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  service: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default DashboardScreen;