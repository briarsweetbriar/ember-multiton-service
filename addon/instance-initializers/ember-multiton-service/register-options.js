export function initialize(appInstance) {
  appInstance.registerOptionsForType('multiton-service', { instantiate: false });
}

export default {
  name: 'ember-multiton-service/register-options',
  initialize
};
