import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { Button } from "react-native-paper";
import { Message, TabTestParamList } from "../types";
import { addMessageToRealm, getMessagesFromRealm } from "../utils/realm";

type Props = {
  navigation: StackNavigationProp<TabTestParamList>;
};

export default function TabTestScreen({ navigation }: Props) {
  return (
    <>
      {/* <Button onPress={() => addMessageToRealm(new Message())}>
        Send message
      </Button>
      <Button onPress={async () => console.log(await getMessagesFromRealm())}>
        Get messages
      </Button> */}
    </>
  );
}
