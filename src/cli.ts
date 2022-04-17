#!/usr/bin/env node

import * as fs from "fs/promises";
import { CLI } from "cliffy";
import chalk = require("chalk");
import config from "./rundale.config";

const cli = new CLI()
  .setDelimiter("> ")
  .addCommand("init", {
    description: "Initialize Rundale by creating an rundale.config.json file.",
    async action() {
      const json = JSON.stringify(config, null, 2);
      await fs.writeFile("./rundale.config.json", json);
      const configName = chalk.bgCyan("rundale.config.json");
      const msg = `Successfully initialized. You can find config file from ${configName}`;
      console.log(chalk.cyan(msg));
      cli.hide();
    },
  })
  .show();
