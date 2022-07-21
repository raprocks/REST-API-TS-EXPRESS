import express from "express";
import config from "config";
import connect from "./db/connect";
import routes from "./routes";
import logger from "./logger";
import deserializeUser from "./middleware/deserializeUser";
import path from "path";

const log = logger.child({ filename: path.relative("./", __filename) })
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
