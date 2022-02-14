import dayjs from "dayjs";
import logger from "pino";
import path from "path";

const log = logger({
  // prettyPrint: true,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      // messageFormat: " {msg}",
      translateTime: "yyyy-mm-dd HH:MM:ss.l",
      messageFormat: "{filename}: {msg}",
      ignore: "pid,hostname,filename",
    },
  },
  base: {
    pid: false,
  },
  // timestamp: () => `,"time":${dayjs().format()}`,
}).child({ filename: path.relative("./", __filename) });

export default log;
