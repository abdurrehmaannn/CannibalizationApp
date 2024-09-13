import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore,collection,query,where,getDocs,getDoc, addDoc, doc, setDoc,updateDoc,orderBy } from 'firebase/firestore';
import { db,auth } from './firebaseConfig';

export const saveRequestFormData = async (formId,data) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationRequest': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };
export const saveShiftInchargeFields = async (formId, shiftInchargeData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationRequest.ShiftInchargeFields': shiftInchargeData,
      SubmittedAt: new Date(),
      
    });
  };
  export const saveCertifyingStaff = async (formId, CertifyingStaffData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationRequest.CertifyingStaffField': {
        ...CertifyingStaffData,
        
        SubmittedAt: new Date(),
      }
    });};
    export const saveDCESituationRoom = async (formId, DCESituationRoomData) => {
        const formDocRef = doc(db, 'cannibalization_forms', formId);
      
        await updateDoc(formDocRef, {
          'CannibalizationPermission.DCESituationRoomField': {
            ...DCESituationRoomData,
            
            SubmittedAt: new Date(),
          }
        });};

        export  const saveDCERotablePlanningField = async (formId, DCERotablePlanningData) => {
            const formDocRef = doc(db, 'cannibalization_forms', formId);
          
            await updateDoc(formDocRef, {
              'CannibalizationPermission.DCERotablePlanningField': {
                ...DCERotablePlanningData,
                
                SubmittedAt: new Date(),
              }
            });
          };
  export const saveChiefEngineerField = async (formId, chiefEngineerData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationPermission.ChiefEngineerField': {
        ...chiefEngineerData,
       
        SubmittedAt: new Date(),
      }
    });
  };

  export const savePostActionDonorForm = async (formId, postActionDonorFormData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationPostAction.Donor': {
        ...postActionDonorFormData,
        SubmittedBy:auth?.currentUser.uid,
        SubmittedAt: new Date(),
      }
    });
  };

  export const savePostActionRecipientForm = async (formId, postActionRecipientFormData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationPostAction.Recipient': {
        ...postActionRecipientFormData,
        SubmittedBy:auth?.currentUser.uid,
      
        SubmittedAt: new Date(),
      }
    });
  };

  export const saveShiftInchargePRField = async (formId, ShiftInchargePRData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationPostAction.Recepient.ShiftInchargeField': {
        ...ShiftInchargePRData,
       
        SubmittedAt: new Date(),
      }
    });
  };

  export const saveCertifyingStaffPRField = async (formId, CertifyingStaffPRData) => {
    const formDocRef = doc(db, 'cannibalization_forms', formId);
  
    await updateDoc(formDocRef, {
      'CannibalizationPostAction.Recepient.CertifyingStaffField': {
        ...CertifyingStaffPRData,
       
        SubmittedAt: new Date(),
      }
    });
  };

  export const saveSerialNoPart1Data = async (formId,data) => {
    const formDocRef = doc(db, 'Serial Number Traceability Forms', formId);
  
    await updateDoc(formDocRef, {
      'SerialNoPart1': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };

  export const saveSerialNoCompQData = async (formId,data) => {
    const formDocRef = doc(db, 'Serial Number Traceability Forms', formId);
  
    await updateDoc(formDocRef, {
      'SerialNoCompQ': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };

  export const saveSerialNoConfirmData = async (formId,data) => {
    const formDocRef = doc(db, 'Serial Number Traceability Forms', formId);
  
    await updateDoc(formDocRef, {
      'SerialNoConfirm': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };

  export const saveSerialNoAssignmentData = async (formId,data) => {
    const formDocRef = doc(db, 'Serial Number Traceability Forms', formId);
  
    await updateDoc(formDocRef, {
      'SerialNoAssignment': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };
  export const saveSerialNoAppAndClosureData = async (formId,data) => {
    const formDocRef = doc(db, 'Serial Number Traceability Forms', formId);
  
    await updateDoc(formDocRef, {
      'SerialNoAppAndClosure': data,
      SubmittedBy:auth.currentUser?.uid,
      SubmittedAt: new Date(),
      
    });
  };


//   export const saveDCESituationRoomField = async (formId, DCESituationRoomData) => {
//     const formDocRef = doc(db, 'cannibalization_forms', formId);
  
//     await updateDoc(formDocRef, {
//       'CannibalizationPostAction.DCESituationRoomField': {
//         ...DCESituationRoomData,
//         SubmittedBy: auth.currentUser?.uid,
//         SubmittedAt: new Date(),
//       }
//     });
//   };
 
 
export const getSerialNoFormData = async (formId) => {
    try {
      // Reference to the specific form document in Firestore
      const formDocRef = doc(db, 'serial_number_forms', formId);
      const formDoc = await getDoc(formDocRef);
  
      if (formDoc.exists()) {
        // Extract and return the data from the document
        const formData = formDoc.data();
        console.log('Form data:', formData);
        return formData;
      } else {
        console.error('Form document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
      return null;
    }
  };
  export const getCannibalizationFormData = async (formId) => {
    try {
      // Reference to the specific form document in Firestore
      const formDocRef = doc(db, 'cannibalization_forms', formId);
      const formDoc = await getDoc(formDocRef);
  
      if (formDoc.exists()) {
        // Extract and return the data from the document
        const formData = formDoc.data();
        console.log('Form data:', formData);
        return formData;
      } else {
        console.error('Form document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
      return null;
    }
  };

  export const fetchAllForms = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const formsList = [];
      querySnapshot.forEach((doc) => {
        formsList.push({ id: doc.id, ...doc.data() });
      });
      return formsList;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };



  export const fetchAllFormsTest = async () => {
    try {
      // Fetch documents from the first collection
      const collectionAQuery = query(collection(db, 'cannibalization_forms'), orderBy('createdAt', 'desc'));
      const querySnapshotA = await getDocs(collectionAQuery);
      const formsA = [];
      querySnapshotA.forEach((doc) => {
        formsA.push({ id: doc.id, ...doc.data() });
      });
  
      // Fetch documents from the second collection
      const collectionBQuery = query(collection(db, 'serial_number_forms'), orderBy('createdAt', 'desc'));
      const querySnapshotB = await getDocs(collectionBQuery);
      const formsB = [];
      querySnapshotB.forEach((doc) => {
        formsB.push({ id: doc.id, ...doc.data() });
      });
  
      // Combine both form lists
      const combinedForms = [...formsA, ...formsB];
  
      // Sort the combined list by createdAt in descending order
      combinedForms.sort((a, b) => {
        const aCreatedAt = a.createdAt instanceof Date ? a.createdAt.getTime() : (a.createdAt?.toMillis ? a.createdAt.toMillis() : a.createdAt); // Handle Date or Firestore Timestamp
        const bCreatedAt = b.createdAt instanceof Date ? b.createdAt.getTime() : (b.createdAt?.toMillis ? b.createdAt.toMillis() : b.createdAt); // Handle Date or Firestore Timestamp
        return bCreatedAt - aCreatedAt;
      });
  
      return combinedForms;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };
  export const createNewForm = async (formName, formType) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
  
        // Determine the collection based on the form type
        let collectionName;
        if (formType === 'CannibalizationForm') {
          collectionName = 'cannibalization_forms';
        } else if (formType === 'SerialNoForm') {
          collectionName = 'serial_number_forms';
        } else {
          console.error("Invalid form type specified.");
          return null;
        }
  
        // Generate a new form ID (using Firestore's auto ID generation)
        const newFormRef = collection(db, collectionName);
        const newFormDoc = await addDoc(newFormRef, {
         
         name:formType,
       
          status: false, // or any default status you prefer
          createdAt: new Date().toISOString(), // Optional: to track when the form was created
        });
  
        // Return the new form ID
        const newFormId = newFormDoc.id;
  
        console.log(`New form created with ID: ${newFormId}`);
        return newFormId;
      } else {
        console.error("User is not authenticated.");
        return null;
      }
    } catch (error) {
      console.error("Error creating new form: ", error);
      return null;
    }
  };
 export  const updateFormStatus = async (formId, newStatus) => {
    const formDocRef = doc(db, `CannibalizationForms/${formId}/generalInfo`); //for over all form
    await updateDoc(formDocRef, { status: newStatus });
  };
  export const fetchFormPartData = async (formId, partName) => {
    const docRef = doc(db, 'CannibalizationForms', formId, 'Parts', partName); //modify for yoour form part
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('No such document!');
      return null;
    }
  };
  
  export const updateFormPart = async (formId, partName, data) => {  //modify for yoour form part
    const docRef = doc(db, 'CannibalizationForms', formId, 'Parts', partName);
    await setDoc(docRef, data, { merge: true });
  };
  
  //modify this function for part status
  export const updateFormPartStatus = async (formId, status) => {
    const docRef = doc(db, 'CannibalizationForms', formId);
    await updateDoc(docRef, { status });
  };
  