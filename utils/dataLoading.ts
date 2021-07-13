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
      const response = await axios.get<Message[]>(url, {
        headers: { "Content-Type": "application/json" },
      });
      responses = responses.concat(response.data);
    })
  );
  console.log("ifnished");

  const newMessages = cleanMessages(responses);
  return newMessages;
};
