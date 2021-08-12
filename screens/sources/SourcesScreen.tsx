import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { FlatList, Pressable, SafeAreaView, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  Checkbox,
} from "react-native-paper";

import {
  addSourceStorage,
  deleteAllSourceStorage,
  deleteSourceStorage,
  SourceHK,
  toggleSourceStorage,
} from "../../utils/sources";
import { useStateContext } from "../../state/state";
import { ActionType } from "../../state/reducer";
import { Feather } from "@expo/vector-icons";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabSourcesScreen({ navigation }: Props) {
  const [url, setUrl] = React.useState("");
  const [URLInput, toggleURLInput] = React.useState(false);
  const { state, dispatch } = useStateContext();
  const { sources } = state;

  const colorScheme = useColorScheme();

  const addSource = async () => {
    addSourceStorage(url);
    dispatch({
      type: ActionType.ADD_SOURCE,
      payload: [{ url: url.toLowerCase().trim(), enabled: true }],
    });
    setUrl("");
    toggleURLInput(false);
  };

  const toggleSource = async (url: string) => {
    toggleSourceStorage(url);
    dispatch({
      type: ActionType.TOGGLE_SOURCE,
      payload: [{ url, enabled: true }],
    });
  };

  const removeSource = async (url: string) => {
    deleteSourceStorage(url);
    dispatch({
      type: ActionType.REMOVE_SOURCE,
      payload: [{ url, enabled: true }],
    });
  };

  return (
    <>
      {URLInput && (
        <View style={{ padding: 12 }}>
          <TextInput
            label="URL"
            mode="outlined"
            onChangeText={setUrl}
            value={url}
          />
          <Button onPress={addSource}>Add new source</Button>
        </View>
      )}

      <Button onPress={addSource}>Refresh messages</Button>
      {/* <Button onPress={deleteAllSourceStorage}>Remove all</Button> */}
      <FlatList
        data={sources}
        keyExtractor={(item) => item.url}
        renderItem={({ item }: { item: SourceHK }) => (
          <>
            <View
              style={{
                marginVertical: 4,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox.Item
                style={{ paddingLeft: 4 }}
                position="leading"
                label={item.url}
                status={item.enabled ? "checked" : "unchecked"}
                onPress={() => toggleSource(item.url)}
              />
              <View style={styles.icons}>
                <Feather
                  name="wifi-off"
                  size={18}
                  color="red"
                  style={styles.icon}
                />
                <Pressable onPress={() => removeSource(item.url)}>
                  <Feather
                    name="trash-2"
                    size={18}
                    color="grey"
                    style={styles.icon}
                  />
                </Pressable>
                <Feather
                  name="refresh-ccw"
                  size={18}
                  color="grey"
                  style={styles.icon}
                />
              </View>
            </View>
          </>
        )}
      />
      <FAB
        style={styles.fab}
        icon={URLInput ? "close" : "plus"}
        onPress={() => toggleURLInput(!URLInput)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 12,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});
