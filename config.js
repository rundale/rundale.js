const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");
const { get } = require("lodash");

async function getConfig() {
  try {
    if (this.config) return this.config;
    const configPath = "./.rundale.json";
    const filepath = fs.existsSync(configPath)
      ? configPath
      : path.join(__dirname, configPath);
    const data = await fsPromise.readFile(filepath, { encoding: "utf-8" });
    this.config = JSON.parse(data, null, 2);
    return this.config;
  } catch (error) {
    return null;
  }
}

async function config(path) {
  const config = await getConfig();
  return get(config, path);
}

module.exports = config;
