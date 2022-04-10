import * as fs from "fs";
import * as bytes from "bytes";
import config from "../providers/config.provider";

export type Message = string | Object | Error;

export type Type =
  | "emergency"
  | "alert"
  | "critical"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug";

interface Log {
  existsLogfile(logPath: string): boolean;
  existsLog(logPath: string): Promise<boolean>;
  exceedMaxSize(logPath: string, maxSize: string): boolean;
  createLogfile(logPath: string, logData: string): void;
  makeLog(type: Type, message: Message, existsLog?: boolean): Promise<string>;
  appendToLogfile(logPath: string, logData: string): void;
  overwriteLogfile(logPath: string, logData: string): void;
  createLog(type: Type, message: Message): Promise<void>;
}

const log: Log = {
  existsLogfile(logPath) {
    return fs.existsSync(logPath);
  },

  async existsLog(logPath) {
    const logStr = await fs.readFileSync(logPath, { encoding: "utf-8" });
    return Boolean(logStr);
  },

  exceedMaxSize(logPath, maxSize) {
    const stats = fs.statSync(logPath);
    return stats.size >= bytes(maxSize);
  },

  createLogfile(logPath, logData) {
    fs.writeFileSync(logPath, logData);
  },

  async makeLog(type, message, existsLog = false) {
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
    return existsLog ? `,\n${dataString}` : dataString;
  },

  appendToLogfile(logPath, logData) {
    fs.appendFileSync(logPath, logData);
  },

  overwriteLogfile(logPath, logData) {
    fs.writeFileSync(logPath, logData);
  },

  async createLog(type, message) {
    const logPath = await config.get("log.path");
    const maxSize = await config.get("log.maxSize");
    if (this.existsLogfile(logPath)) {
      if (this.exceedMaxSize(logPath, maxSize)) {
        const logData = await this.makeLog(type, message);
        this.overwriteLogfile(logPath, logData);
      } else {
        const existsLog = await this.existsLog(logPath);
        const logData = await this.makeLog(type, message, existsLog);
        this.appendToLogfile(logPath, logData);
      }
    } else {
      const logData = await this.makeLog(type, message);
      this.createLogfile(logPath, logData);
    }
  },
};

export default log;
