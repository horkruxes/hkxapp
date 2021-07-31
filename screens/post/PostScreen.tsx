import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import {
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  TextInput,
  RadioButton,
  Switch,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import {
  genKeyPairAndStore,
  KeyPairHK,
  loadKeyPairsFromStorage,
  signer,
  testing,
} from "../../utils/crypto";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

type Props = {
  navigation: StackNavigationProp<TabTwoParamList>;
};

export default function TabPostScreen({ navigation }: Props) {
  const defaultKey = {
    Name: "",
    PublicBase64: "",
    PrivateBase64: "",
  };
  const [text, onChangeText] = React.useState("");
  const [name, setName] = React.useState("");
  const [podURL, setPodURL] = React.useState("");
  const [keyPairs, setKeys] = React.useState<KeyPairHK[]>([]);
  const [selectedKey, setSelectedKey] = React.useState<KeyPairHK>(defaultKey);
  const [useDifferentName, setUseDifferentName] = React.useState(false);
  const [differentNameModal, setDifferentNameModal] = React.useState(false);

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
      <Provider>
        <Portal>
          <Modal
            visible={differentNameModal}
            onDismiss={() => setDifferentNameModal(false)}
            contentContainerStyle={{ marginHorizontal: 30, marginBottom: 90 }}
          >
            <View style={{ backgroundColor: "#fff" }}>
              <Text style={{ margin: 20 }}>
                When you post a message, your name is not important. What
                identifies you is your public key, so you can change your name
                as you wish. Be aware that even if you change your name, this
                message will be linked to this public key. If you want to post
                anonymously, just generate a new key.
              </Text>
            </View>
          </Modal>
        </Portal>
        <View style={styles.newKeyPair}>
          <ScrollView>
            <Text>Key pair</Text>
            <Picker
              prompt="Choose your identity"
              selectedValue={selectedKey.PublicBase64}
              style={{ padding: 2, marginVertical: 20, backgroundColor: "red" }}
              onValueChange={(itemValue: string) => {
                const key = keyPairs.find(
                  (keyPair) => keyPair.PublicBase64 === itemValue
                );
                setSelectedKey(key || defaultKey);
              }}
            >
              {keyPairs.map((keyPair) => (
                <Picker.Item
                  key={keyPair.PublicBase64}
                  label={`${keyPair.Name} - ${keyPair.PublicBase64.substr(
                    0,
                    10
                  )}`}
                  value={keyPair.PublicBase64}
                />
              ))}
            </Picker>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>
                  Use a different name than {selectedKey.Name.substr(0, 8)}
                </Text>
                <Pressable
                  onPress={() => setDifferentNameModal(true)}
                  style={{ marginHorizontal: 5 }}
                >
                  <Feather name="info" size={18} color="grey" />
                </Pressable>
              </View>
              <Switch
                color="#9900cc"
                value={useDifferentName}
                onValueChange={() => setUseDifferentName(!useDifferentName)}
              />
            </View>

            {useDifferentName && (
              <TextInput
                label="Name or nickname"
                mode="outlined"
                onChangeText={setName}
                value={name}
                placeholder="Leave empty to use the name set on the key"
              />
            )}
            <TextInput
              label="URL"
              mode="outlined"
              onChangeText={setPodURL}
              value={podURL}
              placeholder="Where to send your message to (ex: hk.quimerch.com)"
            />
            <TextInput
              label="Article"
              mode="outlined"
              multiline
              numberOfLines={5}
              onChangeText={onChangeText}
              value={text}
              placeholder="Secret key (leave empty to generate one)"
            />

            <Button
              onPress={() => {
                const signature = signer(
                  selectedKey.PrivateBase64,
                  selectedKey.PublicBase64,
                  useDifferentName ? name : selectedKey.Name,
                  text
                );
                console.log("signature", signature);
              }}
            >
              Send message
            </Button>
          </ScrollView>
        </View>
      </Provider>
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
