import { connect as dbconnect } from "mongoose";
import config from "config";
import logger from "../logger";
import path from "path";

const log = logger.child({ filename: path.relative("./", __filename) })

const connect = async () => {
  const dbURI = config.get<string>("dbURI");
  try {
    await dbconnect(dbURI);
    log.info("Database Connected!");
  } catch (e) {
    log.error("Database Connection Error!", e);
    process.exit(1);
  }
};

export default connect;
