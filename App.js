import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  AppState,
  ScrollView,
} from "react-native";
import RNLockTask from "react-native-lock-task";
import ReactNativeForegroundService from "./foregroundService";

const Stack = createNativeStackNavigator();

const INTERVAL = 1000 * 60 * 5; // 5 minutes

const requestNotificationSettings = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the notification");
      alert("You can use the notification");
    } else {
      console.log("notification permission denied");
      alert("notification permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
      alert("You can use the location");
    } else {
      console.log("location permission denied");
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const addPin = async () => {
  try {
    const isPinned = await RNLockTask?.isAppInLockTaskMode();

    if (!isPinned && AppState.currentState === "active") {
      RNLockTask?.startLockTask();
    }
  } catch (error) {
    console.log(error);
  }
};

const createMemoryLeak = () => {
  const leakyArray = [];
  const intervalId = setInterval(() => {
    leakyArray.push({ data: new Array(100000000).fill("leak") });
  }, 200);
};

function HomeScreen() {
  useEffect(() => {
    ReactNativeForegroundService.add_task(() => console.log("hello"), {
      delay: INTERVAL,
      onLoop: true,
      taskId: "1244",
    });
  }, []);

  const startTask = async () => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: "Foreground Service",
      message: "Testing Foreground Service",
      icon: "ic_launcher",
      setOnlyAlertOnce: true,
      color: "#d399f2",
      importance: "max",
      visibility: "public",
      ongoing: true,
    });
  };

  const stopTask = async () => {
    await ReactNativeForegroundService.stopAll();
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={addPin} title="Add pin" />
      <Button
        onPress={requestNotificationSettings}
        title="Request notification Permission"
      />
      <Button
        onPress={requestLocationPermission}
        title="Request Location Permission"
      />
      <Button onPress={startTask} title="Start The foreground Service" />
      <Button onPress={stopTask} title="Stop The foreground Service" />
      <Button onPress={createMemoryLeak} title="Create Memory leak" />
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
});
