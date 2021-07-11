/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Message = {
  ID: string
  displayedName: string
  content: string
  signature: string
  Correct: boolean
  Color: string
  MessageID: string
  CreatedAt: string
  DisplayedDate: string
  Pod: string
  authorBase64: string
  authorPubKey: string
  authorURLSafe: string
  signatureBase64: string
}