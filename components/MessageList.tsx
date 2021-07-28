import * as React from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { ListType, Message, MessageOptions, TabTwoParamList } from "../types";
import { MessageComp } from "./message/Message";
import { loadMessages } from "../utils/dataLoading";
import { StackNavigationProp } from "@react-navigation/stack";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

export type MessageListProps = {
  navigation: ScoresScreenNavigationProp;
  options: MessageOptions;
};

export default function MessageList({ options, navigation }: MessageListProps) {
  let [refreshing, setRefreshing] = useState(false);
  let [messages, setMessages] = useState<Message[]>([]);

  const getOnlineData = async () => {
    console.log("get online data with", options);
    const newMessages = await loadMessages(options);
    setMessages(newMessages);
    setRefreshing(false);
  };

  useEffect(() => {
    getOnlineData();
  }, [options]);

  const defaultMessage: Message = {
    ID: "0",
    Content: "No message yet! Add a new source or activate one of them!",
    Color: "#0000",
    Correct: true,
    AuthorBase64: "",
    SignatureBase64: "",
    Pod: "",
    displayedName: "Info",
    MessageID: "",
    CreatedAt: "",
    DisplayedDate: "",
    authorURLSafe: "",
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages?.length > 0 ? messages : [defaultMessage]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOnlineData} />
        }
        keyExtractor={(item) => item.ID}
        renderItem={({ item: msg }: { item: Message }) => (
          <MessageComp
            message={msg}
            navigation={navigation}
            fullText={options.type === ListType.Comments}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  msgAuthor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
});
