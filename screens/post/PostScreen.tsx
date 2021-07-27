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
import {
  genKeyPairAndStore,
  KeyPairHK,
  loadKeyPairsFromStorage,
  testing,
} from "../../utils/crypto";
import { Picker } from "@react-native-picker/picker";
type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function TabPostScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState("");
  const [name, setName] = React.useState("");
  const [podURL, setPodURL] = React.useState("");
  const [keyPairs, setKeys] = React.useState<KeyPairHK[]>([]);
  const [selectedKey, setSelectedKey] = React.useState<KeyPairHK>();

  const getKeyPairs = async () => {
    const keyPairs = await loadKeyPairsFromStorage();
    console.log(keyPairs);
    setKeys(keyPairs);
  };

  React.useEffect(() => {
    getKeyPairs();
  }, []);

  return (
    <>
      <View style={styles.newKeyPair}>
        <Title>Choose a key pair</Title>
        <Picker
          selectedValue={selectedKey}
          onValueChange={(itemValue, itemIndex) => setSelectedKey(itemValue)}
        >
          {keyPairs.map((keyPair) => (
            <Picker.Item
              key={keyPair.PublicBase64}
              label={keyPair.Name}
              value={keyPair.PublicBase64}
            />
          ))}
        </Picker>
        <TextInput
          label="Name or nickname"
          mode="outlined"
          onChangeText={setName}
          value={name}
          placeholder="Leave empty to use the name set on the key"
        />
        <TextInput
          label="Pod URL"
          mode="outlined"
          onChangeText={setPodURL}
          value={podURL}
          placeholder="Specify an url to send your message to (ex: hk.quimerch.com)"
        />
        <TextInput
          label="Article"
          mode="outlined"
          multiline
          onChangeText={onChangeText}
          value={text}
          placeholder="Secret key (leave empty to generate one)"
        />

        <Button onPress={() => {}}> Send message</Button>
      </View>
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
