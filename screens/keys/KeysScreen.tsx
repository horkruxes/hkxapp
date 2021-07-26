import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
} from "react-native-paper";
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
  const [givenPub64, setGivenPub64] = React.useState("");
  const [givenSec64, setGivenSec64] = React.useState("");
  const [keyPairs, setKeys] = React.useState<KeyPairHK[]>([]);
  const keyGen = async () => {
    await genKeyPairAndStore(text, givenSec64, givenPub64);
    getKeyPairs();
  };

  const getKeyPairs = async () => {
    const keyPairs = await loadKeyPairsFromStorage();
    setGivenPub64("");
    setGivenSec64("");
    setKeys(keyPairs);
  };

  React.useEffect(() => {
    getKeyPairs();
  }, []);

  return (
    <>
      <View style={styles.newKeyPair}>
        <TextInput
          label="Name or nickname"
          mode="outlined"
          onChangeText={onChangeText}
          value={text}
          placeholder="Your name or nickname"
        />
        <TextInput
          label="Secret Key"
          mode="outlined"
          onChangeText={setGivenSec64}
          value={givenSec64}
          placeholder="Secret key (leave empty to generate one)"
        />
        <TextInput
          label="Prublic Key"
          mode="outlined"
          onChangeText={setGivenPub64}
          value={givenPub64}
          placeholder="Public key (leave empty to generate one)"
        />
        <Button onPress={keyGen}> Add a new Key pair</Button>
      </View>
      <FlatList
        data={keyPairs}
        keyExtractor={(item) => item.PublicBase64}
        renderItem={({ item }: { item: KeyPairHK }) => (
          <>
            <Card style={{ marginVertical: 4 }}>
              <Card.Title title={item.Name} />
              <Card.Content>
                <Paragraph>
                  <Text style={styles.bold}>Public Key </Text>
                  {item.PublicBase64}
                </Paragraph>

                <Paragraph>
                  <Text style={styles.bold}> Private Key </Text>
                  {item.PrivateBase64}
                </Paragraph>
              </Card.Content>
            </Card>
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
  bold: {
    fontWeight: "bold",
  },
});
