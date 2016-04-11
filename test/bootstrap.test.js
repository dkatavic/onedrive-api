var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwB4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAATk4eEjM1+pBJMNqth01+J2vuC94vi4TFzxkwvmmwLZpE6Jkw1m8fBVcYQllOCMpTWVcWLx+4p4/kSo6tTjwTo4gnt9T3iMFB49DdLd+sXJH6J+55qtJgwEIQwWVVB92Lm/b3JoXwSvVt47Z4a7pdyMmbkWaoCH90BZsDF//9XvpT8HBY3aoAC4qkE2Dt+LwEurBKU2O8iF4vDxodXCaEnyuInCKkXtIPv9grUyEJ5ZoJ+B4kBRCvB1X4Jw2EKPz6Vi7tC9FbkU3HmK1dUaKfeRxcwO7v0WmJrEa9AhMmOl5JSgaqEafZHOiHfJEyx4soG4wQQHP0oQ+zRd0fxkVU2kDZgAACNuJJf8201v5SAFRVMf1NEOK1r9U8nRiW2xwdX8M5ncJJPA46SBZLGvgiugEWr0gJ30T1PbZ6G0xzWYypBQDKsOlgl1GuO11wJ4kLQnembOZfNOy+2mW/Zk/9IvxY72/RWcYGhJ4jUbb6N+T36IAG4QHvhDqI7RH3rOutubGM7gL0x+sskGKWsuUQSow7eGEw23H7IplldM0J/l5YYlP59czVRsK/Jk7dgN7COEIMXjKmCMFyABlfCdE5xbSQaLkbrlNtJL79sdknDGm8iu4/cdDk6qqLfPcjhqjLoIxvZMr2CKGiZ+CPe/ICTFHP4/EKe88HaQKxI4XC4ij3bX0QYlhUmhaBOoqrR2w+QfUER5/3zJh27NWG/JNIFw/3DU7OqGa1+R1STQwZizyaCE4qSUrkmyJPbh54trlETIep4Dn7zUpjfmpWyBL+ARhbyS/sjwccgE=";
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
