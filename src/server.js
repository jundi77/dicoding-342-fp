const Hapi = require('@hapi/hapi');
const { Log } = require('./logging/Log');
const { routes } = require('./routers');

(async () => {
  global.Log = Log;

  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  server.route(routes);

  try {
    await server.start();
  } catch (error) {
    Log.error(`Server failed to start: ${error.message}`);
  }

  Log.log(`Server started at ${server.info.uri}`);
})();
