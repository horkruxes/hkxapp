/**
 * Learn more about createTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import Faq from "../screens/info/faq";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import MessageList from "../components/MessageList";
import Comments from "../screens/lists/comments";

const Tab = createMaterialTopTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="HK"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <Tab.Screen
        name="Options"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HK"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Options & Information" }}
      />
      <TabOneStack.Screen
        name="Faq"
        component={Faq}
        options={{ headerTitle: "FAQ" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Messages"
        component={TabTwoScreen}
        options={{ headerTitle: "Messages" }}
      />
      <TabTwoStack.Screen
        name="Comments"
        component={Comments}
        options={{ headerTitle: "Comments" }}
      />
    </TabTwoStack.Navigator>
  );
}
