/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

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
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  Faq: undefined;
};

export type TabTwoParamList = {
  Messages: undefined;
  Comments: CommentsRouteDeclaredProp;
};

export type TabPostParamList = {
  Post: undefined;
};

export type TabKeysParamList = {
  Keys: undefined;
};

export type Message = {
  ID: string;
  displayedName: string;
  content: string;
  signature: string;
  Correct: boolean;
  Color: string;
  MessageID: string;
  CreatedAt: string;
  DisplayedDate: string;
  Pod: string;
  authorBase64: string;
  authorPubKey: string;
  authorURLSafe: string;
  signatureBase64: string;
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
