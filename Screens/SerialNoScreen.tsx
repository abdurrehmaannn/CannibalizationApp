import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SerialNoPart1 from '@/components/SerialNo/SerialNoPart1';
import ComponentQuarantine from '@/components/SerialNo/ComponentQuarantine';
import SerialNoConfirmation from '@/components/SerialNo/SerialNoConfirmation';
import AssignmentOfLocalSerialNo from '@/components/SerialNo/AssignmentOfLocalSerialNo';
import ApprovalAndClosure from '@/components/SerialNo/Approval&Closure';
import { auth } from '../firebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/app';
import Navbar from '../components/navbar';
import { getUserRole } from "../firebaseConfig";
import { getSerialNoFormData } from "@/firebaseHelpers";

type Props = NativeStackScreenProps<RootStackParamList, 'SerialNo'>;

export default function SerialNoScreen({ route }: Props) {
  const formId = route.params.formId; // Assuming formId comes from route params
  const [formStatus, setFormStatus] = useState(false);
  const [serialNoPart1Completed, setSerialNoPart1Completed] = useState(false);
  const [componentQuarantineCompleted, setComponentQuarantineCompleted] = useState(false);
  const [serialNoConfirmationCompleted, setSerialNoConfirmationCompleted] = useState(false);
  const [assignmentOfLocalSerialNoCompleted, setAssignmentOfLocalSerialNoCompleted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<any | null>(null);

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
        const data = await getSerialNoFormData(formId);
        if (data) {
          setFormData(data);
          setSerialNoPart1Completed(data?.SerialNoPart1?.Form_Status || false);
          setComponentQuarantineCompleted(data?.ComponentQuarantine?.Form_Status || false);
          setSerialNoConfirmationCompleted(data?.SerialNoConfirmation?.Form_Status || false);
          setAssignmentOfLocalSerialNoCompleted(data?.AssignmentOfLocalSerialNo?.Form_Status || false);
          setFormStatus(data?.status || false);
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
          <SerialNoPart1
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={serialNoPart1Completed}
            disabled={formStatus}
            prevData={formData?.SerialNoPart1 || {}}
        
          />
        </View>
        {/* Similarly update the other components if they require onChange or onSubmit props */}
        <View style={styles.box}>
          <ComponentQuarantine
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={serialNoPart1Completed}
            disabled={formStatus}
            prevData={formData?.ComponentQuarantine || {}}
          />
        </View>
        <View style={styles.box}>
          <SerialNoConfirmation
            formId={formId }
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={serialNoConfirmationCompleted}
            disabled={formStatus}
            prevData={formData?.SerialNoConfirmation || {}}
          />
        </View>
        <View style={styles.box}>
          <AssignmentOfLocalSerialNo
            formId={formId}
            role={userRole}
            formStatus={formStatus}
            prevFormStatus={assignmentOfLocalSerialNoCompleted}
            disabled={formStatus}
            prevData={formData?.AssignmentOfLocalSerialNo || {}}
          />
        </View>
        <View style={styles.box}>
          <ApprovalAndClosure
            formId={formId}
            role={userRole ||''}
            formStatus={formStatus}
            disabled={formStatus}
            prevData={formData?.ApprovalAndClosure || {}}
            onChange={(data: any) => console.log('ApprovalAndClosure data changed:', data)}
          />
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004d40',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  box: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
});
