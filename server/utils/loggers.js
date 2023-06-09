/**
 * Configurations of logger.
 */
const winston = require("winston");
require("winston-daily-rotate-file");

const consoleConfig = new winston.transports.DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  json: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  //   format: winston.format.colorize(),
});

const successLogger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "user-service" },
  transports: [consoleConfig],
  prepend: true,
});

const errorLogger = winston.createLogger({
  level: "error",
  defaultMeta: { service: "user-service" },
  transports: [consoleConfig],
  prepend: true,
});

module.exports = {
  successlog: successLogger,
  errorlog: errorLogger,
};
