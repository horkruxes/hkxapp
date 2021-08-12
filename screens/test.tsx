import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useEffect } from "react";

import { Button } from "react-native-paper";
import { Message, TabTestParamList } from "../types";
import { addMessageToRealm, getMessagesFromRealm } from "../utils/realm";
import {
  storeMessageToSQLite,
  getMessagesFromSQLite,
  initSQLite,
  dropTableSQLite,
  getAllMessagesFromSQLite,
} from "../utils/sqlite";

type Props = {
  navigation: StackNavigationProp<TabTestParamList>;
};

export default function TabTestScreen({ navigation }: Props) {
  useEffect(() => {
    initSQLite();
  }, []);

  return (
    <>
      <Button
        onPress={() =>
          storeMessageToSQLite(
            new Message({
              Content: "hello me",
              ID: (Math.random() + 1).toString(36).substring(7),
            })
          )
        }
      >
        Add random message
      </Button>
      <Button
        onPress={async () =>
          console.log("got", await getAllMessagesFromSQLite())
        }
      >
        Get messages
      </Button>
      <Button onPress={() => dropTableSQLite()}>Drop tables</Button>
    </>
  );
}
