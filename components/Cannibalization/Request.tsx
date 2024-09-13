import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { saveFormData } from '@/firebaseConfig';
import { saveCertifyingStaff, saveRequestFormData, saveShiftInchargeFields } from '@/firebaseHelpers';

type RequestProps = {
  formId: string;
  prevData:any;
  role: string | null;
  formStatus: boolean; // This can be 'completed', 'in-progress', etc.
  prevFormStatus: boolean; // Status of the previous form
  disabled: boolean; // Indicates if the form should be editable

};

export default function CannibalizationRequest({
  formId,
  role,
  formStatus,
 prevFormStatus,
  disabled,
  prevData
 
}: RequestProps) {
  const [data, setData] = useState<any>({
    Nomenclature: '',
    Part_No: '',
    Recipient_Aircraft_Registration: '',
    Recipient_Station: '',
    Proof_Of_Nill_In_Stock_voucher_No: '',
    Reasons_of_Cannibalization: '',
    ATLB_Ref_No_With_Date: '',
    Form_Status:false,
  });


 // Disable form if the form is already completed or if the user is not in the allowed roles
const isDisabled = prevFormStatus===true||formStatus === true || (role !== "Shift Incharge" && role !== "Certifying Staff");

const handleSubmit = async () => {
  try {
    if (role === "Shift Incharge" || role === "Certifying Staff"){
      data.Form_Status=true
      saveRequestFormData(formId,data)
    }
   
    else {
      console.log('You do not have permission to submit this form or the form is already completed.');
    }
    
  } catch (error) {
    console.error('Error saving form data:', error);
  }
  
};


  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Cannibalization Request</Text>
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Nomenclature ? prevData.Nomenclature : "Nomenclature"}
          value={data.Nomenclature}
          onChangeText={(text) => setData({ ...data, Nomenclature: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Part_No ? prevData.Part_No : "Part No"}
          value={data.Part_No}
          onChangeText={(text) => setData({ ...data, Part_No: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
            placeholder={prevData?.Recipient_Aircraft_Registration? prevData.Recipient_Aircraft_Registration :"Recipient Aircraft Registration"}
          value={data.Recipient_Aircraft_Registration}
          onChangeText={(text) => setData({ ...data, Recipient_Aircraft_Registration: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Recipient_Station ? prevData.Recipient_Station : "Recipient Station"}
          value={data.Recipient_Station}
          onChangeText={(text) => setData({ ...data, Recipient_Station: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Proof_Of_Nill_In_Stock_voucher_No ? prevData.Proof_Of_Nill_In_Stock_voucher_No : "Proof Of Nill In Stock voucher No"}
         
          value={data.Proof_Of_Nill_In_Stock_voucher_No}
          onChangeText={(text) => setData({ ...data, Proof_Of_Nill_In_Stock_voucher_No: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.Reasons_of_Cannibalization ? prevData.Reasons_of_Cannibalization : "Reasons of Cannibalization"}
          
          value={data.Reasons_of_Cannibalization}
          onChangeText={(text) => setData({ ...data, Reasons_of_Cannibalization: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />
        <TextInput
          style={[styles.input, isDisabled && styles.disabledInput]}
          placeholder={prevData?.ATLB_Ref_No_With_Date ? prevData.ATLB_Ref_No_With_Date : "ATLB Ref No With Date"}

          value={data.ATLB_Ref_No_With_Date}
          onChangeText={(text) => setData({ ...data, ATLB_Ref_No_With_Date: text })}
          editable={!isDisabled} // Disable input if the form is disabled
        />

        {role != "Shift Incharge" && (
          <Text style={styles.warningText}>
            You do not have permission to submit this form.
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
          disabled={isDisabled} // Disable submit button if form is disabled
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
