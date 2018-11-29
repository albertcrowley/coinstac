const hapi = require('hapi');
const config = require('../config/default');
const helperFunctions = require('./auth-helpers');
const plugins = require('./plugins');
const routes = require('./routes');
const wsServer = require('./ws-server');

const server = new hapi.Server();
server.connection({
  host: config.host,
  port: config.hapiPort,
});

server.register(plugins, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  }

  /**
   * JWT middleware validates token on each /graphql request
   * User object with permissions returned from validateToken function
   */
  server.auth.strategy('jwt', 'jwt',
    {
      key: helperFunctions.JWTSecret,
      validateFunc: helperFunctions.validateToken,
      verifyOptions: { algorithms: ['HS256'] },
    });

  server.auth.default('jwt');

  // console.log(routes);

  server.route(routes);
});

server.start((startErr) => {
  if (startErr) throw startErr;
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console

  wsServer.activate(server);
});
