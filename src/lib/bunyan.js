const bunyan = require("bunyan");
const path = require("path");
const rfs = require("rotating-file-stream");

function createLogger(serviceName) {
  const logDirectory = path.join(__dirname, "../logs");
  const logFile = `${serviceName}.log`;

  // Create a rotating file stream for log files
  const stream = rfs.createStream(logFile, {
    interval: "1d", // Rotate daily
    path: logDirectory,
    compress: "gzip", // Compress rotated files using gzip
  });

  return bunyan.createLogger({
    name: serviceName,
    level: "info",
    streams: [
      {
        level: "info",
        stream,
      },
      {
        level: "warn",
        stream: process.stderr,
      },
    ],
  });
}

module.exports = createLogger;
