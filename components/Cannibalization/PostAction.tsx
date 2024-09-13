import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { fetchFormPartData, savePostActionDonorForm, savePostActionRecipientForm } from '@/firebaseHelpers';

type PostPermissionActionProps = {
  formId: string;
  role: string | null;
  formStatus: boolean;
  prevFormStatus: boolean; //disable all the fields if this value not true
  prevData: any,
};

const PostPermissionAction = ({
  formId,
  role,
  formStatus,
  prevFormStatus,
  prevData
}: PostPermissionActionProps) => {
  const [Last_Flight_Operation, setLast_Flight_Operation] = useState<boolean>(false);
  const [No_Unusual_Event, setNo_Unusual_Event] = useState<boolean>(false);
  const [Component_Inspected, setComponent_Inspected] = useState<boolean>(false);
  const [ATLB_ARO_Ref_No, setATLB_ARO_Ref_No] = useState<string>('');
  const [PostPermission_Remarks, setPostPermission_Remarks] = useState<string>('');
  const [Certifying_Staff_Shift_Incharge, setCertifying_Staff_Shift_Incharge] = useState<string>('Not Approved');

  // Acceptor Section States
  const [Part_No, setPart_No] = useState<string>('');
  const [Serial_No, setSerial_No] = useState<string>('');
  const [IPC_Reference, setIPC_Reference] = useState<string>('');
  const [Maintenance_History_Record, setMaintenance_History_Record] = useState<boolean>(false);
  const [Component_Inspected_Acceptor, setComponent_Inspected_Acceptor] = useState<boolean>(false);
  const [ATLB_Text_No_With_Date, setATLB_Text_No_With_Date] = useState<string>('');
  const [Aircraft_Preserved, setAircraft_Preserved] = useState<boolean>(true);

  // Determine if the form should be disabled based on the role and formStatus
  const disabled = role !== 'Shift Incharge' && role !== 'Certifying Staff' || formStatus === true;
  const userHasPermission = role === 'Shift Incharge' || role === 'Certifying Staff';

  useEffect(() => {
    if (prevData) {
      // Set state with fetched data
      setLast_Flight_Operation(prevData?.Donor.Last_Flight_Operation || false);
      setNo_Unusual_Event(prevData?.Donor.No_Unusual_Event || false);
      setComponent_Inspected(prevData?.Donor.Component_Inspected || false);
      setATLB_ARO_Ref_No(prevData?.Donor.ATLB_ARO_Ref_No || '');
      setPostPermission_Remarks(prevData?.Donor.PostPermission_Remarks || '');
      setCertifying_Staff_Shift_Incharge(prevData?.Donor.Certifying_Staff_Shift_Incharge || 'Not Approved');

      setPart_No(prevData?.Recipient.Part_No || '');
      setSerial_No(prevData?.Recipient.Serial_No || '');
      setIPC_Reference(prevData?.Recipient.IPC_Reference || '');
      setMaintenance_History_Record(prevData?.Recipient.Maintenance_History_Record || false);
      setComponent_Inspected_Acceptor(prevData?.Recipient.Component_Inspected_Acceptor || false);
      setATLB_Text_No_With_Date(prevData?.Recipient.ATLB_Text_No_With_Date || '');
      setAircraft_Preserved(prevData?.Recipient.Aircraft_Preserved || true);
    }
  }, [prevData]);

  const handleDonorSubmit = async () => {
    if (role === 'Shift Incharge' || role === 'Certifying Staff') {
      await savePostActionDonorForm(formId, {
        Last_Flight_Operation,
        No_Unusual_Event,
        Component_Inspected,
        ATLB_ARO_Ref_No,
        PostPermission_Remarks,
        Certifying_Staff_Shift_Incharge
      });
    }}
  const handleRecipientSubmit = async () => {
    if (role === 'Shift Incharge' || role === 'Certifying Staff') {
      await savePostActionRecipientForm(formId, {
        Part_No,
        Serial_No,
        IPC_Reference,
        Maintenance_History_Record,
        Component_Inspected_Acceptor,
        ATLB_Text_No_With_Date,
        Aircraft_Preserved
      });
    }
    
  };

  return (
    <View style={styles.container}>
      {/* Donor Section */}
      <Text style={styles.heading}>Post-Permission Action</Text>

      <Text style={styles.subheading}>Donor Section</Text>

      <View style={styles.pickerContainer}>
        <Text>Last Flight Operation</Text>
        <Picker
          selectedValue={Last_Flight_Operation}
          onValueChange={(itemValue) => setLast_Flight_Operation(itemValue === true)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="No" value={false} />
          <Picker.Item label="Yes" value={true} />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text>No Unusual Event</Text>
        <Picker
          selectedValue={No_Unusual_Event}
          onValueChange={(itemValue) => setNo_Unusual_Event(itemValue === true)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="No" value={false} />
          <Picker.Item label="Yes" value={true} />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text>Component Inspected</Text>
        <Picker
          selectedValue={Component_Inspected}
          onValueChange={(itemValue) => setComponent_Inspected(itemValue === true)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="No" value={false} />
          <Picker.Item label="Yes" value={true} />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="ATLB ARO Ref No"
        value={ATLB_ARO_Ref_No}
        onChangeText={setATLB_ARO_Ref_No}
        editable={!disabled}
      />

      <TextInput
        style={styles.input}
        placeholder="Post Permission Remarks"
        value={PostPermission_Remarks}
        onChangeText={setPostPermission_Remarks}
        editable={!disabled}
      />

      <View style={styles.pickerContainer}>
        <Text>Certifying Staff/Shift Incharge</Text>
        <Picker
          selectedValue={Certifying_Staff_Shift_Incharge}
          onValueChange={setCertifying_Staff_Shift_Incharge}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="Not Approved" value="Not Approved" />
          <Picker.Item label="Approved" value="Approved" />
        </Picker>
      </View>

      {!userHasPermission && (
        <Text style={styles.errorText}>You do not have permission to submit this form.</Text>
      )}

      <Button
        mode="contained"
        onPress={handleDonorSubmit}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        disabled={disabled}
      >
        Submit Donor Data
      </Button>

      {/* Acceptor Section */}
      <Text style={styles.subheading}>Recipient Section</Text>

      <TextInput
        style={styles.input}
        placeholder="Part No"
        value={Part_No}
        onChangeText={setPart_No}
        editable={!disabled}
      />

      <TextInput
        style={styles.input}
        placeholder="Serial No"
        value={Serial_No}
        onChangeText={setSerial_No}
        editable={!disabled}
      />

      <TextInput
        style={styles.input}
        placeholder="IPC Reference / Revision / Date"
        value={IPC_Reference}
        onChangeText={setIPC_Reference}
        editable={!disabled}
      />

      <View style={styles.pickerContainer}>
        <Text>Maintenance History Record Available in PACL IT System</Text>
        <Picker
          selectedValue={Maintenance_History_Record}
          onValueChange={(itemValue) => setMaintenance_History_Record(itemValue ===true)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="No" value={false} />
          <Picker.Item label="Yes" value={true} />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text>Component Inspected for Satisfactory Condition</Text>
        <Picker
          selectedValue={Component_Inspected_Acceptor}
          onValueChange={(itemValue) => setComponent_Inspected_Acceptor(itemValue === true)}
          enabled={!disabled}
          style={styles.picker}
        >
          <Picker.Item label="No" value={false} />
          <Picker.Item label="Yes" value={true} />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="ATLB Text No with Date"
        value={ATLB_Text_No_With_Date}
        onChangeText={setATLB_Text_No_With_Date}
        editable={!disabled}
      />

      <Button
        mode="contained"
        onPress={handleRecipientSubmit}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        disabled={disabled}
      >
        Submit Recipient Data
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    marginTop: 20,
  },
  submitButtonLabel: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PostPermissionAction;
