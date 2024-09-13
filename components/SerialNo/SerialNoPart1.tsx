import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, RadioButton, Provider as PaperProvider } from 'react-native-paper';
import { saveSerialNoPart1Data } from '@/firebaseHelpers';

type SerialNoPart1Props = {
  formId: string;
  prevData:any;
  role: string | null;
  formStatus: boolean;
  prevFormStatus: boolean;
  disabled: boolean;
};

type FormData = {
  Description: string;
  Ref_No: string;
  Part_No: string;
  Removed_From: string;
  AE_Production: string;
  DCE_Production: string;
};

export default function SerialNoPart1({
  formId,
  role,
  formStatus,
  prevFormStatus,
  disabled,
  prevData
}: SerialNoPart1Props) {
  const [data, setData] = useState<FormData>({
    Description: prevData?.Description || '',
    Ref_No: prevData?.Ref_No || '',
    Part_No: prevData?.Part_No || '',
    Removed_From: prevData?.Removed_From || '',
    AE_Production: '',
    DCE_Production: '',
  });

  const [aeProductionStatus, setAeProductionStatus] = useState<string>(''); 
  const [dceProductionStatus, setDceProductionStatus] = useState<string>(''); 

  const isAeProductionRole = role === 'AE Production';
  const isDceProductionRole = role === 'DCE Production';

  const isDisabled = prevFormStatus || formStatus || !isAeProductionRole && !isDceProductionRole;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleAeProductionSubmit = async () => {
    if (isAeProductionRole && aeProductionStatus === 'Yes') {
      try {
        await saveSerialNoPart1Data(formId, data);
        console.log('AE Production data submitted successfully');
      } catch (error) {
        console.error('Error submitting AE Production data:', error);
      }
    }
  };

  const handleDceProductionApprove = async () => {
    if (isDceProductionRole && dceProductionStatus === 'Yes') {
      console.log('Approved by DCE Production');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Serial No. Part 1</Text>
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder="Description"
          value={data.Description}
          onChangeText={text => handleInputChange('Description', text)}
          editable={isAeProductionRole}
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder="Part No"
          value={data.Part_No}
          onChangeText={text => handleInputChange('Part_No', text)}
          editable={isAeProductionRole}
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder="Reference No"
          value={data.Ref_No}
          onChangeText={text => handleInputChange('Ref_No', text)}
          editable={isAeProductionRole}
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder="Removed From"
          value={data.Removed_From}
          onChangeText={text => handleInputChange('Removed_From', text)}
          editable={isAeProductionRole}
        />

        {isAeProductionRole && (
          <View>
            <Text style={styles.radioTitle}>AE Production Approval</Text>
            <RadioButton.Group
              onValueChange={value => setAeProductionStatus(value)}
              value={aeProductionStatus}
            >
              <View style={styles.radioOption}>
                <Text>Yes</Text>
                <RadioButton value="Yes" />
              </View>
              <View style={styles.radioOption}>
                <Text>No</Text>
                <RadioButton value="No" />
              </View>
            </RadioButton.Group>

            <Button
              mode="contained"
              onPress={handleAeProductionSubmit}
              style={styles.submitButton}
              labelStyle={styles.submitButtonLabel}
              disabled={aeProductionStatus !== 'Yes' || isDisabled}
            >
              Submit
            </Button>
          </View>
        )}

        {isDceProductionRole && (
          <View>
            <Text style={styles.radioTitle}>DCE Production Approval</Text>
            <RadioButton.Group
              onValueChange={value => setDceProductionStatus(value)}
              value={dceProductionStatus}
            >
              <View style={styles.radioOption}>
                <Text>Yes</Text>
                <RadioButton value="Yes" />
              </View>
              <View style={styles.radioOption}>
                <Text>No</Text>
                <RadioButton value="No" />
              </View>
            </RadioButton.Group>

            <Button
              mode="contained"
              onPress={handleDceProductionApprove}
              style={styles.approveButton}
              labelStyle={styles.submitButtonLabel}
              disabled={dceProductionStatus !== 'Yes' || isDisabled}
            >
              Approve
            </Button>
          </View>
        )}
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
    backgroundColor: '#e0e0e0',
  },
  radioTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#004d40',
  },
  submitButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
  approveButton: {
    marginTop: 20,
    backgroundColor: '#00897b',
  },
});
