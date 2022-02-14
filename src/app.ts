import express from "express";
import config from "config";
import connect from "./db/connect";
import routes from "./routes";
import log from "./logger";
import deserializeUser from "./middleware/deserializeUser";

const PORT = config.get<number>("PORT");
const HOST = config.get<string>("HOST");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.listen(PORT, HOST, async () => {
  log.info(`server listening at http://${HOST}:${PORT}`);

  await connect();
  routes(app);
});
