import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import elliptic, { eddsa as EdDSA } from "elliptic";
import * as Random from "expo-random";
import { testing, test2, testNoble, verifier } from "./crypto";
type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function KeysManagementScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("Useless Text");
  const test = elliptic.utils;
  const keyGen = async () => {
    testing();
    // const privateKey = Random.getRandomBytes(32);
    // const msgHash = "deabeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";

    // const publicKey = await ed.getPublicKey(privateKey);
    // console.log("pub", publicKey);
    // // const signature = await ed.sign(msgHash, privateKey);
    // // const isSigned = await ed.verify(signature, msgHash, publicKey);
    // // console.log("is signed", isSigned);

    // console.log("hi");
    // console.log(privateKey);
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
