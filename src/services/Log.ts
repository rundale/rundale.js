import * as fs from "fs";
import * as fsPromise from "fs/promises";
import Config from "../Config";

type Type =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

type Message = string | Error;

export default class Log {
  protected static async logger(type: Type, message: Message) {
    const logPath = await Config.get("log.path");
    if (!logPath) {
      throw new Error("Please configure log.path in Rundale configuration");
    }
    if (!fs.existsSync(logPath)) await fsPromise.writeFile(logPath, "");
    const content =
      message instanceof Error
        ? message.stack
        : typeof message === "object"
        ? JSON.stringify(message, null, 2)
        : message;
    const data = {
      type,
      timestamp: new Date().toUTCString(),
      message: content,
    };
    const dataString = `${JSON.stringify(data, null, 2)},\n`;
    await fsPromise.appendFile(logPath, dataString);
  }

  public static info(message: Message) {
    return Log.logger("info", message);
  }
}
