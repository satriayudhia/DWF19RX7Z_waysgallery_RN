import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

//Configs
import colors from "../configs/colors";

//Components
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Profile from "../screens/Profile";
import ProfileUser from "../screens/ProfileUser";

const Stack = createStackNavigator();
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={TransitionScreenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { LoginStackNavigator, MainStackNavigator, ProfileStackNavigator };

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontWeight: "200",
    fontSize: 22,
  },
});
