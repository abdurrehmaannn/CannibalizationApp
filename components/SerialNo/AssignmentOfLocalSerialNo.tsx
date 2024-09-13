import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { saveFormData } from '@/firebaseConfig'; // Assuming you have this helper

type AssignmentProps = {
  formId: string;
  prevData: any;
  role: string | null;
  formStatus: boolean; // Indicates if the form is completed
  prevFormStatus: boolean; // Status of the previous form
  disabled: boolean; // Indicates if the form should be editable
};

export default function AssignmentOfLocalSerialNo({
  formId,
  prevData,
  role,
  formStatus,
  prevFormStatus,
  disabled,
}: AssignmentProps) {
  const [data, setData] = useState<any>({
    localSerialAssigned: prevData?.localSerialAssigned || '',
    lruControlIssued: prevData?.lruControlIssued || '',
    localSerialEntered: prevData?.localSerialEntered || '',
    piaStr: prevData?.piaStr || '',
    assignedBy: prevData?.assignedBy || '',
    Form_Status: false,
  });

  // Disable form if the previous form is completed or if the user is not in the allowed roles
  const isDisabled =
    prevFormStatus === true ||
    formStatus === true ||
    (role !== 'Shift Incharge' && role !== 'Certifying Staff');

  const handleSubmit = async () => {
    try {
      if (role === 'Shift Incharge' || role === 'Certifying Staff') {
        data.Form_Status = true;
        saveFormData(formId, data); // Assuming saveFormData is implemented
      } else {
        console.log(
          'You do not have permission to submit this form or the form is already completed.'
        );
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>
          ASSIGNMENT OF LOCAL SERIAL NUMBER (ACTION BY P&PC)
        </Text>

        <Picker
          selectedValue={data.localSerialAssigned}
          style={[styles.input, isDisabled && styles.disabledInput]}
          onValueChange={(itemValue) =>
            setData({ ...data, localSerialAssigned: itemValue })
          }
          enabled={!isDisabled}
        >
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        <Picker
          selectedValue={data.lruControlIssued}
          style={[styles.input, isDisabled && styles.disabledInput]}
          onValueChange={(itemValue) =>
            setData({ ...data, lruControlIssued: itemValue })
          }
          enabled={!isDisabled}
        >
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        <Picker
          selectedValue={data.localSerialEntered}
          style={[styles.input, isDisabled && styles.disabledInput]}
          onValueChange={(itemValue) =>
            setData({ ...data, localSerialEntered: itemValue })
          }
          enabled={!isDisabled}
        >
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={
            prevData?.piaStr ? prevData.piaStr : 'PIA-STR'
          }
          value={data.piaStr}
          onChangeText={(text) => setData({ ...data, piaStr: text })}
          editable={!isDisabled}
        />

        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={
            prevData?.assignedBy ? prevData.assignedBy : 'Assigned by'
          }
          value={data.assignedBy}
          onChangeText={(text) => setData({ ...data, assignedBy: text })}
          editable={!isDisabled}
        />

        {role !== 'Shift Incharge' && (
          <Text style={styles.warningText}>
            You do not have permission to submit this form.
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0', // Light grey background for disabled inputs
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#004d40',
  },
  submitButtonLabel: {
    color: 'white', // Submit text color
    fontSize: 16,
  },
});
