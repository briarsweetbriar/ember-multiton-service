import Ember from 'ember';
import { HookMixin } from 'ember-hook';
import multiton from 'ember-multiton-service';

const { Component } = Ember;
const { computed: { alias } } = Ember;

export default Component.extend(HookMixin, {
  numberStore: multiton('numberStore', 'firstLetter', 'secondLetter'),

  number: alias('numberStore.number')
});
