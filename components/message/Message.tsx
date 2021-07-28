import * as React from "react";
import {
  ListType,
  Message,
  MessageOptions,
  TabTwoParamList,
} from "../../types";
import { Text, View } from "../Themed";
import {
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { verifyOwnership } from "../../utils/crypto";
import { MessageFull } from "./MessageFull";
import { MessageSmall } from "./MessageSmall";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

export type MessageCompProps = {
  navigation: ScoresScreenNavigationProp;
  message: Message;
  fullText?: boolean;
};

export const MessageComp = ({
  message,
  navigation,
  fullText,
}: MessageCompProps) => {
  if (fullText) {
    return <MessageFull message={message} navigation={navigation} />;
  } else {
    return <MessageSmall message={message} navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 8,
  },
  header: {},
  infos: {
    color: "#888",
    fontStyle: "italic",
  },
  wrongSignatureWarning: {
    color: "red",
    fontStyle: "italic",
  },
  content: {
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  colorBox: {
    height: 10,
    width: "100%",
    backgroundColor: "red",
  },
  msgAuthor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
});
