/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { AuthorMessagesRouteDeclaredProp } from "./screens/lists/author";
import { CommentsRouteDeclaredProp } from "./screens/lists/comments";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Options: undefined;
  HK: undefined;
  Post: undefined;
  Keys: undefined;
  Sources: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  Faq: undefined;
};

export type TabTwoParamList = {
  Messages: undefined;
  Comments: CommentsRouteDeclaredProp;
  Author: AuthorMessagesRouteDeclaredProp;
};

export type TabPostParamList = {
  Post: undefined;
};

export type TabKeysParamList = {
  Keys: undefined;
};

export type TabSourcesParamList = {
  Sources: undefined;
};

export type Message = {
  ID: string;
  displayedName: string;
  Content: string;
  Correct: boolean;
  Color: string;
  MessageID: string;
  CreatedAt: string;
  DisplayedDate: string;
  Pod: string;
  AuthorBase64: string;
  authorURLSafe: string;
  SignatureBase64: string;
};

export enum ListType {
  All = "message",
  User = "user",
  Comments = "comments",
}

export type MessageOptions = {
  sources: string[];
  type: ListType | string;
  arg?: string;
};
