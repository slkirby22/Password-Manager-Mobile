import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Portal, Dialog, Button as PaperButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import apiClient from '@/api/apiClient';
import { showAlert } from '@/utils/alertHelpers';

type PasswordItem = {
  id: number;
  service_name: string;
  username: string;
  password: string;
  notes?: string;
};

const DashboardScreen = () => {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState<number | null>(null);

  const fetchPasswords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/dashboard');
      setPasswords(response.data.passwords || []);
    } catch (error) {
      showAlert('Error', 'Failed to load passwords');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  useFocusEffect(
    useCallback(() => {
      fetchPasswords();
    }, [fetchPasswords])
  );

  const handleDelete = (passwordId: number) => {
    setPasswordToDelete(passwordId);
    setVisibleDialog(true);
  };

  const confirmDelete = async () => {
    if (!passwordToDelete) return;
    
    setDeletingId(passwordToDelete);
    try {
      await apiClient.delete(`/passwords/${passwordToDelete}`);
      setPasswords(passwords.filter(p => p.id !== passwordToDelete));
      setVisiblePasswords(visiblePasswords.filter(id => id !== passwordToDelete));
      // Show success message
      showAlert('Success', 'Password deleted successfully');
    } catch (error) {
      const errorMessage = (error as any)?.response?.data?.error || 'Failed to delete password';
      showAlert('Error', errorMessage);
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
      setPasswordToDelete(null);
      setVisibleDialog(false);
    }
  };

  const togglePasswordVisibility = (passwordId: number) => {
    setVisiblePasswords(prev => 
      prev.includes(passwordId)
        ? prev.filter(id => id !== passwordId)
        : [...prev, passwordId]
    );
  };

  const renderItem = ({ item }: { item: PasswordItem }) => (
    <View style={styles.item}>
      <Text style={styles.service}>{item.service_name}</Text>
      <Text>Username: {item.username}</Text>
      <Text>Password: {visiblePasswords.includes(item.id) ? item.password : '••••••••'}</Text>
      <TouchableOpacity onPress={() => togglePasswordVisibility(item.id)}>
        <Text style={styles.toggleText}>
          {visiblePasswords.includes(item.id) ? 'Hide' : 'Show'} Password
        </Text>
      </TouchableOpacity>
      {item.notes && <Text>Notes: {item.notes}</Text>}
      
      <Button
        title="Delete"
        onPress={() => handleDelete(item.id)}
        loading={deletingId === item.id}
        buttonStyle={styles.deleteButton}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Passwords:</Text>
      
      {passwords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No passwords saved yet</Text>
          <Button
            title="Add New Password"
            onPress={() => navigation.navigate('AddPassword')}
            buttonStyle={styles.addButton}
          />
        </View>
      ) : (
        <>
          <Button
            title="Add New Password"
            onPress={() => navigation.navigate('AddPassword')}
            buttonStyle={styles.addButton}
            containerStyle={styles.addButtonContainer}
          />
          <FlatList
            data={passwords}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
      <Portal>
      <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
        <Dialog.Title>Confirm Deletion</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete this password?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={() => setVisibleDialog(false)}>
            Cancel
          </PaperButton>
          <PaperButton 
            onPress={confirmDelete}
            textColor="#ff4444"
            loading={deletingId === passwordToDelete}
          >
            Delete
          </PaperButton>
        </Dialog.Actions>
      </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  service: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginHorizontal: 0,
  },
  toggleText: {
    color: '#007BFF',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  addButtonContainer: {
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DashboardScreen;