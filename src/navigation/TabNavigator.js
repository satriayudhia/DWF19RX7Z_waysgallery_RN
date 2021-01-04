import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import colors from "../configs/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, style }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            size = 36;
          } else if (route.name === "Add") {
            iconName = "add-circle";
            size = 62;
            color = "#15a3b9";
            style = { paddingBottom: 12 };
          } else if (route.name === "Profile") {
            iconName = "account-circle";
            size = 36;
          }
          return (
            <MaterialIcons
              name={iconName}
              size={size}
              color={color}
              style={style}
            />
          );
        },
        tabBarLabel: () => {
          return null;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: "#6d747e",
      }}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />

      <Tab.Screen name="Add" component={ProfileStackNavigator} />

      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
