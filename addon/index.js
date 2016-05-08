import MultitonService from 'ember-multiton-service/multiton-service/factory';
import multitonService from 'ember-multiton-service/multiton-service/macro';
import { initialize } from 'ember-multiton-service/instance-initializers/ember-multiton-service/register-options';
import getMultiton from 'ember-multiton-service/utils/ember-multiton-service/get-multiton';

export default multitonService;

export {
  MultitonService,
  initialize,
  getMultiton
};
