var config = require('../config'),
    oneDrive = require('../index'),
    mocha = require('mocha'),
    chai = require('chai');


//set globals
global.accessToken = "EwB4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAc+R+tAX4qh224St13b1k1ko3/kL1aESECw04C0Crv9O8ytjzxXVVCZgPqtzesVTSHi/v87MxGmxZhEA86JN/EDbfnATVnpp0Dpe24KTy1PFmPZEbrJ8n/ppV/QAxyQwkZlb1aEAdrXXb2+m9wgIGfOfnFmzOqxk2MKfEAOLdiSyMBR4bz9OlZLIpaUrfeHWLeMZmjTik4KyOK5jMWOOkJsUC1XjffbvC3bcCgCdSEmpq+ygbCZJcgwV2zQ/CVc4gPDjkZhRO+aTjS5pMmIMqAzOifpUZZUGCKqlHlraqsMAZ7hxtbs57mO1h9+YWfM8Yy53bjsKg6mp/SgUtdhFgSYDZgAACGRKGr0J4N62SAFSxccVCXewCFPLm7YsNE75TMOOv1uZ91t7MoApCWiWDDA9bakm3AmvvmQCKBdlXe5A0tJ8n3zF+WID1VYLReN71tvGfT5IgEMjLIkJ60i+k1iLvvHeiI1wvIP5hkxuOYy+unhDeBMBk1+YVQIzAClLZks1wVWRrw9jnlenWC7z1ST8qyB+EZHuAD5nvfw69Ng95SjnYLFi000Qu6Y1N0t7hkhftku0q9WmJeDw2Jbr5BPXtz95+4yHzMotGg1kx4EgVzW/LWlJ25m8kSXkFqkMUJsye6ZqKqrRPKjTvnox1LzSku7Fy9yKutVZx8xaIOoxdkB+4KZY3JW/Qd141s4HSyTwlmlYEQ5I4h33ytC3vfi0eOlCkoAEdCX4VWDrrPM43p4SKDWjGYMJvLYPzJ4vu+wTQ3c8xXo0qPARdm6LaFrc8clf32BRcgE=";
global.appConfig = config;
global.oneDrive = oneDrive;
global.mocha = mocha;
global.expect = chai.expect;
//global.TIMEOUT = 2000;

process.nextTick(() => {
  run();
});
