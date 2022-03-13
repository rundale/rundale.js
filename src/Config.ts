import * as path from "path";
import * as fs from "fs";
import * as fsPromise from "fs/promises";
import { get } from "lodash";
import defaultConfig from "./rundale.config";

type ConfigData = {
  log: {
    path: string;
  };
};

export default class Config {
  protected static cache: ConfigData | null = null;
  protected static localConfigPath = "./rundale.config.json";

  protected static async load(): Promise<ConfigData | null> {
    try {
      if (Config.cache) return Config.cache;
      const localConfigExists = fs.existsSync(Config.localConfigPath);
      if (localConfigExists) {
        const configContent = await fsPromise.readFile(Config.localConfigPath, {
          encoding: "utf-8",
        });
        Config.cache = JSON.parse(configContent);
      } else {
        Config.cache = defaultConfig;
      }
      return Config.cache;
    } catch {
      return null;
    }
  }

  public static async get(key: string): Promise<string | null> {
    const config = await Config.load();
    if (config) return get(config, key);
    return null;
  }
}
