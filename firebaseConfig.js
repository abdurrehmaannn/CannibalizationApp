// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore,collection,query,where,getDocs,getDoc, addDoc, doc, setDoc,deleteDoc } from 'firebase/firestore';

// Firebase configuration object for your web app
const firebaseConfig = {
  apiKey: "AIzaSyAe_J2hGwf8q6rFmhiyaUoyAstJ0cE6TBw",
  authDomain: "myproject-27e5c.firebaseapp.com",
  projectId: "myproject-27e5c",
  storageBucket: "myproject-27e5c.appspot.com",
  messagingSenderId: "439175428661",
  appId: "1:439175428661:web:4d91f695a8c529af550f7c"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

// const saveFormData = async (formData, formType) => {
//   try {
//     const user = auth.currentUser;
//     if (user) {
//       const uid = user.uid;

//       // Create a collection name based on the form type
//       const formCollectionName = `${formType}_forms`;

//       // Reference to the specific form type collection
//       const formCollectionRef = collection(db, formCollectionName);

//       // Add the form data to the form type collection with the user's UID
//       await addDoc(formCollectionRef, { ...formData, userId: uid });

//       console.log(`${formType} form data saved successfully!`);
//     } else {
//       console.error("User is not authenticated.");
//     }
//   } catch (error) {
//     console.error(`Error saving ${formType} form data: `, error);
//   }
// };

// Function to retrieve form data
export const fetchCannibalizationRequests = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      // Reference to the CannibalizationRequest collection
      const formCollectionRef = collection(db, 'CannibalizationRequest_forms');
      // Query to filter documents by userId
      const q = query(formCollectionRef, where('userId', '==', 'IOLf0mg6VvY8UYmn6cgsyF5pQYB2'));
      const querySnapshot = await getDocs(q);

      // Map the documents to an array of form data
      const formData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched CannibalizationRequest forms:', formData);
      return formData;
    } else {
      console.error('User is not authenticated.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching CannibalizationRequest forms: ', error);
    return [];
  }
};
export const getUserRole = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      // Reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Extract the role from the user document
        const userData = userDoc.data();
        const role = userData.role;
        console.log('User role:', role);
        return role;
      } else {
        console.error('User document does not exist.');
        return null;
      }
    } else {
      console.error('User is not authenticated.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};


export const fetchFormData = async (formName) => {
  try {
    const docRef = doc(db, 'forms', formName); // Adjust the path as needed
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No data found for this form.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchFormId = async (formType) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      // Create a reference to the form collection
      const formCollectionName = `${formType}_forms`;
      const formCollectionRef = collection(db, formCollectionName);

      // Query to find the document(s) where the userId matches the current user's UID
      const q = query(formCollectionRef, where('CannibalizationRequest.userId', '==', uid));

      // Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming you're only interested in the first document (or unique form per user)
        const docSnapshot = querySnapshot.docs[0];
        const formId = docSnapshot.id;

        console.log(`Fetched formId: ${formId}`);
        return formId;
      } else {
        console.log("No form found for the current user.");
        return null;
      }
    } else {
      console.error("User is not authenticated.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching formId: ", error);
    return null;
  }
};

export const getFormDataById = async (formType, formId) => {
  try {
    // Create a reference to the document with the specific formId
    const formDocRef = doc(db, `${formType}_forms`, formId);
    
    // Fetch the document from Firestore
    const formDoc = await getDoc(formDocRef);
    
    if (formDoc.exists()) {
      // Document found, extract and return the data
      const formData = formDoc.data();
      console.log('Fetched form data:', formData);
      return formData;
    } else {
      // Document with formId does not exist
      console.log('No such form exists.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching form data: ', error);
    return null;
  }
};

const saveFormData = async (formData, formPart, formType, formId = null) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      // Create a reference to the form collection (e.g., cannibalizationForms)
      const formCollectionName = `${formType}_forms`;
      const formCollectionRef = collection(db, formCollectionName);

      let formDocRef;

      // If formId is provided, we update the existing document; otherwise, create a new one
      if (formId) {
        formDocRef = doc(formCollectionRef, formId);
      } else {
        formDocRef = doc(formCollectionRef);
        formId = formDocRef.id;
      }

      // Prepare the data to be saved or updated
      const formPartData = {
        [`${formPart}`]: {
          ...formData,
          userId: uid,
          timestamp: new Date(),
        },
      };

      // Check if the document already exists
      const docSnapshot = await getDoc(formDocRef);
      if (docSnapshot.exists()) {
        // Update the document with the new form part data
        await updateDoc(formDocRef, formPartData);
      } else {
        // Set the document with the new form part data
        await setDoc(formDocRef, {
          ...formPartData,
          createdAt: new Date(),
        });
      }

      console.log(`${formType} ${formPart} data saved successfully!`);

      // Return formId to allow further updates to the same document
      return formId;
    } else {
      console.error("User is not authenticated.");
    }
  } catch (error) {
    console.error(`Error saving ${formType} ${formPart} data: `, error);
  }
};

export async function deleteDocument(collectionName, documentId) {
  try {
    // Reference to the document
    const docRef = doc(db, collectionName, documentId);
    
    // Delete the document
    await deleteDoc(docRef);
    
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document');
  }
}

export { auth, createUserWithEmailAndPassword, db, doc, saveFormData, getDoc, setDoc, signInWithEmailAndPassword };
