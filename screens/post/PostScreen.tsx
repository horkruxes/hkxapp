import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabPostScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("Useless Text");

  return (
    <>
      <Text>Hidwadwdaldka dwad awdadwad addw</Text>
      <TextInput onChangeText={onChangeText} value={text} />
    </>
  );
}
