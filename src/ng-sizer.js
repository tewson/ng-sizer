/* eslint-env browser */

const angular = window.angular;

function ngSizer(m) {

  const childrenSize = m.requires
    .map((moduleName) => {

      return ngSizer(angular.module(moduleName));

    })
    .reduce((combined, eachModuleSize) => {

      return {
        controllerCount: combined.controllerCount + eachModuleSize.controllerCount,
        directiveCount: combined.directiveCount + eachModuleSize.directiveCount,
        factoryCount: combined.factoryCount + eachModuleSize.factoryCount,
        providerCount: combined.providerCount + eachModuleSize.providerCount,
        serviceCount: combined.serviceCount + eachModuleSize.serviceCount,
      };

    }, {
      controllerCount: 0,
      directiveCount: 0,
      factoryCount: 0,
      providerCount: 0,
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

  const factoryCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$provide' && method === 'factory';

    }).length;

  const providerCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$provide' && method === 'provider';

    }).length;

  const serviceCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$provide' && method === 'service';

    }).length;

  return {
    controllerCount: controllerCount + childrenSize.controllerCount,
    directiveCount: directiveCount + childrenSize.directiveCount,
    factoryCount: factoryCount + childrenSize.factoryCount,
    providerCount: providerCount + childrenSize.providerCount,
    serviceCount: serviceCount + childrenSize.serviceCount,
  };

}

module.exports = ngSizer;
