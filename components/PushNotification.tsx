// import React, { useEffect, useState } from 'react';
// import { View, Button, Text, StyleSheet, Platform, Alert } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// // Initialize Firebase if not already done
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     // Your Firebase credentials here
//   });
// }

// const NotificationComponent = () => {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
//   const [notification, setNotification] = useState<any>(null);
//   const notificationListener = React.useRef<any>();
//   const responseListener = React.useRef<any>();

//   // Request permissions and get the push notification token
//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => {
//       if (token) {
//         setExpoPushToken(token);
//       } else {
//         Alert.alert('Failed to get push token');
//       }
//     });

//     // Handle incoming notifications
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   // Send a push notification
//   const sendPushNotification = async (role: string) => {
//     if (!expoPushToken) {
//       Alert.alert('Push token not available');
//       return;
//     }

//     const message = {
//       to: expoPushToken,
//       sound: 'default',
//       title: 'Approval Needed',
//       body: `${role} needs to approve the form part.`,
//       data: { someData: 'goes here' },
//     };

//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Your expo push token: {expoPushToken || 'Fetching...'}</Text>

//       <Button
//         title="Notify Shift Incharge"
//         onPress={() => sendPushNotification('Shift Incharge')}
//       />

//       <Button
//         title="Notify DCE Rotable Planning"
//         onPress={() => sendPushNotification('DCE Rotable Planning')}
//       />
//     </View>
//   );
// };

// // Function to request push notification permissions
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus.granted ? 'granted' : 'denied';
//     if (!existingStatus.granted) {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       Alert.alert('Failed to get push token for push notification!');
//       return null;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     Alert.alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default NotificationComponent;
