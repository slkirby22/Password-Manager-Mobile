import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';
import apiClient from '@/api/apiClient';
import { Dialog, Portal, Button as PaperButton } from 'react-native-paper';
import { showAlert } from '@/utils/alertHelpers';

// Form validation schema
const passwordSchema = yup.object().shape({
  service_name: yup.string().required('Service name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  notes: yup.string(),
});

const AddPasswordScreen = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  interface FormValues {
    service_name: string;
    username: string;
    password: string;
    notes?: string;
  }

  interface FormikHelpers {
    resetForm: () => void;
  }

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/passwords', {
        service_name: values.service_name,
        username: values.username,
        password: values.password,
        notes: values.notes || '',
      });
      
      setSuccessVisible(true);
      resetForm();
    } catch (error) {
      const errorMessage = (error as any)?.response?.data?.error || 'Failed to add password';
      showAlert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          service_name: '',
          username: '',
          password: '',
          notes: ''
        }}
        validationSchema={passwordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Input
              label="Service Name"
              placeholder="e.g. Gmail, Netflix"
              value={values.service_name}
              onChangeText={handleChange('service_name')}
              onBlur={handleBlur('service_name')}
              errorMessage={touched.service_name && errors.service_name ? errors.service_name : ''}
              autoCapitalize="none"
            />

            <Input
              label="Username/Email"
              placeholder="Enter your username or email"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              errorMessage={touched.username && errors.username ? errors.username : ''}
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={touched.password && errors.password ? errors.password : ''}
              secureTextEntry
            />

            <Input
              label="Notes (Optional)"
              placeholder="Any additional notes"
              value={values.notes}
              onChangeText={handleChange('notes')}
              onBlur={handleBlur('notes')}
              multiline
              numberOfLines={3}
            />

            <Button
              title="Save Password"
              onPress={() => handleSubmit()}
              loading={isSubmitting}
              disabled={isSubmitting}
              buttonStyle={styles.saveButton}
            />
          </View>
        )}
      </Formik>
      <Portal>
      <Dialog 
        visible={successVisible} 
        onDismiss={() => {
          setSuccessVisible(false);
          (navigation as any).navigate('Dashboard');
        }}
      >
        <Dialog.Title>Success</Dialog.Title>
        <Dialog.Content>
          <Text>Password added successfully</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={() => {
            setSuccessVisible(false);
            (navigation as any).navigate('Dashboard');
          }}>
            OK
          </PaperButton>
        </Dialog.Actions>
      </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '100%',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2089dc',
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default AddPasswordScreen;