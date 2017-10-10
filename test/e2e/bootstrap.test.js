var oneDrive = require('../../lib/index'),
  mocha = require('mocha'),
  chai = require('chai'),
  credentials = require('./credentials');


//set globals
global.accessToken = credentials.accessToken;
global.oneDrive = oneDrive;
global.mocha = mocha;
global.expect = chai.expect;

// global errorHandler that ensures that whole error is logged, not just [object Object]
global.errorHandler = function (done) {
  return function (err) {
    console.error(err);
    done(err);
  }
}


process.nextTick(() => {
  run();
});
