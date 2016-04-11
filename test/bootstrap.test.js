var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwB4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAV+UWeE3S6EtZcI6MLanuA2ds/GvYHvnUTNygu4AgTUi2IHnLmGluiKmZovnXY6L0clLHoOKYTtFGgTNEekRYMvBQl0wVVJSgJ7A81PmdM0/AqSrKK5+M5g3py8eZBgccOYu+hNxTWSPwokey5ea8Ia7i2UCGcAj7ONMARhUGyCgW/GYf4tVUxiV+6bb285aG5JpZAsQ3vs68noF3TEeN4adQyUehWYSEok0uFOZYITl1zVYpRCcKh+h8gLVtfpUaLely06qgFmM6nwmRkMCXf+Pltbh5/kd+lVZOgFyO61/AXBTXnlrWvf7RuFQMQ1MC2M0eIYR1jcNqsq/TovOYUADZgAACKyHtdLnndY9SAEdLeFH8/wi9d0n2pgwI6zpyV52wWPQJD+uTyF++0BDpTsFoO9X4TYuGPLgjSekn019cUGUyd+ObrqMk2esk54Kl/3DTiIGG9UNaaWiJzAPfH2JpvHcQbHvpdRSlTVqCNA9Edy/e62MaZwSrDKxueCLPYXV4Na0nhaPTZguwtci6U6lbtQiomNSGzo0mzyn7iAaOKZCIfAqwMvyOp8baK5WwdZYxwnPajsAFcdPLKwpqIi2c7rh/nAQNSvbjVlygGep4cPc4j6QSjNBqcb1ihv1JeBqnLOIcr5sYqfM5VGeJTyRjfemv9xPsQvRWzdxMFd+uygeyXWWb6NY6ao+PjbVdlQGGrsOi8KoweP0+DrCu8kySyN+FiADEIbnBBJ56SenD+SLZoLb1rQa+bLsxGR0QWklGmALNG2OqQeiChwPea3P7QB+ZJF8cgE=";
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
