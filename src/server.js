const Hapi = require('@hapi/hapi');
const Log = require('./logging/Log');

(async () => {
  global.Log = Log;

  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  try {
    await server.start();
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
  }

  console.log(`Server started at ${server.info.uri}`);
})();
