import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Request from "../components/Cannibalization/Request";
import Permission from "../components/Cannibalization/Permission";
import PostPermissionAction from "../components/Cannibalization/PostAction";
import Navbar from "../components/navbar";
import { auth } from "../firebaseConfig";
import { fetchFormPartData } from "@/firebaseHelpers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/app";
import { getUserRole } from "../firebaseConfig";
import {getCannibalizationFormData } from "@/firebaseHelpers";

type Props = NativeStackScreenProps<RootStackParamList, "Cannibalization">;

export default function CannibalizationScreen({ route }: Props) {
  const formId = route.params.formId; // Assuming formId comes from route params
  const [formStatus, setFormStatus] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [permissionCompleted, setPermissionCompleted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [permissionFormData, setPermissionFormData] = useState<any | null>(null);
  const [postActionFormData, setPostActionFormData] = useState<any | null>(null);

  // Fetch user role once when the component mounts
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const role = await getUserRole();
          setUserRole(role);
        } catch (error) {
          console.error('Error setting user role:', error);
          setUserRole(null);
        }
      } else {
        console.error('User is not authenticated.');
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, []);

  // Fetch form data once when formId or role changes
  useEffect(() => {
    if (!formId || !userRole) return;

    const fetchFormData = async () => {
      try {
        const data = await getCannibalizationFormData(formId);
        if (data) {
          setFormData(data);
          setRequestCompleted(data?.CannibalizationRequest?.Form_Status || false);
          setPermissionCompleted(data?.CannibalizationPermission?.Form_Status || false);
          setFormStatus(data?.status || false);
          setPermissionFormData(data?.CannibalizationPermission || null);
          setPostActionFormData(data?.CannibalizationPostAction|| null);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [formId, userRole]);

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.box}>
          <Request
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={requestCompleted} 
            disabled={formStatus}
            prevData={formData?.CannibalizationRequest}
          />
        </View>

        <View style={styles.box}>
          <Permission
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={requestCompleted}
            disabled={formStatus}
            prevData={permissionFormData}
          />
        </View>
 <View style={styles.box}>
          <PostPermissionAction
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={requestCompleted && permissionCompleted}
            prevData={postActionFormData}
          />
        </View> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004d40",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  box: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
});
