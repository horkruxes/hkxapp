import { Message } from "../types";

export const verifySignature = (message: Message): boolean => {
    return true
}

export const getColorFromAuthor = (author: string): string => {
    return 'red'
}

export const cleanMessages = (messages: Message[]): Message[] => {
    return messages.map<Message>(msg => {
        msg.Correct = verifySignature(msg)
        msg.Color = getColorFromAuthor(msg.authorBase64)
        return msg
    })
}