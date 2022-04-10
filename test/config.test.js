const fs = require("fs");
const { assert } = require("chai");
const { config } = require("../dist/rundale");

describe("Config", () => {
  it("Should get fallback log path", async () => {
    const logPath = await config.get("log.path");
    assert.strictEqual(logPath, "./rundale.log");
  });

  it("Should get configured log path", async () => {
    const configData = JSON.stringify({ log: { path: "./app.log" } });
    fs.writeFileSync("./rundale.config.json", configData);
    const logPath = await config.get("log.path");
    assert.strictEqual(logPath, "./app.log");
  });
});
