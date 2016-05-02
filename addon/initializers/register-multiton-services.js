import config from 'ember-get-config';

// import gatherModules from 'ember-theater/utils/gather-modules';
// WE NEED TO FIGURE OUT HOW TO GET THE RESOLVER TO PICK UP THE `multiton-services` DIRECTORY
function gatherModules(subRoute) {
  const paths = Object.keys(requirejs.entries);
  const modulePrefix = config.modulePrefix;
  const regexp = new RegExp(`${modulePrefix}\/${subRoute}\/(.*)`);

  const filteredPaths = paths.filter((path) => {
    return regexp.test(path) && !path.includes('.eslint');
  });

  return filteredPaths.reduce((modules, path) => {
    const moduleName = regexp.exec(path)[1];
    const module = requirejs(`${modulePrefix}\/${subRoute}\/${moduleName}`).default;

    modules.set(moduleName, module);

    return modules;
  }, new Map());
}

export function initialize(application) {
  const multitonServices = gatherModules('multiton-services');

  multitonServices.forEach((multitonService, multitonServiceName) => {
    application.register(`multiton-service:${multitonServiceName}`, multitonService, { instantiate: false, singleton: false });
  });
}

export default {
  name: 'register-multiton-initializers',
  initialize: initialize
};