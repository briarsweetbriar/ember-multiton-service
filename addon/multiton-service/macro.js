import Ember from 'ember';
import getMultiton from 'ember-multiton-service/utils/ember-multiton-service/get-multiton';

const {
  computed,
  get,
  getOwner,
  set
} = Ember;

export default function multiService(path, ...keyAttributes) {
  return computed(...keyAttributes, {
    get() {
      const owner = getOwner(this);
      const multitonPropertiesArray = keyAttributes.map((key) => {
        const keyValue = {};

        set(keyValue, key, get(this, key));

        return keyValue;
      });

      return getMultiton(owner, path, multitonPropertiesArray);
    }
  });
}
