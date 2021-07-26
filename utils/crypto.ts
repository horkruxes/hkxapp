import { Buffer } from "buffer";
import edd, { sign, verify, generateKeyPair } from "@stablelib/ed25519";
import { Message } from "../types";
import * as SecureStore from "expo-secure-store";
import * as Random from "expo-random";

const bytesToBase64 = (bytes: Uint8Array): string => {
  return Buffer.from(bytes).toString("base64");
};

const base64ToBytes = (b64: string): Buffer => {
  return Buffer.from(b64, "base64");
};

export function signer(
  secBase64: string,
  pubBase64: string,
  msgUtf8: string
): string {
  const msgToSign = Buffer.from(msgUtf8);
  const pub = base64ToBytes(pubBase64);
  const globalMessageToVerify = Buffer.concat([msgToSign, pub]);

  const sec = base64ToBytes(secBase64);
  return Buffer.from(sign(sec, globalMessageToVerify)).toString("base64");
}

export function verifyOwnership(message: Message): boolean {
  const pub = base64ToBytes(message.AuthorBase64);
  const msg = Buffer.from(message.Content);
  const name = Buffer.from(message.displayedName);
  const globalMessageToVerify = Buffer.concat([msg, pub, name]);
  const sig = base64ToBytes(message.SignatureBase64);
  return verify(pub, globalMessageToVerify, sig);
}
export function testing() {
  const kp = generateKeyPair();
  console.log("key pair", kp);
}

export const genKeyPairAndStore = async (
  name: string,
  givenSec: string,
  givenPub: string
) => {
  let sec = givenSec;
  let pub = givenPub;

  if (givenPub == "" || givenSec == "") {
    console.log("generating...");

    const sec2 = Random.getRandomBytes(32);
    console.log("random bytes got.");

    const kp = edd.generateKeyPair();
    console.log("generated.");

    // const pub2 = edd.extractPublicKeyFromSecretKey(sec2);
    console.log("extracted");

    sec = bytesToBase64(kp.secretKey);
    pub = bytesToBase64(kp.publicKey);
  }

  const keyPair: KeyPairHK = {
    PrivateBase64: sec,
    PublicBase64: pub, // Used as id
    Name: name,
  };

  const keyPairs = await loadKeyPairsFromStorage();
  keyPairs.push(keyPair);
  console.log("adding key", keyPair.PublicBase64);

  await SecureStore.setItemAsync("keyPairs", JSON.stringify(keyPairs));
};

export const loadKeyPairsFromStorage = async (): Promise<KeyPairHK[]> => {
  let keyPairs: KeyPairHK[];
  const keyPairsString = await SecureStore.getItemAsync("keyPairs");
  if (keyPairsString) {
    keyPairs = JSON.parse(keyPairsString);
    return keyPairs;
  } else {
    return [];
  }
};

export type KeyPairHK = {
  PrivateBase64: string;
  PublicBase64: string; // Used as id
  Name: string;
};
