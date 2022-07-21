import logger from "pino";

const pino_logger = logger({
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
});

export default pino_logger;
