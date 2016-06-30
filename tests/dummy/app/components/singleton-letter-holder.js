import Ember from 'ember';
import { HookMixin } from 'ember-hook';

const { Component } = Ember;
const { computed: { alias } } = Ember;

export default Component.extend(HookMixin, {
  numberStore: Ember.inject.service('numberStore'),

  number: alias('numberStore.number')
});
