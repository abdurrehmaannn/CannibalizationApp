import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { RootStackParamList } from '@/type';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

//type Props = NativeStackScreenProps<RootStackParamList, 'FormDetails'>;

export default function FormDetails() {
  const [formData, setFormData] = useState<any>(null);
  const route = useRoute();
  const { formId } = route.params as { formId: string };

  useEffect(() => {
    const fetchFormData = async () => {
      const docRef = doc(db, 'cannibalizationRequests', formId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchFormData();
  }, [formId]);

  if (!formData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form ID: {formId}</Text>
      <Text style={styles.subtitle}>Status: {formData.status}</Text>
      {/* Display more form details here */}
      <Text>Request Data: {JSON.stringify(formData.request)}</Text>
      <Text>Permission Data: {JSON.stringify(formData.permission)}</Text>
      <Text>Post Action Data: {JSON.stringify(formData.postAction)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
});
