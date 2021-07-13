import * as React from "react";
import { Message } from "../types";
import { Text, View } from "../components/Themed";
import Sep from "../components/Separator";
import { Pressable, StyleSheet } from "react-native";

const colorFromAuthor = (message: Message): string => {
  return "blue";
};

export const MessageComp = ({ message }: { message: Message }) => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.header}>
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
            <Text style={styles.infos}>on {message.Pod}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text numberOfLines={1} style={styles.infos}>
              {message.authorBase64}
            </Text>
          </View>
        </View>
        <Text numberOfLines={6}>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginVertical: 4,
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
