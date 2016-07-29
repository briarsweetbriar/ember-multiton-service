[![npm version](https://badge.fury.io/js/ember-multiton-service.svg)](https://badge.fury.io/js/ember-multiton-service)
[![Build Status](https://travis-ci.org/null-null-null/ember-multiton-service.svg?branch=master)](https://travis-ci.org/null-null-null/ember-multiton-service)

# ember-multiton-service

Of the core Ember objects, [Ember.Service](https://github.com/emberjs/ember.js/blob/v2.7.0/packages/ember-runtime/lib/system/service.js#L35) is perhaps the simplest. Check it out; it's just a plain old Ember object. And yet for all its simplicity, it's also one of the most useful, providing a clean way to both encapsulate state and share it across your application.

The problem is, you can only have one instance of a service in your application; it's a singleton. And although this is typcially more than enough when using services to manage _application_ state, it falls short for managing the states of _associated components_.

This became apparent while I was working on the [Affinity Engine](https://github.com/affinity-engine/affinity-engine), an Ember-based game engine that leans heavily on services to manage state between (sometimes) hundreds of components. If there were only one Affinity Engine per Ember app, singleton services could handle this perfectly. But what if you wanted multiple engines? Then those singleton services would start getting conflicting states from each engine, leading to some horrible bugs.

In cases like these, we need something more flexible. Enter . . . `ember-multiton-service`!!!

To get it working for your own app, simply replace `Ember.inject.service('my-service')` with `multiton('my-service', 'someKey')`. And then you're done!

## Installation

`ember install ember-multiton-service`

## Usage

Use the `multiton` macro instead of `Ember.inject.service`, and provide it with however many keys you need:

```js
import Ember from 'ember';
import multiton from 'ember-multiton-service';

export default Ember.Component.extend({
  // cart: Ember.inject.service('shopping-cart'),
  cart: multiton('shopping-cart', 'section', 'aisle')
});
```

### Keys

You'll notice that in the above scenario we pass three values into `multiton`. The first is the name of the service, just like what we would pass into `Ember.inject.service`. The second two are keys that we bind the service to. You could provide any number of keys to get the level of specifity you need. When injecting the service, `ember-multiton-service` will check to see if any other instances exist with those keys. If so, it simply returns it. If not, it creates a new one.

To illustrate, let's consider that component from the last example:

```hbs
{{cart-toggle section="food" aisle="bulk"}}
{{cart-toggle section="food" aisle="produce"}}
{{cart-toggle section="hardware" aisle="crockpots"}}
{{cart-toggle section="food" aisle="bulk"}}
```

In the scenario above, the first and last components will share the same `shopping-cart` service, as both their multiton keys are the same. Meanwhile, each of the middle two components will have their own instance of the `shopping-cart` service, as their key combos are unique.
