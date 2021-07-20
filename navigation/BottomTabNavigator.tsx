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
import {
  BottomTabParamList,
  TabOneParamList,
  TabPostParamList,
  TabKeysParamList,
  TabTwoParamList,
} from "../types";
import Comments from "../screens/lists/comments";
import TabPostScreen from "../screens/post/PostScreen";
import TabKeysScreen from "../screens/keys/KeysScreen";

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
      <Tab.Screen
        name="Post"
        component={TabPostNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Keys"
        component={TabKeysNavigator}
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

const TabPostStack = createStackNavigator<TabPostParamList>();

function TabPostNavigator() {
  return (
    <TabPostStack.Navigator>
      <TabPostStack.Screen
        name="Post"
        component={TabPostScreen}
        options={{ headerTitle: "Post a message" }}
      />
    </TabPostStack.Navigator>
  );
}

const TabKeysStack = createStackNavigator<TabKeysParamList>();

function TabKeysNavigator() {
  return (
    <TabKeysStack.Navigator>
      <TabKeysStack.Screen
        name="Keys"
        component={TabKeysScreen}
        options={{ headerTitle: "Manage keys" }}
      />
    </TabKeysStack.Navigator>
  );
}
