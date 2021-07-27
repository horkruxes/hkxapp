import * as React from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { Message, TabTwoParamList } from "../types";
import MessageList from "../components/MessageList";
import { ListType } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { SourcesHK } from "../utils/sources";
import { useStateContext } from "../state/state";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabTwoScreen({ navigation }: Props) {
  const { state, dispatch } = useStateContext();
  const { sources } = state;

  useEffect(() => {
    console.log("sources:", sources);
  });

  return (
    <MessageList
      navigation={navigation}
      options={{ sources, type: ListType.All, arg: "" }}
    />
  );
}
