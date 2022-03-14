const fs = require('fs');
const path = require('path');

const logToFile = async (msg) => {
  const date = new Date().toISOString();
  fs.appendFile(path.resolve(__dirname, '../../logs/server.log'), `[${date}] ${msg}\n`, () => {});
};

const Log = process.env.NODE_ENV === 'production' ? {
  error: async (msg) => logToFile(`[Error]: ${msg}`),
  log: async (msg) => logToFile(`[ Log ]: ${msg}`),
} : console;

module.exports = { Log };
