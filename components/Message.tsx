import * as React from "react";
import { ListType, Message, MessageOptions, TabTwoParamList } from "../types";
import { Text, View } from "../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { verifier } from "../screens/keys/crypto";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

export type MessageCompProps = {
  navigation: ScoresScreenNavigationProp;
  message: Message;
};

export const MessageComp = ({ message, navigation }: MessageCompProps) => {
  // console.log("opt", options);

  const onClickMessage = () => {
    console.log("click to", message.ID);
    navigation.navigate("Comments", {
      messageId: message.ID,
    });
  };
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {verifier(
              message.authorBase64,
              message.content,
              message.signatureBase64
            ) ? (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 4,
                  marginRight: 4,
                  backgroundColor: "green",
                }}
              />
            ) : (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 4,
                  marginRight: 4,
                  backgroundColor: "red",
                }}
              />
            )}
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
            <Text style={styles.infos}>on {message.Pod}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text numberOfLines={1} style={styles.infos}>
              {message.authorBase64}
            </Text>
          </View>
        </View>
        <Pressable onPress={onClickMessage}>
          <Text numberOfLines={10}>{message.content}</Text>
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
