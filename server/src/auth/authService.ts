import Moralis from "moralis";
//@ts-ignore
import { authRequests } from "../store";
import { ParseServerRequest } from "../utils/ParseServerRequest";
const serverRequest = new ParseServerRequest();

interface ParseUser {
  objectId: string;
}

export interface RequestMessage {
  address: string;
  chain: string;
  networkType: string;
}

// const DOMAIN = "defi.finance";
// const STATEMENT = "Please sign this message to confirm your identity.";
// const URI = "https://defi.finance";
// const EXPIRATION_TIME = "2023-01-01T00:00:00.000Z";
// const TIMEOUT = 15;
const DOMAIN = "adapt.app";
const STATEMENT = "";
const URI = "http://adapt.app";
const EXPIRATION_TIME = "";
const TIMEOUT = 15;

// export async function requestMessage({
//   address,
//   chain,
//   networkType,
// }: {
//   address: string;
//   chain: string;
//   networkType: "evm";
// }) {
//   const result = await Moralis.Auth.requestMessage({
//     address,
//     chain,
//     networkType,
//     domain: DOMAIN,
//     statement: STATEMENT,
//     uri: URI,
//     expirationTime: EXPIRATION_TIME,
//     timeout: TIMEOUT,
//   });

//   const { message } = result.toJSON();

//   return message;
// }
export async function requestMessage({
  address,
  chain,
  networkType,
}: {
  address: string;
  chain?: string;
  networkType: "evm" | "solana";
}) {
  console.log("requestMessage", address, chain, networkType);
  if (networkType === "evm" && chain) {
    return requestMessageEvm({ address, chain, networkType });
  }
  if (networkType === "solana") {
    return requestMessageSol({ address, networkType });
  }
  throw new Error(`Invalid network: ${networkType}`);
}

async function requestMessageEvm({
  address,
  chain,
  networkType,
}: {
  address: string;
  chain: string;
  networkType: "evm";
}) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message, id, profileId } = result.toJSON();
  authRequests.set(message, { id, profileId });

  return message;
}

async function requestMessageSol({
  address,
  networkType,
}: {
  address: string;
  networkType: "solana";
}) {
  const result = await Moralis.Auth.requestMessage({
    address,
    networkType,
    solNetwork: "devnet",
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message, id, profileId } = result.toJSON();
  authRequests.set(message, { id, profileId });

  return message;
}

export interface VerifyMessage {
  network: string;
  signature: string;
  message: string;
}

export async function verifyMessage({
  network,
  signature,
  message,
}: VerifyMessage) {
  console.log("Start verifyMessage", network, signature, message);
  console.log("=================");
  const storedData = authRequests.get(message);

  if (!storedData) {
    throw new Error("Invalid message");
  }

  const { id: storedId, profileId: storedProfileId } = storedData;

  console.log("storedData", storedData);

  const authData = {
    id: storedProfileId,
    authId: storedId,
    message,
    signature,
    network,
  };
  console.log("=================");
  console.log("authData", authData);

  // Authenticate
  const user = await serverRequest.post<ParseUser>({
    endpoint: `/users`,
    params: {
      authData: {
        moralisEth: authData,
      },
    },
    useMasterKey: true,
  });
  console.log("Server user|||", user);
  //@ts-ignore
  const acl = new Parse.ACL();
  acl.setReadAccess(user.objectId, true);
  acl.setWriteAccess(user.objectId, true);
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  console.log("Server user update|||", user);

  // Update user moralisProfile column
  let result = await serverRequest.put({
    endpoint: `/users/${user.objectId}`,
    params: {
      moralisProfileId: storedProfileId,
      //@ts-ignore
      ethAddress: user.authData.moralis.address.toLowerCase(),
      ACL: acl,
      // authData: { moralis: authData },
    },
    useMasterKey: true,
  });

  console.log("------------------------");
  console.log("result", result);
  // Get authenticated user
  const updatedUser = await serverRequest.get({
    endpoint: `/users/${user.objectId}`,
    useMasterKey: true,
  });
  console.log("======================");
  console.log("user", user);
  // return updatedUser;
  return user;
}
