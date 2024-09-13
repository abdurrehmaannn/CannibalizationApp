// FormDisplayScreen.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/app'; // Adjust the import path as necessary

type Props = NativeStackScreenProps<RootStackParamList, 'FormDisplay'>;

const FormDisplayScreen = ({ route }: Props) => {
  const { formName, formData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{formName}</Text>
      {Object.keys(formData).map((key) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>{key}</Text>
          <TextInput
            style={styles.input}
            value={formData[key]?.toString() || ''}
            editable={false} // Set to true if you want to allow editing
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default FormDisplayScreen;
