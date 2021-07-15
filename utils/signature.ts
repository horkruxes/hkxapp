import { Message } from "../types";

export const verifySignature = (message: Message): boolean => {
  return true;
};

export const getColorFromAuthor = (author: string): string => {
  let h = 0;
  for (var i = 0; i < author.length; i++) {
    h += author.charCodeAt(i);
  }
  const l = trueMod(h, 3) * 10 + 40; // light = 40, 50 or 60
  h = trueMod(h, 360);
  return `hsl(${h}, 80%, ${l}%)`;
};

export const cleanMessages = (messages: Message[]): Message[] => {
  return messages.map<Message>((msg) => {
    msg.Correct = verifySignature(msg);
    msg.Color = getColorFromAuthor(msg.authorBase64);

    return msg;
  });
};

function trueMod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
