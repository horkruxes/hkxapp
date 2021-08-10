/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { AuthorMessagesRouteDeclaredProp } from "./screens/lists/author";
import { CommentsRouteDeclaredProp } from "./screens/lists/comments";
import { SourcesHK } from "./utils/sources";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Options: undefined;
  HK: undefined;
  Post: undefined;
  Test: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  Faq: undefined;
  Keys: undefined;
  Sources: undefined;
};

export type TabTwoParamList = {
  Messages: undefined;
  Comments: CommentsRouteDeclaredProp;
  Author: AuthorMessagesRouteDeclaredProp;
};

export type TabPostParamList = {
  Post: undefined;
};

export type TabTestParamList = {
  Test: undefined;
};

export class Message {
  public static schema: Realm.ObjectSchema = {
    name: "Message",
    primaryKey: "id",
    properties: {
      ID: "string",
      displayedName: "string",
      Content: "string",
      Correct: "booleanstring",
      Color: "string",
      MessageID: "string",
      CreatedAt: "string",
      DisplayedDate: "string",
      Pod: "string",
      AuthorBase64: "string",
      authorURLSafe: "string",
      SignatureBase64: "string",
    },
  };

  // Got from API: sensible
  public ID: string = "";
  public displayedName: string = "";
  public Content: string = "";
  public MessageID: string = "";
  public CreatedAt: string = "";
  public AuthorBase64: string = "";
  public SignatureBase64: string = "";
  public Pod: string = "";

  // Local
  public authorURLSafe: string = "";
  public Color: string = "";
  public Correct: boolean = false;
  public DisplayedDate: string = "";
  public saved: boolean = false;

  public constructor(init?: Partial<Message>) {
    Object.assign(this, init);
  }
}

export enum ListType {
  All = "message",
  User = "user",
  Comments = "comments",
}

export type MessageOptions = {
  sources: SourcesHK[];
  type: ListType | string;
  arg?: string;
};
