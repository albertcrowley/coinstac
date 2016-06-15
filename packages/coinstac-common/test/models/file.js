'use strict';
var _ = require('lodash');
var path = require('path');
var File = require(path.join(process.cwd(), 'src/models/file.js'));
var test = require('tape');

var factory = function (opts) {
  return function () {
    return new File(opts);
  };
};

var validOps = function () {
  return {
    filename: '/test/dir',
    sha: 'testSha0123456789',
    modified: 12347892,
    size: 2,
    tags: {},
  };
};

test('model::file - general', function (t) {
  t.skip('file complexity removed. leaving as placeholder');
  t.end();
});
