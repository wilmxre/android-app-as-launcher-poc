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
} from "react-native";
import RNLockTask from "react-native-lock-task";
import ReactNativeForegroundService from "rn-foreground-service";

const { PermissionModule } = NativeModules;

const Stack = createNativeStackNavigator();

const INTERVAL = 15 * 60 * 1000; // 15 minutes

function HomeScreen() {
  useEffect(() => {
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

    addPin();
  }, []);

  useEffect(() => {
    ReactNativeForegroundService.add_task(() => log(), {
      delay: INTERVAL,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }, []);

  const startTask = () => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: "Foreground Service",
      message: "We are live World",
      icon: "ic_launcher",
      button: true,
      button2: true,
      buttonText: "Button",
      button2Text: "Anther Button",
      buttonOnPress: "cray",
      setOnlyAlertOnce: true,
      color: "#000000",
      progress: {
        max: 100,
        curr: 50,
      },
    });
  };

  const stopTask = () => {
    ReactNativeForegroundService.stopAll();
  };

  const requestCoarseLocation = async () => {
    try {
      const granted = await PermissionModule.requestCoarseLocation();
      alert(granted);
    } catch (error) {
      alert(error);
    }
  };

  const checkSelfPermission = async () => {
    try {
      const granted = await PermissionModule.checkSelfPermission();
      alert(granted);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      <Button onPress={startTask} title="Start The foreground Service" />
      <Button onPress={stopTask} title="Stop The foreground Service" />
      <Button onPress={requestCoarseLocation} title="Request Coarse Location" />
      <Button onPress={checkSelfPermission} title="Check Self Permission" />
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
