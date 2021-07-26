import * as React from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { Message, TabTwoParamList } from "../types";
import MessageList from "../components/MessageList";
import { ListType } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabTwoScreen({ navigation }: Props) {
  let [sources, setSources] = useState<string[]>(["test.hk.quimerch.com"]);
  let [type, setType] = useState<ListType>(ListType.All);
  let [arg, setArg] = useState("");

  return (
    <MessageList navigation={navigation} options={{ sources, type, arg }} />
  );
}
