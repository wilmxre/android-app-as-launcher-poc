import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  PermissionsAndroid,
} from "react-native";
import RNLockTask from "react-native-lock-task";
import ReactNativeForegroundService from "rn-foreground-service";

const { PermissionModule } = NativeModules;

const Stack = createNativeStackNavigator();

const INTERVAL = 2 * 60 * 1000; // 2 minutes

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
    });
  };

  const stopTask = async () => {
    await ReactNativeForegroundService.stopAll();
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
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

  const requestNotificationSettings = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
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

  const register = () => {
    ReactNativeForegroundService.register();
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      <Button onPress={register} title="Register" />
      <Button onPress={addTask} title="Add foreground Service Task" />
      <Button onPress={startTask} title="Start The foreground Service" />
      <Button onPress={stopTask} title="Stop The foreground Service" />
      <Button
        onPress={requestLocationPermission}
        title="Request Location Permission"
      />
      <Button
        onPress={requestNotificationSettings}
        title="Request notification Permission"
      />
      <Button onPress={addPin} title="Add pin" />
    </View>
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
    gap: 64,
  },
});
