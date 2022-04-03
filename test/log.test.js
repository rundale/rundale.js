const fs = require("fs");
const fsPromise = require("fs/promises");
const { assert } = require("chai");
const { config, log } = require("../dist/rundale");

async function removeLog() {
  const logPath = await config.get("log.path");
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
}

async function readLog() {
  const logPath = await config.get("log.path");
  return fsPromise.readFile(logPath, { encoding: "utf-8" });
}

describe("hooks", () => {
  beforeEach(async () => {
    await removeLog();
  });

  describe("Log", () => {
    describe("#log()", () => {
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
  });
});
