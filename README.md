[![npm version](https://badge.fury.io/js/ember-multiton-service.svg)](https://badge.fury.io/js/ember-multiton-service)
[![Build Status](https://travis-ci.org/null-null-null/ember-multiton-service.svg?branch=master)](https://travis-ci.org/null-null-null/ember-multiton-service)

# ember-multiton-service

Ember's services are singletons, which in most cases is exactly what you'd want. However, there are scenarios where having multiple instances of a service would come in handy. For instance, imagine that you have a group of components that need to share state. This is exactly the type of thing that a service does well. Let's say that we now want several of these groups to co-exist, each with their own state. Supporting that with a singleton service requires a lot of boilerplate.

`ember-multiton-service` makes this scenario much easier. Swap your `my-app/services/my-service.js` with `my-app/multiton-services/my-service.js`, and then replace `Ember.inject.service('my-service')` with `multiton('my-service', 'someKey')`. And then you're done!

## Installation

`ember install ember-multiton-service`

## Usage

First, generate a multiton service:

`ember g multiton-service foo`

This generates a new file at `my-app/multiton-services/foo.js`. Treat it the same way you would treat a standard singleton service:

```js
import { MultitonService } from 'ember-multiton-service';

export default MultitonService.extend({
  foo: null,

  setFoo(value) {
    return this.set('foo', value);
  },

  getFoo() {
    return this.get('foo');
  }
});
```

Finally, inject it into your components, routes, and other services:

```js
import Ember from 'ember';
import multiton from 'ember-multiton-service';

export default Ember.Component.extend({
  fooStore: multiton('foo', 'aKey', 'anotherKey'),

  foo: alias('fooStore.foo')
});
```

### Keys

You'll notice that in the above scenario we pass three values into `multiton`. The first is the path to the multiton service, relative to the `multiton-services` directory. The second two are keys that we bind the service to. You could have provided any number of keys, from one to many. When injecting the service, `ember-multiton-service` will grab the values of those keys and then check to see if any other instances exist of that service with those keys. If so, it simply returns it. If not, it generates a new one.

To illustrate, let's consider that component from the last example:

```hbs
{{my-component aKey="foo" anotherKey="bar"}}
{{my-component aKey="foo" anotherKey="baz"}}
{{my-component aKey="alpha" anotherKey="omega"}}
{{my-component aKey="foo" anotherKey="bar"}}
```

In the scenario above, the first and last components will share the same `fooStore` service, as both their multiton keys are the same. Meanwhile, each of the middle two components will have their own instance of the `fooStore` service, as their key combos are unique.

### Testing

Because `ember-multiton-service` utilizes an initializer, it won't work normally with Ember's integration tests. (Integration tests do not load initializers.) To compensate for that, you'll have to manually run the initializer before each test. Make sure to pass in the application instance, which you can get with `Ember.getOwner(this)`:

```js
import { initialize } from 'ember-multiton-service';

moduleForComponent('my-component', 'Integration | Component | my component', {
  integration: true,

  beforeEach() {
    initialize(Ember.getOwner(this));
  }
});
```
