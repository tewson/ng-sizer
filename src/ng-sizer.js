module.exports = function (appModule) {

  const invokeQueue = appModule._invokeQueue;

  const controllerCount = invokeQueue
    .filter(([ provider ]) => provider === '$controllerProvider')
    .length;

  const serviceCount = invokeQueue
    .filter(([ provider, method ]) => {

      return provider === '$provide' && method === 'service';

    }).length;

  console.info(`
    Controller count: ${controllerCount}
    Service count: ${serviceCount}
  `);

}