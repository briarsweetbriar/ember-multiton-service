import Ember from 'ember';
import getMultiton from 'ember-multiton-service/utils/ember-multiton-service/get-multiton';

const {
  computed,
  get,
  getOwner,
  getProperties
} = Ember;

export default function multiService(path, ...keyAttributes) {
  return computed(...keyAttributes, {
    get() {
      const multitonProperties = getProperties(this, ...keyAttributes);
      const multitonKeys = Object.keys(multitonProperties).map((key) => get(multitonProperties, key));
      const owner = getOwner(this);

      return getMultiton(owner, path, multitonKeys);
    }
  });
}
