import elliptic, { eddsa as EdDSA } from "elliptic";
import { Buffer } from "buffer";
import { encode, decode } from "base-64";
import * as ed from "noble-ed25519";
import { ECDSA } from "@oliverne/easy-ecdsa";
import b64 from "react-native-base64";
import edd, { sign, verify } from "@stablelib/ed25519";
import { Message } from "../types";

export function testNoble() {
  // const privateKey = ed.utils.randomPrivateKey(); // crash
  // console.log("sec key", privateKey);
}
const bytesToBase64 = (bytes: Buffer): string => {
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
  // Create and initialize EdDSA context
  // (better do it once and reuse it)
  // // CHECK WITH NO PRIVATE KEY
  // const msgToVerif = Buffer.from(
  //   "This is the second post, send from https://horkruxes.amethysts.studio and stored in https://hk.quimerch.com. All posts must be at least 140 characters long (to make sure there is someone behind that is trying to write a proper reflexion, not just spamming unuseful things)",
  //   "ascii"
  // );
  // const pub = base64ToBytes("JL6zyYtrk43MZ+uV7J+y8HFS9MvkI2eZT1RbRnV4Qog=");
  // const globalMessageToVerify = Buffer.concat([msgToVerif, pub]);
  // // console.log("Message TOTAL", globalMessageToVerify);
  // // Import public key
  // const key2 = ec.keyFromPublic(pub);
  // console.log("ok");
  // // Verify signature
  // const sigBuffer = base64ToBytes(
  //   "yn8eSEyVUgBMC5d8rFES2d8XAlfDVgYNEu7hmCc/RNjNaut2jBPMEg0IBIasQoYH1r3G2t7m9ifdE+5vDY+OAQ=="
  // );
  // console.log("SIG BYTES", sigBuffer);
  // console.log();
  // console.log("\n\n\nVERIF", key2.verify(globalMessageToVerify, sigBuffer));
}

export const test2 = () => {
  const ec = new EdDSA("ed25519");

  // Create key pair from secret
  const key = ec.keyFromSecret(
    base64ToBytes(
      "KxXJ7x3hbXrju+UvbgK8pWgzHHm8L7+UR7ae7nGBRCAkvrPJi2uTjcxn65Xsn7LwcVL0y+QjZ5lPVFtGdXhCiA=="
    )
  ); // hex string, array or Buffer

  console.log("pub key", bytesToBase64(key.getPublic()));

  const msg =
    "This is the second post, send from https://horkruxes.amethysts.studio and stored in https://hk.quimerch.com. All posts must be at least 140 characters long (to make sure there is someone behind that is trying to write a proper reflexion, not just spamming unuseful things)" +
    "JL6zyYtrk43MZ+uV7J+y8HFS9MvkI2eZT1RbRnV4Qog=";
  // //
  const signature = key.sign(msg).toBytes();
  console.log("sig", bytesToBase64(signature));
};

/**
 * Convert a string to a unicode byte array
 * @param {string} str
 * @return {Array} of bytes
 */
export function strToUtf8Bytes(str: string) {
  const utf8 = [];
  for (let ii = 0; ii < str.length; ii++) {
    let charCode = str.charCodeAt(ii);
    if (charCode < 0x80) utf8.push(charCode);
    else if (charCode < 0x800) {
      utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      utf8.push(
        0xe0 | (charCode >> 12),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    } else {
      ii++;
      // Surrogate pair:
      // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
      // splitting the 20 bits of 0x0-0xFFFFF into two halves
      charCode =
        0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
      utf8.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    }
  }
  return utf8;
}
