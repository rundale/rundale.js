import * as fs from "fs/promises";

export type ConfigData = {
  log: {
    path: string;
    maxSize: string;
  };
};

interface Config {
  cache: ConfigData | null;
  localPath: string;
  loadLocal(): Promise<ConfigData | null>;
}

const config: Config = {
  cache: null,
  localPath: "./rundale.config.json",

  async loadLocal() {
    try {
      if (this.cache) return this.cache;
      const logStr = await fs.readFile(this.localPath, {
        encoding: "utf-8",
      });
      return JSON.parse(logStr);
    } catch {
      return null;
    }
  },
};

export default config;
