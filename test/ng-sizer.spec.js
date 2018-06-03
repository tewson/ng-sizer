/* eslint-env mocha */

const assert = require('assert');
const jsdom = require('jsdom');

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

  it('should return counts for controllers, directives, factories, providers and services', () => {

    const moduleSize = ngSizer(this.testModule);

    assert.equal(moduleSize.controllerCount, this.randomControllerCount);
    assert.equal(moduleSize.directiveCount, this.randomDirectiveCount);
    assert.equal(moduleSize.factoryCount, this.randomFactoryCount);
    assert.equal(moduleSize.providerCount, this.randomProviderCount);
    assert.equal(moduleSize.serviceCount, this.randomServiceCount);

  });

  it('should work for module hierarchy', () => {

    angular.module('sibling', [])
      .service('siblingService', function () {});

    const parentModule = angular
      .module('parent', ['sibling', 'test'])
      .controller('ParentCtrl', function () {});

    const parentModuleSize = ngSizer(parentModule);

    assert.equal(parentModuleSize.controllerCount, this.randomControllerCount + 1);
    assert.equal(parentModuleSize.serviceCount, this.randomServiceCount + 1);

  });

});
