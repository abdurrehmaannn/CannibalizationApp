import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { RadioButton, Text as PaperText } from 'react-native-paper';
import {
  fetchFormPartData,
  saveChiefEngineerField,
  saveDCERotablePlanningField,
  saveDCESituationRoom,
} from "@/firebaseHelpers";

interface Props {
  formId: string;
  role: string | null;
  formStatus: boolean;
  prevFormStatus: boolean;
  disabled: boolean;
  prevData: any;
}

const CannibalizationPermission = ({
  formId,
  role,
  formStatus,
  prevFormStatus,
  disabled,
  prevData,
}: Props) => {
  const [Donor_Aircraft_Registration, setDonor_Aircraft_Registration] =
    useState<string>("");
  const [Aircraft_Preserved, setAircraft_Preserved] = useState<boolean>(false);
  const [CoA_Valid, setCoA_Valid] = useState<boolean>(false);
  const [Remarks, setRemarks] = useState<string>("");
  const [Approval_Ref_No, setApproval_Ref_No] = useState<string>("");
  const [Endorsed_By_DCE, setEndorsed_By_DCE] = useState<boolean>(false);
  const [Approved_By_Chief_Engineer, setApproved_By_Chief_Engineer] =
    useState<boolean>(false);
  const [DCE_Rotable_Planning_Approved, setDCE_Rotable_Planning_Approved] =
    useState<boolean>(false);
  const [DCE_Situation_Room, setDCE_Situation_Room] =
    useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (prevData) {
      setDonor_Aircraft_Registration(
        prevData.DCESituationRoomField.Donor_Aircraft_Registration || ""
      );
      setAircraft_Preserved(!!prevData.DCESituationRoomField.Aircraft_Preserved);
      setCoA_Valid(!!prevData.DCESituationRoomField.CoA_Valid);
      setRemarks(prevData.DCESituationRoomField.Remarks || "");
      setApproval_Ref_No(prevData.DCERotablePlanningField.Approval_Ref_No || "");
    //  setEndorsed_By_DCE(!!prevData.Endorsed_By_DCE);
      setApproved_By_Chief_Engineer(
        !!prevData.ChiefEngineerField.Approved_By_Chief_Engineer
      );
      setDCE_Rotable_Planning_Approved(
        prevData.DCERotablePlanningField.DCE_Rotable_Planning_Approved
      );
      setDCE_Situation_Room(
        !!prevData.DCESituationRoomField.DCE_Situation_Room
      );
    }
  }, [prevData]);

  const handleSubmit = async () => {
    if (role === "DCE Situation Room") {
      await saveDCESituationRoom(formId, {
        Donor_Aircraft_Registration,
        Aircraft_Preserved,
        CoA_Valid,
        Remarks,
        DCE_Situation_Room
      });
    } else if (role === "DCE Rotable Planning") {
      await saveDCERotablePlanningField(formId, {
        Approval_Ref_No,
        DCE_Rotable_Planning_Approved,
      });
    }
    else if (role === "Chief Engineer") {
      await saveChiefEngineerField(formId, { Approved_By_Chief_Engineer });
    }
    // Other roles logic if any can go here...
  };

  const isDisabled =
    (role !== "DCE Situation Room" && formStatus) ||
    (formStatus &&
      role !== "DCE Rotable Planning" &&
      role !== "Chief Engineer");

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Cannibalization Permission</Text>

        <TextInput
          style={styles.input}
          placeholder={Donor_Aircraft_Registration? Donor_Aircraft_Registration:"Donor Aircraft Registration"}
          value={Donor_Aircraft_Registration}
          onChangeText={setDonor_Aircraft_Registration}
          editable={role === "DCE Situation Room" && !isDisabled}
        />

        <View style={styles.pickerContainer}>
          <Text>Aircraft Preserved</Text>
          <Picker
            selectedValue={Aircraft_Preserved ? "Yes" : "No"}
            onValueChange={(value) => setAircraft_Preserved(value === "Yes")}
            enabled={role === "DCE Situation Room" && !isDisabled}
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text>CoA Valid</Text>
          <Picker
            selectedValue={CoA_Valid ? "Yes" : "No"}
            onValueChange={(value) => setCoA_Valid(value === "Yes")}
            enabled={role === "DCE Situation Room" && !isDisabled}
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder={Remarks? Remarks:"Remarks"}
          value={Remarks}
          onChangeText={setRemarks}
          editable={role === "DCE Situation Room" && !isDisabled}
        />

        <View style={styles.pickerContainer}>
          <Text>DCE Situation Room</Text>
          <Picker
            selectedValue={DCE_Situation_Room ? "Yes" : "No"}
            onValueChange={(value) => setDCE_Situation_Room(value === "Yes")}
            enabled={role === "DCE Situation Room" && !isDisabled}
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <Text>DCE Rotable Planning Approval</Text>
        <TextInput
          style={styles.input}
          placeholder={Approval_Ref_No?Approval_Ref_No:"Approval Ref No"}
          value={Approval_Ref_No}
          onChangeText={setApproval_Ref_No}
          editable={role === 'DCE Rotable Planning' && !disabled && !submitted}
        />
        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(value) => setDCE_Rotable_Planning_Approved(value === "Yes")}
            value={DCE_Rotable_Planning_Approved ? "Yes" : "No"}
          >
            <View style={styles.radioButton}>
              <RadioButton
                value="Yes"
                disabled={role !== 'DCE Rotable Planning' || disabled || submitted}
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="No"
                disabled={role !== 'DCE Rotable Planning' || disabled || submitted}
              />
              <Text>No</Text>
            </View>
          </RadioButton.Group>
        </View>

        <Text style={styles.label}>Chief Engineer Approval</Text>
        <RadioButton.Group
          onValueChange={(value) => setApproved_By_Chief_Engineer(value === "Yes")}
          value={Approved_By_Chief_Engineer ? "Yes" : "No"}
        >
          <View style={styles.radioContainer}>
            <RadioButton
              value="Yes"
              disabled={role !== 'Chief Engineer' || !DCE_Rotable_Planning_Approved || disabled}
            />
            <PaperText style={styles.radioLabel}>Yes</PaperText>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="No"
              disabled={role !== 'Chief Engineer' || !DCE_Rotable_Planning_Approved || disabled}
            />
            <PaperText style={styles.radioLabel}>No</PaperText>
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
          disabled={
            !(
              role === "DCE Situation Room" ||
              role === "DCE Rotable Planning" ||
              role === "Chief Engineer"
            ) ||
            (formStatus &&
              role !== "DCE Rotable Planning" &&
              role !== "Chief Engineer")
          }
        >
          {submitted ? "Submitted" : "Submit"}
        </Button>
      </View>
    </PaperProvider>
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
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  radioLabel: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#6200ee",
  },
  submitButtonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CannibalizationPermission;
