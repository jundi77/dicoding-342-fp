/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

describe('Test Logging', () => {
  let nodeEnvBackup;

  beforeAll(() => {
    nodeEnvBackup = process.env.NODE_ENV;
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnvBackup;
  });

  test('Log selain production pakai global.console', () => {
    process.env.NODE_ENV = 'development';
    const { Log } = require('../../src/logging/Log');

    expect(Log).toBe(global.console);
  });

  test('Log production tulis ke file', async () => {
    // eslint-disable-next-line no-var
    let filesize;
    process.env.NODE_ENV = 'production';
    const { Log } = require('../../src/logging/Log');

    expect(Log).toHaveProperty('error');
    expect(Log).toHaveProperty('log');

    try {
      filesize = fs.statSync(path.resolve(__dirname, '../../logs/server.log')).size;
    } catch (error) {
      filesize = 0;
    }

    let compareCount = 0;
    const compareFileSize = () => {
      const newFilesize = fs.statSync(path.resolve(__dirname, '../../logs/server.log')).size;
      if (filesize === newFilesize && compareCount <= 6) {
        compareCount++;
        setTimeout(compareFileSize, 500);
        return;
      }

      expect(filesize < newFilesize).toEqual(true);
    };

    Log.log('Test write log').then(() => {
      Log.error('Test write error').then(() => {
        compareFileSize();
      });
    });
  });
});
