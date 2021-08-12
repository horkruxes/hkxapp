import { Platform } from "react-native";

import * as SQLite from "expo-sqlite";
import { Message, MessageOptions } from "../types";
import { loadMessages } from "./dataLoading";
import { ListType } from "../types";
import { SourceHK } from "./sources";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  return SQLite.openDatabase("sqlite3.db");
}

const db = openDatabase();

export const initSQLite = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists messages (ID text primary key not null, Content text);"
    );
  });
};

export const dropTableSQLite = () => {
  db.transaction(
    (tx) => {
      tx.executeSql("drop table messages;", [], (tx, results) => {
        console.log("deleted ?", results);
      });
    },
    (error) => console.log("error", error),
    () => console.log("done")
  );
};

// Asynchronously get messages from SQLite
export const getMessagesFromSQLite = ({
  sources,
  type,
  arg,
}: MessageOptions): Promise<Message[]> => {
  return new Promise((res, rej) => {
    let messagesGathered: Message[] = [];
    sources
      .filter((source) => source.enabled)
      .map((source) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              `select * from messages where pod = ?;`,
              [source.url],
              (_, { rows }) => {
                console.log("test", (rows as any)._array as Message[]);
                messagesGathered = messagesGathered.concat(
                  (rows as any)._array as Message[]
                );
              }
            );
          },
          (err) => console.log("err during transaction", err)
        );
      });
    res(messagesGathered);
  });
};

export const getAllMessagesFromSQLite = (): Promise<Message[]> => {
  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from messages;`, [], (_, { rows }) => {
        res((rows as any)._array as Message[]);
      });
    });
  });
};

export const getMessageById = (uuid: string): Promise<Message | null> => {
  return new Promise((res, rej) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from messages where id = ? limit 1;`,
          [uuid],
          (_, { rows }) => {
            console.log("test", (rows as any)._array as Message[]);
            if (rows.length > 0) {
              res(rows.item(0));
            } else {
              res(null);
            }
          }
        );
      },
      (err) => rej(err)
    );
  });
};

export const storeMessageToSQLite = async (msg: Message): Promise<void> => {
  // is text empty?
  if (msg.Content === null || msg.Content === "") {
    return new Promise(() => {});
  }

  return new Promise((res, rej) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into messages (id, content) values (?, ?)", [
          msg.ID,
          msg.Content,
        ]);
      },
      (err) => rej(err),
      () => res()
    );
  });
};

export const syncFromOnlineToSQLite = async (
  sources: SourceHK[]
): Promise<void> => {
  // Load all messages from all sources
  //TODO only load from a date
  const newMessages = await loadMessages({
    sources,
    type: ListType.All,
  });

  await Promise.allSettled(
    newMessages.map(async (message) => {
      // Check if the message is already on db
      if (!(await getMessageById(message.ID))) {
        await storeMessageToSQLite(message);
      }
    })
  );
};
