const path = require("path");
const fs = require("fs");
const { assert } = require("chai");
const Rundale = require("../rundale");

const logPath = path.join(__dirname, "../app.log");

describe("hooks", () => {
  before(() => {
    if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
  });

  describe("Log", () => {
    describe("#log()", () => {
      it("Should create .log file with log", async () => {
        await Rundale.Log.info("Hello world");
        fs.readFile(logPath, "utf-8", (err, dataString) => {
          if (err) throw err;
          assert.isNotEmpty(dataString);
        });
      });
    });
  });
});
