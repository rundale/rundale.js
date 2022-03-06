const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

const Log = {
  async info(message) {
    try {
      const logpath = path.join(__dirname, "app.log");
      if (!fs.existsSync(logpath)) await fsPromise.writeFile(logpath, "");
      const logdata =
        message instanceof Error
          ? message.stack
          : typeof message === "object"
          ? JSON.stringify(message, null, 2)
          : message;
      await fsPromise.appendFile(logpath, `${logdata}\n\n`);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Log;
