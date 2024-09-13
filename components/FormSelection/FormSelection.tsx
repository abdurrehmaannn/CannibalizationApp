// // FormSelection.tsx
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchFormData } from '@/firebaseConfig'; // Adjust import path as necessary
// import { FormDisplayScreenNavigationProp } from '@/app/app';

// const FormSelection = () => {
//   const [selectedForm, setSelectedForm] = useState<string | null>(null);
//   const [formData, setFormData] = useState<any>({});
//   //const navigation = useNavigation();
//   const navigation = useNavigation<FormDisplayScreenNavigationProp>();

//   const forms = [
//     'CannibalizationRequest',
//     'CannibalizationPermission',
//     'PostAction',
//     // Add other forms here
//   ];

//   const handleFormClick = async (formName: string) => {
//     try {
//       const data = await fetchFormData(formName);
//       setFormData(data);
//       setSelectedForm(formName);
//       navigation.navigate('FormDisplay', { formName, formData:data });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch form data.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select a Form</Text>
//       <ScrollView>
//         {forms.map((form) => (
//           <Button
//             key={form}
//             title={form}
//             onPress={() => handleFormClick(form)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default FormSelection;
