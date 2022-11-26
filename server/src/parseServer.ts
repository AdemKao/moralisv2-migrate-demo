// @ts-ignore
import ParseServer from "parse-server";
import config from "./config";
// @ts-ignore
import MoralisEthAdapter from "./auth/MoralisEthAdapter";
import MoralisAuthAdapter from "./auth/MoralisAuthAdapter";

export const parseServer = new ParseServer({
  databaseURI: config.DATABASE_URI,
  cloud: config.CLOUD_PATH,
  serverURL: config.SERVER_URL,
  appId: config.APPLICATION_ID,
  masterKey: config.MASTER_KEY,
  allowInsecureHTTP: true,
  auth: {
    moralisEth: {
      module: MoralisEthAdapter,
    },
    moralis: {
      module: MoralisAuthAdapter,
    },
  },
});
