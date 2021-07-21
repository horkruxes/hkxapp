import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import * as ed from "./ed";
import * as Random from "expo-random";

type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function KeysManagementScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("Useless Text");

  const keyGen = async () => {
    const privateKey = Random.getRandomBytes(32);
    const msgHash = "deabeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";

    const publicKey = await ed.getPublicKey(privateKey);
    console.log("pub", publicKey);
    // const signature = await ed.sign(msgHash, privateKey);
    // const isSigned = await ed.verify(signature, msgHash, publicKey);
    // console.log("is signed", isSigned);

    console.log("hi");
    console.log(privateKey);
  };
  return (
    <>
      <Text>Hi</Text>
      <TextInput onChangeText={onChangeText} value={text} />
      <Button title="Hi" onPress={keyGen} />
    </>
  );
}
