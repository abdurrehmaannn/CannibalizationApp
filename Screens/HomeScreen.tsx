import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { RootStackParamList } from "../app/app";
import FormTable from "@/components/formTable";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "@/components/Logout";
import NewCannibalizationFormButton from "@/components/NewCannibalizationForm";
import NewSerialNoFormButton from "@/components/NewSerialNoForm";

type Props = NativeStackScreenProps<RootStackParamList, "SelectForm">;

export default function SelectFormScreen({ navigation }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.log("User not authenticated");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", userId));
      const userRole = userDoc.data()?.role;
      setIsAdmin(userRole === "Server Admin");
    };

    checkUserRole();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Conditionally render the signup button */}
        {isAdmin && (
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Ionicons name="person-add-outline" size={24} color="#fff" />
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>
        )}

        <NewCannibalizationFormButton />
        <NewSerialNoFormButton />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() =>
            navigation.navigate({ name: "Signup", params: undefined })
          } // Fix the navigate structure
        >
          <Ionicons name="person-add-outline" size={24} color="#fff" />
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
        <LogoutButton></LogoutButton>
      </View>

      <View style={styles.tableContainer}>
        <FormTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjust to space buttons evenly
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  signupButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745", // Green color for signup button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  tableContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignSelf: "center",
  },
});
