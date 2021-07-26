import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { TextInput, Button } from "react-native-paper";
import elliptic, { eddsa as EdDSA } from "elliptic";
import * as Random from "expo-random";
import {
  genKeyPairAndStore,
  KeyPairHK,
  loadKeyPairsFromStorage,
  testing,
} from "../../utils/crypto";

type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function KeysManagementScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("");
  const [keyPairs, setKeys] = React.useState<KeyPairHK[]>([]);
  const keyGen = async () => {
    genKeyPairAndStore(text);
    getKeyPairs();
  };

  const getKeyPairs = async () => {
    const keyPairs = await loadKeyPairsFromStorage();
    setKeys(keyPairs);
  };

  React.useEffect(() => {
    getKeyPairs();
  }, []);

  return (
    <>
      <View style={styles.newKeyPair}>
        <TextInput
          label="name"
          mode="outlined"
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter a name for your new key pair"
        />
        <Button onPress={keyGen}> Add a new Key pair</Button>
      </View>
      <FlatList
        data={keyPairs}
        keyExtractor={(item) => item.PublicBase64}
        renderItem={({ item }: { item: KeyPairHK }) => (
          <>
            <Text>{item.PrivateBase64}</Text>
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  main: {},
  newKeyPair: {
    padding: 12,
  },
});
