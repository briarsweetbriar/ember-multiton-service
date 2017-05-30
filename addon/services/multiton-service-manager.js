import Ember from 'ember';

const {
  Service,
  assign,
  computed,
  get,
  getOwner,
  isBlank,
  set
} = Ember;

const { Logger: { error } } = Ember;

export default Service.extend({
  serviceMap: computed(() => Ember.Object.create()),

  getService(path, multitonPropertiesArray) {
    return get(this, `serviceMap.${this._getKeys(multitonPropertiesArray).join('.')}.${path}`);
  },

  addService(path, multitonPropertiesArray) {
    const serviceMap = get(this, 'serviceMap');
    const factory = getOwner(this).factoryFor(`service:${path}`);

    if (factory === undefined) { return error(`Expected '${path}' to be a service, but it was ${factory}`); }

    const multitonProperties = assign({}, ...multitonPropertiesArray);
    const multitonService = factory.create(multitonProperties);

    const joinedKeys = this._getKeys(multitonPropertiesArray).reduce((joinedKeys, key) => {
      if (isBlank(get(serviceMap, `${joinedKeys}${key}`))) {
        set(serviceMap, `${joinedKeys}${key}`, Ember.Object.create());
      }

      return `${joinedKeys}${key}.`;
    }, '');

    return set(serviceMap, `${joinedKeys}${path}`, multitonService);
  },

  removeServices(multitonPropertiesArray) {
    const joinedKeys = this._getKeys(multitonPropertiesArray).join('.');
    const serviceMap = get(this, 'serviceMap');
    const serviceContainer = get(serviceMap, joinedKeys);
    const multitonKeys = Object.keys(serviceContainer);

    multitonKeys.forEach((multitonKey) => {
      get(serviceContainer, multitonKey).destroy();
    });

    window.Reflect.deleteProperty(serviceMap[joinedKeys]);
  },

  _getKeys(multitonPropertiesArray) {
    return multitonPropertiesArray.map((keyValue) => {
      const key = Object.keys(keyValue)[0];

      return `${key}:${get(keyValue, key)}`;
    });
  }
});
