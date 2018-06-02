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

describe('ngSizer', function () {

  this.stubbedConsoleInfo = sinon.stub(global.console, 'info');

  beforeEach(() => {

    this.testModule = angular.module('test', []);

    this.randomControllerCount = Math.floor(Math.random() * 100);

    for (var i = 0; i < this.randomControllerCount; i++) {

      this.testModule.controller(`Controller${i}`, function () {});

    }

  });

  it('should log controller count', () => {

    ngSizer(this.testModule);
    assert(this.stubbedConsoleInfo.calledWith(`Controller count: ${this.randomControllerCount}`));

  });

})