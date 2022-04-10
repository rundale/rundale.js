const { assert } = require("chai");
const { removeLog, readLog, createConfig, removeConfig } = require("./helper");
const { log } = require("../dist/rundale");

describe("Log", () => {
  beforeEach(async () => {
    await removeLog();
    await removeConfig();
  });

  describe("Should log with all supported channels", () => {
    it("Should log emergency", async () => {
      await log.emergency("emergency message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "emergency");
      assert.strictEqual(logObj.message, "emergency message");
    });

    it("Should log alert", async () => {
      await log.alert("alert message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "alert");
      assert.strictEqual(logObj.message, "alert message");
    });

    it("Should log critical", async () => {
      await log.critical("critical message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "critical");
      assert.strictEqual(logObj.message, "critical message");
    });

    it("Should log error", async () => {
      await log.error("error message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "error");
      assert.strictEqual(logObj.message, "error message");
    });

    it("Should log warning", async () => {
      await log.warning("warning message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "warning");
      assert.strictEqual(logObj.message, "warning message");
    });

    it("Should log notice", async () => {
      await log.notice("notice message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "notice");
      assert.strictEqual(logObj.message, "notice message");
    });

    it("Should log info", async () => {
      await log.info("info message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "info");
      assert.strictEqual(logObj.message, "info message");
    });

    it("Should log debug", async () => {
      await log.debug("debug message");
      const logStr = await readLog();
      assert.isNotEmpty(logStr);
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.type, "debug");
      assert.strictEqual(logObj.message, "debug message");
    });
  });

  describe("Should log with all supported message types", () => {
    it("Should log with message as string", async () => {
      await log.info("string message");
      const logStr = await readLog();
      const logObj = JSON.parse(logStr);
      assert.strictEqual(logObj.message, "string message");
    });
    it("Should log with message as object", async () => {
      const logData = { name: "John", age: 42 };
      await log.info(logData);
      const logStr = await readLog();
      const logObj = JSON.parse(logStr);
      assert.deepEqual(JSON.parse(logObj.message), logData);
    });
    it("Should log with message as error", async () => {
      await log.info(new Error("Unprocessable"));
      const logStr = await readLog();
      const logObj = JSON.parse(logStr);
      assert.include(logObj.message, "Unprocessable");
    });
  });

  it("Should append log, not overwrite", async () => {
    await log.info("hello");
    await log.debug("world");
    const logStr = await readLog();
    const logObjs = JSON.parse(`[${logStr}]`);
    assert.strictEqual(logObjs.length, 2);
  });

  it("Should rotate log when maxSize reach", async () => {
    await log.info("hello");
    createConfig({ log: { maxSize: "50B" } });
    await log.info("world");
    const logStr = await readLog();
    const logObjs = JSON.parse(`[${logStr}]`);
    assert.strictEqual(logObjs.length, 1);
  });
});
