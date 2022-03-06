const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

const logPath = path.join(__dirname, "../app.log");

async function log(type, message) {
  try {
    if (!fs.existsSync(logPath)) await fsPromise.writeFile(logPath, "");
    const content =
      message instanceof Error
        ? message.stack
        : typeof message === "object"
        ? JSON.stringify(message, null, 2)
        : message;
    const data = {
      type,
      timestamp: new Date().toUTCString(),
      message: content,
    };
    const dataString = `${JSON.stringify(data, null, 2)},\n`;
    await fsPromise.appendFile(logPath, dataString);
  } catch (error) {
    console.error(error);
  }
}

const Log = {
  info(message) {
    return log("info", message);
  },
};

module.exports = Log;
