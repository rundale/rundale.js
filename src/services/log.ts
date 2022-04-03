import * as fs from "fs";
import * as fsPromise from "fs/promises";
import Config from "../Config";

type Message = string | Object | Error;

type Type =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

type Log = Record<Type, (message: Message) => void>;

async function logger(type: Type, message: Message) {
  const logPath = await Config.get("log.path");
  if (!logPath) {
    throw new Error("Please configure log.path in Rundale configuration");
  }
  const existsLog = fs.existsSync(logPath);
  if (!existsLog) await fsPromise.writeFile(logPath, "");
  const content =
    message instanceof Error
      ? message.stack
      : message instanceof Object
      ? JSON.stringify(message, null, 2)
      : message;
  const data = {
    type,
    timestamp: new Date().toUTCString(),
    message: content,
  };
  const dataString = JSON.stringify(data, null, 2);
  const logData = existsLog ? `,\n${dataString}` : dataString;
  await fsPromise.appendFile(logPath, logData);
}

const log: Log = {
  emergency(message: Message) {
    return logger("emergency", message);
  },
  alert(message: Message) {
    return logger("alert", message);
  },
  critical(message: Message) {
    return logger("critical", message);
  },
  error(message: Message) {
    return logger("error", message);
  },
  warning(message: Message) {
    return logger("warning", message);
  },
  notice(message: Message) {
    return logger("notice", message);
  },
  info(message: Message) {
    return logger("info", message);
  },
  debug(message: Message) {
    return logger("debug", message);
  },
};

export default log;
