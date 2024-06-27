import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
} from "react-native";
import RNLockTask from "react-native-lock-task";

const Stack = createNativeStackNavigator();

const { LauncherModule } = NativeModules;

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

    // addPin();
  }, []);

  const setAsDefaultLauncher = () => {
    LauncherModule.setAsDefaultLauncher();
  };

  const openDefaultAppsSettings = () => {
    LauncherModule.openDefaultAppsSettings();
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      <Button title="Set as Default Launcher" onPress={setAsDefaultLauncher} />
      <Button
        title="Restore Default Launcher"
        onPress={openDefaultAppsSettings}
      />
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
