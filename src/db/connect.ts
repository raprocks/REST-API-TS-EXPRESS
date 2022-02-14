import { connect as dbconnect, ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger";

// type ConnectionOptionsExtend = {
//   useNewUrlParser: boolean;
//   useUnifiedTopology: boolean;
// };

// type Options = ConnectOptions &
//   ConnectionOptionsExtend & {
//     useNewUrlParser: true;
//     useUnifiedTopology: true;
//   };

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
