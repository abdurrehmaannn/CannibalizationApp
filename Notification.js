import * as Notifications from "expo-notifications";

// Request permissions and get token
export async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Failed to get push token for push notification!");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  // Save this token to your backend if needed
  await saveTokenToBackend(token);

  return token;
}

// Save the push token to the backend
async function saveTokenToBackend(token) {
  // Replace with your backend API call
  await fetch("https://your-backend-api.com/save-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

// Send a push notification to a specific token
export async function sendPushNotification(
  token,
  title,
  body
) {
  const message = {
    to: token,
    sound: "default",
    title,
    body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

// Listen for incoming notifications
export function setupNotificationListeners() {
  Notifications.addNotificationReceivedListener(notification => {
    console.log("Notification received:", notification);
  });

  Notifications.addNotificationResponseReceivedListener(response => {
    console.log("Notification response received:", response);
  });
}
