import * as React from "react";
import { useEffect, useState } from "react";

import { Message, MessageOptions, TabTwoParamList } from "../../types";
import MessageList from "../../components/MessageList";
import { ListType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageComp } from "../../components/message/Message";
import { loadSingleMessage } from "../../utils/dataLoading";
import { RouteProp } from "@react-navigation/native";

type AuthorMessagesNavigationProp = StackNavigationProp<TabTwoParamList>;

export type AuthorMessagesRouteDeclaredProp = {
  userIdBase64: string;
};
type AuthorMessagesRouteProp = RouteProp<TabTwoParamList, "Author">;

export type AuthorMessagesProps = {
  route: AuthorMessagesRouteProp;
  navigation: AuthorMessagesNavigationProp;
  userIdBase64: string;
};

export default function AuthorMessages({
  route,
  navigation,
}: AuthorMessagesProps) {
  let [message, setMessage] = useState<Message>();
  const baseSources = [
    "horkruxes.amethysts.studio",
    "hk.quimerch.com",
    "fr.hk.quimerch.com",
    "test.hk.quimerch.com",
  ];

  return (
    <>
      <MessageList
        navigation={navigation}
        options={{
          sources: baseSources,
          type: ListType.User,
          arg: route.params.userIdBase64,
        }}
      />
    </>
  );
}
