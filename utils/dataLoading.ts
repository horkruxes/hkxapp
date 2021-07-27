import axios from "axios";
import { ListType, Message, MessageOptions } from "../types";
import { cleanMessages } from "./signature";
import { SourcesHK } from "./sources";

// Loads message from https://source/api/xxx/arg
export const loadMessages = async ({
  sources,
  type,
  arg,
}: MessageOptions): Promise<Message[]> => {
  let responses: Message[] = [];
  if (arg) {
    if (type === ListType.Comments) {
      const msg = await loadSingleMessage({
        sources,
        id: arg,
      });
      responses.push(msg);
    } else if (type === ListType.User) {
      arg = base64ToSafeURL(arg);
    }
  }
  await Promise.all(
    sources
      .filter((source) => source.enabled)
      .map(async (source) => {
        const url = `https://${source.url}/api/${type}/${arg ?? ""}`;
        console.log("getting from", url);
        const response = await axios.get<Message[]>(url, {
          headers: { "Content-Type": "application/json" },
        });
        responses = responses.concat(response.data);
      })
  );

  const newMessages = cleanMessages(responses);
  return newMessages;
};

export const loadSingleMessage = async ({
  sources,
  id,
}: {
  sources: SourcesHK[];
  id: string;
}): Promise<Message> => {
  let responses: Message[] = [];
  await Promise.all(
    sources.map(async (source) => {
      const url = `https://${source.url}/api/message/${id}`;
      console.log("getting SINGLE MESSAGE from", url);

      try {
        const response = await axios.get<Message>(url, {
          headers: { "Content-Type": "application/json" },
        });

        responses = responses.concat(response.data);
      } catch {}
    })
  );
  console.log("finished to fetch", responses);

  const newMessages = cleanMessages(responses);
  return newMessages[0];
};

const base64ToSafeURL = (b64: string): string => {
  return b64.replace(/\+/g, ".").replace(/\//g, "-").replace(/\+/g, "_");
};
