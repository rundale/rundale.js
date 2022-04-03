import { get } from "lodash";
import configService from "../services/config.service";
import defaultConfig from "../rundale.config";

interface Config {
  get(key: string): Promise<string>;
}

const config: Config = {
  async get(key: string) {
    const defaultVal = get(defaultConfig, key);
    const localConf = await configService.loadLocal();
    return get(localConf, key, defaultVal);
  },
};

export default config;
