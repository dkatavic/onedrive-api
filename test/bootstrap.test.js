var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwBwAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAa3dW4hOIfAI/gQRWw/UMZrGNVoyK7+reWsCxQkHWVXcyEVWwI/xXQezJDd+jIjFT2N0Nar3HB97lcOjM6RyaGtmFaHTKrQc2V4X0IlRKKkbQLiD31/BXvuKJ2Z29atQISTvfePUSxMOVRBtigGlUESMGbCR/VZCzJPsb6kIVdvE2DRAzvTQ4Tdhy/34Pp5ovUgGXnSo1ybf+flVVax4czCooTn0kfVUqf7wL8g3QAAPe5ctcG6AQUblxfTidD9sRxFrme0mTI+8dJcRq/b6KjSUvB70N7+XlMJAYVsqGzYQta7YaIv2fNj0fNFMHjXgCZ3vc8BeGuC2BzX/un7yQAsDZgAACAfPG1Xoq00rQAHggT2YE63tirEQSqmjKNZbOfeVaqZW12otbH5dF8NmdMFinPjFifb3149jgqZ/FQfbpCuglycqGKqNlGHxWS4D/nROXJva3yvSNlJEEj5BA/9ZdERymwzNN4aa+kk+BLjO4YZClLpH2qi2XLZqi/8icK8dk5jZqNlOAF/OPh8YhAgngDM9QQSxbbasxChazmS05jKEEHuPthGqYNlgAYRp2tnVZ7F80v+yd8rWkF6+lQA04yoG5E4+tgFjgRD2TNkQp+iE1Ez+xdBz1h61hLRCVe5YmNdK7Nj7CrYrUschwkjnii1k4QIljQ3UFf45Yh+pPSGSkQsjdJwDkEoWpiu8nfW+4J0qQOxn8Ve/7Q5Z2BKlm5/mfozqoP/wi79f9s2v6RI2S9755divzBGSPAzjNOTwQpa6YZCK+3wrU8eK13IB";
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
