import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/app';
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from '../firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>(''); // Initial state for role
  const [name, setName] = useState<string>('');

  const handleSignup = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        role,
        email,
      });

      navigation.navigate('Login'); // Navigate to Login on successful signup
    } catch (error) {
      Alert.alert(`Signup error: ${error}`); // Show error message if signup fails
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Certifying Staff" value="Certifying Staff" />
            <Picker.Item label="Chief Engineer" value="Chief Engineer" />
            <Picker.Item label="DCE Rotable Planning" value="DCE Rotable Planning" />
            <Picker.Item label="DCE Situation Room" value="DCE Situation Room" />
            <Picker.Item label="EMOD" value="EMOD" />
            <Picker.Item label="Shift Incharge" value="Shift Incharge" />
          </Picker>
        </View>
        <Button title="Sign Up" onPress={handleSignup} />
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Log In
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '80%', // Adjusted to fit smaller screen sizes
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden', // Ensures the picker aligns well
  },
  picker: {
    height: 40,
    width: '100%',
  },
  link: {
    marginTop: 15,
    color: '#1e90ff',
    textAlign: 'center',
  },
});
