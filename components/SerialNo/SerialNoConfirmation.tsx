import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

type Props ={
  formId:string;
  disabled: boolean;
  prevData?: any;  // Assuming prevData contains the previous values for the form fields
  role:string | null;
  prevFormStatus: boolean;
  formStatus: boolean;
  
}

const SerialNoFormConfirmation = ({ formId,role, disabled, prevData }: Props) => {
  const [SerialTracedThrough, setSerialTracedThrough] = React.useState<string>(prevData?.SerialTracedThrough || '');
  const [Reference, setReference] = React.useState<string>(prevData?.Reference || '');
  const [SerialNumber, setSerialNumber] = React.useState<string>(prevData?.SerialNumber || '');
  const [ConfirmedBy, setConfirmedBy] = React.useState<string>(prevData?.ConfirmedBy || '');

  // React.useEffect(() => {
  //   if (!disabled) {
  //     onChange({
  //       SerialTracedThrough,
  //       Reference,
  //       SerialNumber,
  //       ConfirmedBy,
  //     });
  //   }
  // }, [SerialTracedThrough, Reference, SerialNumber, ConfirmedBy, disabled]);

  const handleSubmit = () => {
    console.log('Form submitted with:', {
      SerialTracedThrough,
      Reference,
      SerialNumber,
      ConfirmedBy,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERIAL NUMBER CONFIRMATION FROM AWM / TSE</Text>
      
      <Picker
        selectedValue={SerialTracedThrough}
        style={styles.input}
        onValueChange={(itemValue) => setSerialTracedThrough(itemValue)}
        enabled={!disabled}
      >
        <Picker.Item label="AIR" value="AIR" />
        <Picker.Item label="ARL" value="ARL" />
        <Picker.Item label="COMPONENT HISTORY" value="COMPONENT_HISTORY" />
        <Picker.Item label="OTHER" value="OTHER" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder={prevData?.Reference ? prevData.Reference : 'Reference'}
        value={Reference}
        onChangeText={setReference}
        editable={!disabled}
      />
      
      <TextInput
        style={styles.input}
        placeholder={prevData?.SerialNumber ? prevData.SerialNumber : 'Serial Number'}
        value={SerialNumber}
        onChangeText={setSerialNumber}
        editable={!disabled}
      />

      <TextInput
        style={styles.input}
        placeholder={prevData?.ConfirmedBy ? prevData.ConfirmedBy : 'Confirmed By (Name/Date/Section)'}
        value={ConfirmedBy}
        onChangeText={setConfirmedBy}
        editable={!disabled}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        disabled={disabled}
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
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
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

export default SerialNoFormConfirmation;
