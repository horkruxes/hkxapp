import * as React from "react";
import { useEffect, useState } from "react";

import { Message, MessageOptions, TabTwoParamList } from "../../types";
import MessageList from "../../components/MessageList";
import { ListType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageComp } from "../../components/Message";
import { loadSingleMessage } from "../../utils/dataLoading";
import { RouteProp } from "@react-navigation/native";

type CommentsNavigationProp = StackNavigationProp<TabTwoParamList>;

export type CommentsRouteDeclaredProp = {
  messageId: string;
};
type CommentsRouteProp = RouteProp<TabTwoParamList, "Comments">;

export type CommentsProps = {
  route: CommentsRouteProp;
  navigation: CommentsNavigationProp;
  messageId: string;
};

export default function Comments({ route, navigation }: CommentsProps) {
  let [message, setMessage] = useState<Message>();
  const baseSources = [
    "horkruxes.amethysts.studio",
    "hk.quimerch.com",
    "fr.hk.quimerch.com",
  ];

  const getSoloMessage = async () => {
    const msg = await loadSingleMessage({
      sources: baseSources,
      id: route.params.messageId,
    });
    console.log("set msg", msg);
    setMessage(msg);
  };

  useEffect(() => {
    getSoloMessage();
  }, []);

  return (
    <>
      {message && <MessageComp navigation={navigation} message={message} />}

      <MessageList
        navigation={navigation}
        options={{
          sources: baseSources,
          type: ListType.Comments,
          arg: route.params.messageId,
        }}
      />
    </>
  );
}
