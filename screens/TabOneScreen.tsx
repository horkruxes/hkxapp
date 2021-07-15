import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Button, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { TabOneParamList } from "../types";

type ScoresScreenNavigationProp = StackNavigationProp<TabOneParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabOneScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button title="FAQ" onPress={() => navigation.navigate("Faq")} />
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
