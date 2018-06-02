/* eslint-env mocha */

const assert = require('assert');
const jsdom = require('jsdom');
const sinon = require('sinon');

global.window = new jsdom.JSDOM('<html></html>').window;
global.document = global.window.document;

require('angular/angular');
require('angular-mocks');

const angular = global.window.angular;

const ngSizer = require('../dist/ng-sizer');

function generateRandomNumber() {

  return Math.floor(Math.random() * 100);

}

describe('ngSizer', function () {

  this.stubbedConsoleInfo = sinon.stub(global.console, 'info');

  beforeEach(() => {

    this.testModule = angular.module('test', []);

    this.randomControllerCount = generateRandomNumber();

    let i;

    for (i = 0; i < this.randomControllerCount; i++) {

      this.testModule.controller(`Controller${i}`, function () {});

    }

    this.randomServiceCount = generateRandomNumber();

    for (i = 0; i < this.randomServiceCount; i++) {

      this.testModule.service(`service${i}`, function () {});

    }

  });

  it('should log controller and service count', () => {

    ngSizer(this.testModule);

    const consoleLogMessage = this.stubbedConsoleInfo.getCall(0).args[0];

    assert(consoleLogMessage.includes(`Controller count: ${this.randomControllerCount}`));
    assert(consoleLogMessage.includes(`Service count: ${this.randomServiceCount}`));

  });

})