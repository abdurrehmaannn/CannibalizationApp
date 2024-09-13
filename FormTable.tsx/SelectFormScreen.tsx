import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDoc, doc } from 'firebase/firestore'; // Firestore imports
import { auth, db } from '../firebaseConfig'; // Firebase config import
import { RootStackParamList } from '../app/app';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectForm'>;

export default function SelectFormScreen({ navigation }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const userId = auth.currentUser?.uid;
      
      if (!userId) {
        console.log('User not authenticated');
        return;
      }
      
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userRole = userDoc.data()?.role;
      setIsAdmin(userRole === 'Server Admin');
    };
  
    checkUserRole();
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/images/imgbck.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Select Form</Text>
          {isAdmin && (
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.box}>
          <View style={styles.buttonContainer}>
            <Button
              title="Cannibalization"
              onPress={() => navigation.navigate('cannibalization')}
              color="#007BFF"
            />
            <Button
              title="Serial Number Traceability"
              onPress={() => navigation.navigate('SerialNo')}
              color="#007BFF"
            />
            <Button
              title="Form Display"
              onPress={() => navigation.navigate('FormSelection')}
              color="#007BFF"
            />
            <Button
              title="Form Table"
              onPress={() => navigation.navigate('FormTable')}
              color="#007BFF"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    width: '90%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  box: {
    width: '90%',
    maxWidth: 400,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
});
