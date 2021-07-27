import * as React from "react";
import { useEffect, useState } from "react";

import { Message, MessageOptions, TabTwoParamList } from "../../types";
import MessageList from "../../components/MessageList";
import { ListType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageComp } from "../../components/message/Message";
import { loadSingleMessage } from "../../utils/dataLoading";
import { RouteProp } from "@react-navigation/native";
import { useStateContext } from "../../state/state";

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
  const { state, dispatch } = useStateContext();
  const { sources } = state;

  return (
    <>
      <MessageList
        navigation={navigation}
        options={{
          sources,
          type: ListType.Comments,
          arg: route.params.messageId,
        }}
      />
    </>
  );
}
