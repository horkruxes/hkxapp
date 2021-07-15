import axios from "axios";
import { Message, MessageOptions } from "../types";
import { cleanMessages } from "./signature";

// Loads message from https://source/api/xxx/arg
export const loadMessages = async ({
  sources,
  type,
  arg,
}: MessageOptions): Promise<Message[]> => {
  let responses: Message[] = [];
  await Promise.all(
    sources.map(async (source) => {
      const url = `https://${source}/api/${type}/${arg ?? ""}`;
      console.log("getting from", url);
      const response = await axios.get<Message[]>(url, {
        headers: { "Content-Type": "application/json" },
      });
      responses = responses.concat(response.data);
    })
  );
  console.log("ifnished", responses);

  const newMessages = cleanMessages(responses);
  return newMessages;
};

export const loadSingleMessage = async ({
  sources,
  id,
}: {
  sources: string[];
  id: string;
}): Promise<Message> => {
  let responses: Message[] = [];
  await Promise.all(
    sources.map(async (source) => {
      const url = `https://${source}/api/message/${id}`;
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
