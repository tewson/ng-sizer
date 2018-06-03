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

    this.randomDirectiveCount = generateRandomNumber();

    for (i = 0; i < this.randomDirectiveCount; i++) {

      this.testModule.directive(`directive${i}`, function () {});

    }

    this.randomFactoryCount = generateRandomNumber();

    for (i = 0; i < this.randomFactoryCount; i++) {

      this.testModule.factory(`factory${i}`, function () {});

    }

    this.randomProviderCount = generateRandomNumber();

    for (i = 0; i < this.randomProviderCount; i++) {

      this.testModule.provider(`provider${i}`, function () {});

    }

    this.randomServiceCount = generateRandomNumber();

    for (i = 0; i < this.randomServiceCount; i++) {

      this.testModule.service(`service${i}`, function () {});

    }

  });

  afterEach(() => {

    this.stubbedConsoleInfo.reset();

  });

  it('should log counts for controllers, directives, factories, providers and services', () => {

    ngSizer(this.testModule);

    const consoleInfoMessage = this.stubbedConsoleInfo.getCall(0).args[0];

    assert(consoleInfoMessage.includes(`Controller count: ${this.randomControllerCount}`));
    assert(consoleInfoMessage.includes(`Directive count: ${this.randomDirectiveCount}`));
    assert(consoleInfoMessage.includes(`Factory count: ${this.randomFactoryCount}`));
    assert(consoleInfoMessage.includes(`Provider count: ${this.randomProviderCount}`));
    assert(consoleInfoMessage.includes(`Service count: ${this.randomServiceCount}`));

  });

  it('should work for module hierarchy', () => {

    angular.module('sibling', [])
      .service('siblingService', function () {});

    const parentModule = angular
      .module('parent', ['sibling', 'test'])
      .controller('ParentCtrl', function () {});

    ngSizer(parentModule);

    const consoleInfoMessage = this.stubbedConsoleInfo.getCall(0).args[0];

    assert(consoleInfoMessage.includes(`Controller count: ${this.randomControllerCount + 1}`));
    assert(consoleInfoMessage.includes(`Service count: ${this.randomServiceCount + 1}`));

  });

});
