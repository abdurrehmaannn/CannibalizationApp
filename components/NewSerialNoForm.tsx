import React from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { createNewForm } from '../firebaseHelpers';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/app'; // Adjust path as needed

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SerialNo'>;

export default function NewSerialNoFormButton() {
  const navigation = useNavigation<NavigationProp>();

  const handleCreateForm = async () => {
 
   const formId=await createNewForm("My Serial No Form", "SerialNoForm");

    if (formId) {
      Alert.alert("Form Created", `New form created with ID: ${formId}`);
      navigation.navigate('SerialNo', { formId }); 
    } else {
      Alert.alert("Error", "Failed to create a new form.");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateForm}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Create SerialNO. Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});
