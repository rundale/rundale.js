const fs = require("fs");
const fsPromise = require("fs/promises");
const { assert } = require("chai");
const config = require("../config");
const Rundale = require("../rundale");

async function removeLog() {
  const logPath = await config("log.path");
  if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
}

async function readLog() {
  const logPath = await config("log.path");
  return fsPromise.readFile(logPath, { encoding: "utf-8" });
}

describe("hooks", () => {
  before(async () => {
    await removeLog();
  });

  describe("Log", () => {
    describe("#log()", () => {
      it("Should create .log file with log", async () => {
        await Rundale.Log.info("Hello world");
        const log = await readLog();
        assert.isNotEmpty(log);
      });
    });
  });
});
