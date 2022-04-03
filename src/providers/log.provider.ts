import logService, { Message, Type } from "../services/log.service";

type Log = Record<Type, (message: Message) => void>;

const log: Log = {
  emergency(message: Message) {
    return logService.createLog("emergency", message);
  },
  alert(message: Message) {
    return logService.createLog("alert", message);
  },
  critical(message: Message) {
    return logService.createLog("critical", message);
  },
  error(message: Message) {
    return logService.createLog("error", message);
  },
  warning(message: Message) {
    return logService.createLog("warning", message);
  },
  notice(message: Message) {
    return logService.createLog("notice", message);
  },
  info(message: Message) {
    return logService.createLog("info", message);
  },
  debug(message: Message) {
    return logService.createLog("debug", message);
  },
};

export default log;
