# ng-sizer
Measure the size of your AngularJS module.

[![Build Status](https://travis-ci.org/tewson/ng-sizer.svg?branch=master)](https://travis-ci.org/tewson/ng-sizer) ![ng-sizer](https://img.shields.io/npm/v/ng-sizer.svg)

## Usage

After everything is registered in your AngularJS module, simply call `ngSizer()` with the module as an argument and check your console.

```js
import ngSizer from 'ng-sizer';

...

const app = angular.module('app', []);

app.controller('HomeCtrl', function () { ... });

ngSizer(app);
/*
 * Will log the following to the console:
 *
 * Controller count: 1
 *
 */
```