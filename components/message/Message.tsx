import * as React from "react";
import {
  ListType,
  Message,
  MessageOptions,
  TabTwoParamList,
} from "../../types";
import { Text, View } from "../Themed";
import { Pressable, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { verifyOwnership } from "../../utils/crypto";

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
  // console.log("opt", options);

  const onClickMessage = () => {
    console.log("click to", message.ID);
    navigation.navigate("Comments", {
      messageId: message.ID,
    });
  };

  const onClickAuthor = () => {
    console.log("click to", message.ID);
    navigation.navigate("Comments", {
      messageId: message.ID,
    });
  };
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.header}>
          {!message.Correct && (
            <Text style={styles.wrongSignatureWarning}>
              Incorrect signature. The message might have been corrupted on the
              database.
            </Text>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 4,
                marginRight: 4,
                backgroundColor: message.Color,
              }}
            />
            <Text style={styles.msgAuthor}>{message.displayedName}</Text>
            {!fullText && (
              <Text style={styles.infos}>
                {message.AuthorBase64.substr(0, 10)}
              </Text>
            )}
          </View>
          {fullText && (
            <Text>
              {!message.Correct && "❌"}
              <Text style={styles.infos}>{message.AuthorBase64}</Text>
            </Text>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.infos}>{message.CreatedAt.substr(0, 10)}</Text>
            <Text style={styles.infos}> on {message.Pod}</Text>
          </View>
        </View>
        <Pressable onPress={onClickMessage}>
          <Text numberOfLines={fullText ? undefined : 10}>
            {message.Content}
          </Text>
        </Pressable>
      </View>
    </View>
  );
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
