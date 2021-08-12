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

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type MessageFullProps = {
  navigation: ScoresScreenNavigationProp;
  message: Message;
};

export const MessageFull = ({ message, navigation }: MessageFullProps) => {
  const onClickAuthor = () => {
    console.log("click to author", message.AuthorBase64);
    navigation.navigate("Author", {
      userIdBase64: message.AuthorBase64,
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
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.infos}>{message.CreatedAt?.substr(0, 10)}</Text>
            <Text style={styles.infos}> on {message.Pod}</Text>
          </View>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onClickAuthor}
          >
            <>
              <Text>
                {!message.Correct && "❌"}
                <Text style={styles.infos}>Author: {message.AuthorBase64}</Text>
              </Text>
              <Text style={styles.infos}>
                Signature: {message.SignatureBase64}
              </Text>
            </>
          </TouchableHighlight>
        </View>

        <Text>{message.Content}</Text>
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
