import { Message } from "../types";

export const verifySignature = (message: Message): boolean => {
    return true
}

export const getColorFromAuthor = (author: string): string => {
    let a = 0;
    for (var i = 0; i < author.length; i++) {
        a += author.charCodeAt(i)
    }
    a = trueMod(a, 360)
    return `hsl(${a}, 50%, 50%)`
}

export const cleanMessages = (messages: Message[]): Message[] => {
    return messages.map<Message>(msg => {
        msg.Correct = verifySignature(msg)
        msg.Color = getColorFromAuthor(msg.authorBase64)

        return msg
    })
}

function trueMod(n: number, m: number): number {
    return ((n % m) + m) % m;
}