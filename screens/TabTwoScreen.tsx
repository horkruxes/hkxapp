import * as React from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Sep from "../components/Separator";

import { Text, View } from "../components/Themed";
import { Message, TabTwoParamList } from "../types";
import { Feather } from "@expo/vector-icons";
import { MessageComp } from "../components/Message";
import { cleanMessages } from "../utils/signature";
import { loadMessages } from "../utils/dataLoading";
import MessageList from "../components/MessageList";
import { ListType } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabTwoScreen({ navigation }: Props) {
  let [sources, setSources] = useState<string[]>([
    "horkruxes.amethysts.studio",
    "hk.quimerch.com",
    "fr.hk.quimerch.com",
  ]);
  let [type, setType] = useState<ListType>(ListType.All);
  let [arg, setArg] = useState("");

  return (
    <MessageList navigation={navigation} options={{ sources, type, arg }} />
  );
}
