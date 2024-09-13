import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Provider as PaperProvider } from 'react-native-paper'; 
import { saveSerialNoCompQData } from '@/firebaseHelpers';

type ComponentQuarantineProps = {
  formId: string;
  prevData: any;
  role: string | null;
  formStatus: boolean;
  prevFormStatus: boolean;
  disabled: boolean;
};

export default function ComponentQuarantine({
  formId,
  prevData,
  role,
  formStatus,
  prevFormStatus,
  disabled,
}: ComponentQuarantineProps) {
  const [data, setData] = useState<any>({
    Component_Quarantined: 'No',
    Serial_Tracing_Status: 'No',
    Serial_No: '',
    Received_By: '',
    Form_Status: false,
  });

  // Disable form if the previous form is completed or if the user is not in the allowed roles
  const isDisabled = prevFormStatus === true || formStatus === true || role !== "P&PC";

  useEffect(() => {
    if (!disabled) {
      setData({
        Component_Quarantined: prevData?.Component_Quarantined || 'No',
        Serial_Tracing_Status: prevData?.Serial_Tracing_Status || 'No',
        Serial_No: prevData?.Serial_No || '',
        Received_By: prevData?.Received_By || '',
        Form_Status: prevData?.Form_Status || false,
      });
    }
  }, [prevData, disabled]);

  const handleSubmit = async () => {
    try {
      if (role === "P&PC") {
        data.Form_Status = true;
        await saveSerialNoCompQData(formId, data);
      } else {
        console.log('You do not have permission to submit this form or the form is already completed.');
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>COMPONENT QUARANTINE AND REVIEW (ACTION BY P&PC)</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={data.Component_Quarantined}
            onValueChange={(value) => setData({ ...data, Component_Quarantined: value })}
            enabled={!isDisabled}
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text>Serial Number has been traced through Inventory Status / PAMMIS / WINGS</Text>
          <Picker
            selectedValue={data.Serial_Tracing_Status}
            onValueChange={(value) => setData({ ...data, Serial_Tracing_Status: value })}
            enabled={!isDisabled}
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Serial_No ? prevData.Serial_No : "Serial No"}
          value={data.Serial_No}
          onChangeText={(text) => setData({ ...data, Serial_No: text })}
          editable={!isDisabled}
        />

        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Received_By ? prevData.Received_By : "Received by (Name/Date/Section)"}
          value={data.Received_By}
          onChangeText={(text) => setData({ ...data, Received_By: text })}
          editable={!isDisabled}
        />

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
    backgroundColor: '#e0e0e0',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#004d40',
  },
  submitButtonLabel: {
    color: 'white',
    fontSize: 16,
  },
});
