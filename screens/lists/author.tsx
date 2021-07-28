import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";

import { Message, MessageOptions, TabTwoParamList } from "../../types";
import MessageList from "../../components/MessageList";
import { ListType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageComp } from "../../components/message/Message";
import { loadSingleMessage } from "../../utils/dataLoading";
import { RouteProp } from "@react-navigation/native";
import { useStateContext } from "../../state/state";

type AuthorMessagesNavigationProp = StackNavigationProp<TabTwoParamList>;

export type AuthorMessagesRouteDeclaredProp = {
  userIdBase64: string;
};
type AuthorMessagesRouteProp = RouteProp<TabTwoParamList, "Author">;

export type AuthorMessagesProps = {
  route: AuthorMessagesRouteProp;
  navigation: AuthorMessagesNavigationProp;
};

export default function AuthorMessages({
  route,
  navigation,
}: AuthorMessagesProps) {
  const { state, dispatch } = useStateContext();
  const { sources } = state;
  const userId = route.params.userIdBase64;
  return (
    <>
      <Text>
        All messages from {[userId.substr(0, 10), userId.substr(10)].join("\n")}
      </Text>
      <MessageList
        navigation={navigation}
        options={{
          sources,
          type: ListType.User,
          arg: route.params.userIdBase64,
        }}
      />
    </>
  );
}
