import { connect as dbconnect, ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger";

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
