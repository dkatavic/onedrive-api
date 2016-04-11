var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwB4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAdYkPiEE9xlEzWNnvGq4rpZLncjcB0athnhX7eap4pr3HHOo4u6jbyayEWyXmH+fJ69oYqfpRPi3kqD7dwjSO7/aaJ8k04OjLBmwIT5EvijzHQyR450t17XqI7OhhSRtMJpIQAqyu24R2MxqNeaJluaaEgNTIkSQ4Z1ZWKMY2sR4PTUQGCLcKL9aK8grRB1usQel1MctJWXTdV1FyhlBaqduscvyPI+z7XBmkd3qb7ZRCIji8nqH9yMG0S0d4hVvg0AJfXWs+h6keN+EvEYqow9TheE5ngxOeF9B1FCsgqFr7iAxdZzOT2knfqeZzFxqmuEc2FfdZ5+bB+l30l7VYAgDZgAACICinOKiKgbWSAFkUxQyifsPKOhT7ef23+o+qOSabJHDgd1XrQjEkd8l1QveOqNdyy38iCB3EiLDlnMrfZYXJvTeMjiLjtO0v4DZKJ213Dz1namokrCV5XqgDUXnM4PxQcY1tP5NJmjyfM503kq341gT/u7pfkdnWZSVqgQ3XDY4y3YwpcN2FsVd8lJ9wgA5otyL0UUM5f9GV/Y5G7S0IY35x5DhZpC6lL/DTDNHFvdy/c6chDkofGdcj8ZjD8fLBtJ5Pn0ztmvICNNI129wmN7XgrGEacSFTkQdqbYQMfn1OCA4Fivo6IwEyOnjN5/U7511PFDNviHhqRpPAU4f7aIg/2Gqy2p2iKSBeHhcPJmQr1Vk+ze+k+oDZhW1Yp3zPz/MhP0mtl0/aom6meh0fpmltPjxOmxXKPoW9LlclUVl8nXPxgo+lGMVCfk6/vvMqAcNcgE=";
global.appConfig = config;
global.oneDrive = oneDrive;
global.mocha = mocha;
global.expect = chai.expect;

// global errorHandler that ensures that whole error is logged, not just [object Object]
global.errorHandler = function(done){
  return function(err) {
    console.error(err);
    done(err);
  }
}


process.nextTick(() => {
  run();
});
