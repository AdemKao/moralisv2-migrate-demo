import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import { parseServer } from "./parseServer";

import ngrok from "ngrok";
// @ts-ignore

import ParseServer from "parse-server";
import { streamsSync } from "@moralisweb3/parse-server";
import { parseDashboard } from "./parseDashboard";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// app.use("/", (req, res) => {
//   res.send("hello");
// });
app.use("/dashboard", parseDashboard);

if (config.USE_STREAMS) {
  app.use(
    streamsSync(parseServer, {
      apiKey: config.MORALIS_API_KEY,
      webhookUrl: config.STREAMS_WEBHOOK_URL,
    })
  );
}

app.use(`/server`, parseServer.app);

const httpServer = http.createServer(app);

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${config.APP_NAME} is running on port ${config.PORT}`);
});

httpServer.addListener(`${config.PORT}`, async () => {
  if (config.USE_STREAMS) {
    const url = await ngrok.connect(config.PORT);
    // eslint-disable-next-line no-console
    console.log(
      `Moralis Server is running on port ${config.PORT} and stream webhook url ${url}${config.STREAMS_WEBHOOK_URL}`
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config.PORT}.`);
  }
});
ParseServer.createLiveQueryServer(httpServer);
