import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import elliptic, { eddsa as EdDSA } from "elliptic";
import * as Random from "expo-random";
import { testing, test2, testNoble, verifyOwnership } from "../../utils/crypto";
type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function KeysManagementScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const test = elliptic.utils;
  const keyGen = async () => {
    testing();
  };
  return (
    <>
      <Text>Hi</Text>
      <TextInput onChangeText={onChangeText} value={text} />
      <Button title="Hi" onPress={keyGen} />
      <Button title="Hi 2" onPress={test2} />
      <Button title="Hi 3" onPress={testNoble} />
    </>
  );
}
