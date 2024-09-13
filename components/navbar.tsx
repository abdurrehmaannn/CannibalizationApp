import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app/app'; // Adjust the import path accordingly

export default function Navbar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    // You can add any logout logic here if needed
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navbar}>
      <Image
        source={require('../assets/images/pialogo.png')} // Replace with the path to your logo
        style={styles.logo}
      />
       
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#fff', // Bottle green color
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00332a', // Slightly darker green for border
  },
  logo: {
    width: 150,
    height: 70,
    marginRight: 25, // Space between logo and buttons
    justifyContent:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center', // Align buttons in the available space
    marginLeft: 10,
  },
  navbarButton: {
    color: '#004d40',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5, // Decreased spacing between buttons
  },
  logoutButton: {
    marginLeft: 'auto', // Move the logout button to the right side
  },
});
