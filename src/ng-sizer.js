/* eslint-env browser */

const angular = window.angular;

function moduleSize(m) {

  const childrenSize = m.requires
    .map((moduleName) => {

      return moduleSize(angular.module(moduleName));

    })
    .reduce((combined, eachModuleSize) => {

      return {
        controllerCount: combined.controllerCount + eachModuleSize.controllerCount,
        directiveCount: combined.directiveCount + eachModuleSize.directiveCount,
        serviceCount: combined.serviceCount + eachModuleSize.serviceCount,
      };

    }, {
      controllerCount: 0,
      directiveCount: 0,
      serviceCount: 0,
    });

  const invokeQueue = m._invokeQueue;

  const controllerCount = invokeQueue
    .filter(([ provider ]) => provider === '$controllerProvider')
    .length;

  const directiveCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$compileProvider' && method === 'directive';

    }).length;

  const serviceCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$provide' && method === 'service';

    }).length;

  return {
    controllerCount: controllerCount + childrenSize.controllerCount,
    directiveCount: directiveCount + childrenSize.directiveCount,
    serviceCount: serviceCount + childrenSize.serviceCount,
  };

}

module.exports = function (appModule) {

  const {
    controllerCount,
    directiveCount,
    serviceCount
  } = moduleSize(appModule);

  console.info(`
    Controller count: ${controllerCount}
    Directive count: ${directiveCount}
    Service count: ${serviceCount}
  `);

}