'use strict';

const convict = require('convict');
const pify = require('util').promisify;
const access = pify(require('fs').access);
const path = require('path');

const localConfig = path.resolve(__dirname, '..', 'config', 'local.json');

const fileExists = (fPath) => {
  return access(fPath).then(() => true, () => false);
};

const conf = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development'],
    default: 'production',
    env: 'NODE_ENV',
  },
  apiServer: {
    hostname: 'localhost',
    pathname: '',
    protocol: 'http:',
    port: 3100,
  },
  subApiServer: {
    hostname: 'localhost',
    pathname: '/ws',
    port: '443',
    protocol: 'wss:',
  },
  pipelineWSServer: {
    hostname: 'localhost',
    pathname: '',
    port: '3000',
    protocol: 'http:',
  },
  logFile: 'coinstac-log.json',
  logFileBoot: 'coinstac-boot-error-log.txt',
  // these are appended to the home dir for you OS
  // *nix: ~/.config/coinstac
  // win: C:\Users\username\AppData\Local\Temp\coinstac
  logLocations: {
    darwin: 'Library/Logs/coinstac/',
    freebsd: '.config/coinstac/',
    linux: '.config/coinstac/',
    sunos: '.config/coinstac/',
    win32: 'coinstac/',
  },
});

module.exports = function loadConfig() {
  if (conf.get('env') === 'production') {
    return Promise.resolve(conf);
  }

  return fileExists(localConfig)
    .then((exists) => {
      if (exists) {
        conf.loadFile(localConfig);
      }
      return conf;
    });
};
