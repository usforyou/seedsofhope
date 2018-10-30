const winston = require('winston');
const expressWinston = require('express-winston');
const morgan = require('morgan');
const rootPath = require('app-root-path');

var logOptions = {
    file: {
      level: 'warn',
      filename: `${rootPath}/logs/app.log`,
      handleExceptions: false,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      prettyPrint: true
    },
    console: {
      level: 'warn',
      handleExceptions: false,
      json: true,
      colorize: true,
    },
  };
var logger = expressWinston.logger({
    transports: [
          new winston.transports.Console(logOptions.console),
          new winston.transports.File(logOptions.file)
    ],
    
});

module.exports = {
    log: logger.bind()
};