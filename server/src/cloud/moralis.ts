declare const Parse: any;

import { requestMessage } from "../auth/authService";
// import "./generated/evmApi";
// import "./generated/solApi";
Parse.Cloud.define("requestMessage", async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define("getPluginSpecs", () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define("getServerTime", () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});
