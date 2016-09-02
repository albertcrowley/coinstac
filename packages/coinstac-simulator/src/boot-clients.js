'use strict';

require('./utils/handle-errors');

const cp = require('child_process');
const { getProcessLogger } = require('./utils/logging');
const path = require('path');

/**
 * Get ready client.
 *
 * @param {string} username
 * @param {string} declPath
 * @param {boolean} [verbose=false]
 * @returns {Promise}
 */
function getReadyClient(username, declPath, verbose) {
  return new Promise((resolve, reject) => {
    const client = cp.fork(path.resolve(__dirname, './boot-client.js'), {
      cwd: process.cwd(),
      silent: true,
    });

    function messageHandler(message) {
      if ('ready' in message && message.ready) {
        client.removeListener('message', messageHandler);
        resolve(client);
      } else {
        reject(new Error('Client sent non-ready message first'));
      }
    }

    client.on('exit', code => {
      if (code) {
        throw new Error(`Client process exited with code ${code}`);
      }
    });
    client.on('message', messageHandler);
    client.stderr.on(
      'data',
      getProcessLogger(client, `USER ${username}`, 'error')
    );

    if (verbose) {
      client.stdout.on('data', getProcessLogger(client, `USER ${username}`));
    }

    client.send({
      boot: {
        declPath,
        username,
      },
    });
  });
}

/**
 * Boot clients.
 * @module
 *
 * @param {string} declPath
 * @returns {Promise} Resolves with an array of forked client processes
 */
function bootClients(declPath) {
  const decl = require(declPath); // eslint-disable-line global-require
  const usernames = typeof decl.users[0] === 'string' ?
    decl.users :
    decl.users.map(user => user.username);

  return Promise.all(usernames.map(username => {
    return getReadyClient(username, declPath, decl.verbose);
  }));
}

module.exports = bootClients;

