const fs = require("fs");
const { assert } = require("chai");
const { createConfig, removeConfig } = require("./helper");
const { config } = require("../dist/rundale");

describe("Config", () => {
  beforeEach(async () => {
    await removeConfig();
  });

  describe("log.path", () => {
    it("Should get fallback log path", async () => {
      const logPath = await config.get("log.path");
      assert.strictEqual(logPath, "./rundale.log");
    });

    it("Should get configured log path", async () => {
      const configData = { log: { path: "./app.log" } };
      createConfig(configData);
      const logPath = await config.get("log.path");
      assert.strictEqual(logPath, "./app.log");
    });
  });

  describe("log.mazSize", () => {
    it("Should get fallback log maxSize", async () => {
      const maxSize = await config.get("log.maxSize");
      assert.strictEqual(maxSize, "10MB");
    });

    it("Should get configured log maxSize", async () => {
      const configData = { log: { maxSize: "20GB" } };
      createConfig(configData);
      const maxSize = await config.get("log.maxSize");
      assert.strictEqual(maxSize, "20GB");
    });
  });
});
