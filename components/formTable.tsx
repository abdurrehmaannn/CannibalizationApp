import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteDocument } from '../firebaseConfig';
import { fetchAllForms,fetchAllFormsTest } from '@/firebaseHelpers';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '@/app/app';
import { useNavigation } from '@react-navigation/native';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cannibalization' | 'SerialNo'>;


export default function FormTable() {
  const [forms, setForms] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchForms = async () => {
    try {
      //const formList = await fetchAllForms('cannibalization_forms');
      const formList=await fetchAllFormsTest()
      console.log(formList)
      setForms(formList);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);
  const handleDelete = async (formId: string) => {
  
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (confirmDelete) {
      console.log('Deleting form with ID:', formId);
      try {
        await deleteDocument('cannibalization_forms', formId);
        await fetchForms(); // Refresh the list of forms after deletion
        alert("Form deleted successfully!");
      } catch (error) {
        console.error('Error deleting form:', error);
        alert('Failed to delete form.');
      }
    }
  };
  const handleNavigate = (item: any) => {
    if (item.name === 'CannibalizationForm') {
      navigation.navigate('Cannibalization', { formId: item.id });
    } else {
      navigation.navigate('SerialNo',{ formId: item.id });
    }
  };
  




  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity
    style={styles.row}
    onPress={() => handleNavigate(item)}
   // onPress={() => navigation.navigate('Cannibalization', { formId: item.id })}
  >
    <View style={styles.row}>
      <Text style={[styles.cell, styles.serialNumber]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.name]}>{item.name}</Text>
      <View style={[styles.cell, styles.status]}>
        <Icon
          name={item.status ? "checkmark-circle" : "alert-circle"}
          size={24}
          color={item.status ? "green" : "red"}
        />
        <Text>{item.status ? 'Completed' : 'Pending'}</Text>
      </View>
      <Text style={[styles.cell, styles.createdAt]}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.cell, styles.actions]}>
        <Icon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeaderContainer}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.serialNumber]}>S/N</Text>
              <Text style={[styles.headerCell, styles.name]}>Name</Text>
              <Text style={[styles.headerCell, styles.status]}>Status</Text>
              <Text style={[styles.headerCell, styles.createdAt]}>Created At</Text>
              <Text style={[styles.headerCell, styles.actions]}>Actions</Text>
            </View>
          </View>
          <FlatList
            data={forms}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10, // Add some horizontal padding for spacing
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10, // Add some horizontal padding for spacing
  },
  serialNumber: {
    width: 50, // Set fixed width for S/N
  },
  name: {
    width: 150, // Set fixed width for Name
  },
  status: {
    width: 100, // Set fixed width for Status
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createdAt: {
    width: 100, // Set fixed width for Created At
  },
  actions: {
    width: 70, // Set fixed width for Actions
    justifyContent: 'center',
    alignItems: 'center',
  },
});
