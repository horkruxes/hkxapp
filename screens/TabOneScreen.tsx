import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Text, View } from "../components/Themed";
import { TabOneParamList } from "../types";

type ScoresScreenNavigationProp = StackNavigationProp<TabOneParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabOneScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={() => navigation.navigate("Faq")}>
        FAQ
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Keys")}>
        Manage keys
      </Button>
      <Button onPress={() => navigation.navigate("Sources")}>
        Manage Sources
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
