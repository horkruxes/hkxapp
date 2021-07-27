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

import { addSource, getSources, SourcesHK } from "../../utils/sources";
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

  const addSourceUrl = async () => {
    addSource(url);
    dispatch({
      type: ActionType.ADD_SOURCE,
      payload: url.toLowerCase().trim(),
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
        <Button onPress={addSourceUrl}>Add a new source</Button>
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
                onPress={() =>
                  dispatch({
                    type: ActionType.TOGGLE_SOURCE,
                    payload: item.url,
                  })
                }
              />
            </Card>
          </>
        )}
      />
    </>
  );
}
