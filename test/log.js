const fs = require("fs");
const fsPromise = require("fs/promises");
const { assert } = require("chai");
const { Log, Config } = require("../dist/Rundale");

async function removeLog() {
  const logPath = await Config.get("log.path");
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
}

async function readLog() {
  const logPath = await Config.get("log.path");
  return fsPromise.readFile(logPath, { encoding: "utf-8" });
}

describe("hooks", () => {
  before(async () => {
    await removeLog();
  });

  describe("Log", () => {
    describe("#log()", () => {
      it("Should create .log file with log", async () => {
        await Log.info("Hello world");
        const log = await readLog();
        assert.isNotEmpty(log);
      });
    });
  });
});
