import * as React from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Sep from "../components/Separator";

import { Text, View } from "../components/Themed";
import { Message } from "../types";
import { Feather } from "@expo/vector-icons";
import { MessageComp } from "../components/Message";
import { cleanMessages } from "../utils/signature";
import { loadMessages } from "../utils/dataLoading";
import MessageList from "../components/MessageList";
import { ListType } from "../types";

export default function TabTwoScreen() {
  let [sources, setSources] = useState<string[]>([
    "horkruxes.amethysts.studio",
    "hk.quimerch.com",
    "fr.hk.quimerch.com",
  ]);
  let [type, setType] = useState<ListType>(ListType.All);
  let [arg, setArg] = useState("");

  return <MessageList options={{ sources, type, arg }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  msgAuthor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
});
