import Realm from "realm";
import { Message } from "../types";
const { UUID } = Realm.BSON;

export const addMessageToRealm = async (msg: Message): Promise<boolean> => {
  const realm = await Realm.open({
    schema: [Message.schema],
  });
  realm.write(() => {
    realm.create("Profile", {
      ...msg,
    });
  });
  return true;
};

export const getMessagesFromRealm = async (): Promise<(Message & Object)[]> => {
  const realm = await Realm.open({
    schema: [Message.schema],
  });
  const m = realm.objects<Message>("Message");
  return m.map((o) => new Message(o));
};
