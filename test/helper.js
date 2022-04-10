const fs = require("fs");
const { config } = require("../dist/rundale");

async function readLog() {
  const logPath = await config.get("log.path");
  return fs.readFileSync(logPath, { encoding: "utf-8" });
}

async function removeLog() {
  const logPath = await config.get("log.path");
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
}

function createConfig(config) {
  const configData = JSON.stringify(config);
  fs.writeFileSync("./rundale.config.json", configData);
}

async function removeConfig() {
  const logPath = "./rundale.config.json";
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
}

module.exports = { readLog, removeLog, createConfig, removeConfig };
