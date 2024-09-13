import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Ensure correct import path

import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import CannibalizationScreen from '../Screens/CannibalizationScreen';
import SerialNoScreen from '@/Screens/SerialNoScreen';
import SelectFormScreen from '@/Screens/HomeScreen';
//import FormSelection from '@/components/FormSelection/FormSelection';
import FormDisplayScreen from '@/Screens/FormSelectionScreen';
import FormDetails from '@/Screens/FormDetails';


export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Cannibalization: { formId: string };
  SerialNo: { formId: string };
  SelectForm: undefined;
  FormTable: undefined;
  FormSelection: undefined;
  FormDisplay: { formName: string; formData: any };
  FormDetails: { formName: string; formData: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set initial route to 'SelectForm'
        setInitialRoute('SelectForm');
      } else {
        // No user is signed in, set initial route to 'Login'
        setInitialRoute('Login');
      }
      setIsLoading(false); // Stop loading once we have the auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Optionally, return a loading spinner or some placeholder
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
       
        <Stack.Screen name="FormDisplay" component={FormDisplayScreen} />
        <Stack.Screen name="Cannibalization" component={CannibalizationScreen} />
        <Stack.Screen name="SerialNo" component={SerialNoScreen} />
        <Stack.Screen name="SelectForm" component={SelectFormScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
