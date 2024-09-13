import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

type Props = {
  onChange: (data: { dceRotablePlanning: string; name: string; date: string }) => void;
  disabled: boolean;
  role: string; 
  formId: string;
  formStatus: boolean;
  prevData: { dceRotablePlanning?: string; name?: string; date?: string };  
};

const ApprovalAndClosure = ({ onChange, disabled, role, prevData }: Props) => {
  // State variables for the form fields, initialized with prevData if available
  const [dceRotablePlanning, setDceRotablePlanning] = React.useState<string>(prevData?.dceRotablePlanning || '');
  const [name, setName] = React.useState<string>(prevData?.name || '');
  const [date, setDate] = React.useState<string>(prevData?.date || '');

  // Effect to handle prop changes or new data
  React.useEffect(() => {
    setDceRotablePlanning(prevData?.dceRotablePlanning || '');
    setName(prevData?.name || '');
    setDate(prevData?.date || '');
  }, [prevData]);

  React.useEffect(() => {
    if (!disabled && role === 'DCE Rotable Planning') {
      onChange({ dceRotablePlanning, name, date });
    }
  }, [dceRotablePlanning, name, date, disabled, role, onChange]);

  const handleSubmit = () => {
    // Submit logic
    console.log('Form submitted with:', { dceRotablePlanning, name, date });
  };

  const isEnabled = role === 'DCE Rotable Planning';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approval and Closure</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          editable={!disabled && isEnabled}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Date"
          value={date}
          onChangeText={setDate}
          editable={!disabled && isEnabled}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>DCE Rotable Planning</Text>
        <Picker
          selectedValue={dceRotablePlanning}
          style={styles.picker}
          onValueChange={(itemValue) => setDceRotablePlanning(itemValue)}
          enabled={!disabled && isEnabled}
        >
          <Picker.Item label="Not Approved" value="not_approved" />
          <Picker.Item label="Approved" value="approved" />
        </Picker>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        disabled={disabled || !isEnabled}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 4,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#004d40',
    borderRadius: 4,
  },
  submitButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default ApprovalAndClosure;
