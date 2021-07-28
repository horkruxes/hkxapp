import { StackNavigationProp } from "@react-navigation/stack";
import { TabTwoParamList } from "../../types";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
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
  SourcesHK,
  toggleSourceStorage,
} from "../../utils/sources";
import { useStateContext } from "../../state/state";
import { ActionType } from "../../state/reducer";

type ScoresScreenNavigationProp = StackNavigationProp<TabTwoParamList>;

type Props = {
  navigation: ScoresScreenNavigationProp;
};

export default function TabSourcesScreen({ navigation }: Props) {
  const [url, setUrl] = React.useState("");

  const { state, dispatch } = useStateContext();
  const { sources } = state;

  const addSource = async () => {
    addSourceStorage(url);
    dispatch({
      type: ActionType.ADD_SOURCE,
      payload: [{ url: url.toLowerCase().trim(), enabled: true }],
    });
    setUrl("");
  };

  const toggleSource = async (url: string) => {
    toggleSourceStorage(url);
    dispatch({
      type: ActionType.TOGGLE_SOURCE,
      payload: [{ url, enabled: true }],
    });
  };

  return (
    <>
      <View style={{ padding: 12 }}>
        <TextInput
          label="URL"
          mode="outlined"
          onChangeText={setUrl}
          value={url}
        />
        <Button onPress={addSource}>Add a new source</Button>
      </View>
      <FlatList
        data={sources}
        keyExtractor={(item) => item.url}
        renderItem={({ item }: { item: SourcesHK }) => (
          <>
            <Card style={{ marginVertical: 4, flexDirection: "row" }}>
              <Checkbox.Item
                label={item.url}
                status={item.enabled ? "checked" : "unchecked"}
                onPress={() => toggleSource(item.url)}
              />
            </Card>
          </>
        )}
      />
    </>
  );
}
