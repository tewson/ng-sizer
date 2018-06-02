module.exports = function (appModule) {

  const controllerCount = appModule._invokeQueue.filter(([ provider ]) => provider === '$controllerProvider').length;
  console.info(`Controller count: ${controllerCount}`);

}