import { ConfigData } from "./services/config.service";

const config: ConfigData = {
  log: {
    path: "./rundale.log",
    maxSize: "10MB",
  },
};

export default config;
