var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwB4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAS3F4VeAqmCQvVVcgNciY7LCNqewPf8p+IROYSLFqZI8xFJ38Or5NQ8jmqw+qxwMqQRqeCQ+xtV7N5LPg2eomGe4MOLxaC9Iddz+SyNjcveRM+K6OxP15ouN/fpCW4AU34SubyrOCHt22NVf41tIaG0XN80pE3oOlo/aGif3nAmspzvbxX04rxo7jT8YQoj/bnjZJyRx+/j5mgcFFA9VDMl56brGPfrtQe6PQ5JdSwyZfeDQXCa8uIBIswzNhqHw2TWu8GicriANxYEyvjvgXjIZTXVlwr9Q8zaSVeTSu9sEt5GgTttM/mpv1k+xcaHv9sPbwJtozijV6OyBqZB1TEsDZgAACBRZfOuG/V0JSAENHuqcgRasWPovOGFmm9tqbfyhGgOJFy2MXB0enKQzUyg0wUgitC82pNiKMBktiOiWiC4uAtv8anZRf5dlkogG+8ivMFe2rlAZEfW9jLGOq2P8Mv7DIzXDhGgWVUjDFDJWGHIraMsta/QtqlEOuojFcFx3mhXbPFzOmL65Q9lMPhmfQjfQ39BGrc4/0aHCsu3YsZXLcCr26B90nKXmPkEQUAySS2FkGiLeZKSMOCt2zGB5evBtIDPtNdqc61Zw0cxxovu8nAy1HrEJ/azuNY0FwwxGsqCLQdJGNdzst0nC50rq9nlBeATD4ppftTUApClXjnmJPYizYoMjHLWF81rgOhhC4cNY/jAKiYRxM489atct8k9d7v1qTH5FvVLoavJ6xwaZrpeIGZJvpEmgOJA8TgNNiVoqxFsKUv2iIFtd8vWxvYxuA9dXcgE=";
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
