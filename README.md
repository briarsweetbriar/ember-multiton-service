[![npm version](https://badge.fury.io/js/ember-multiton-service.svg)](https://badge.fury.io/js/ember-multiton-service)
[![Build Status](https://travis-ci.org/null-null-null/ember-multiton-service.svg?branch=master)](https://travis-ci.org/null-null-null/ember-multiton-service)

# ember-multiton-service

So your client wants a shopping cart? Easy peasy. Add a `shopping-cart` service to your app. Done and done! But wait, what's this nonesense? They now want to keep track of two separate shopping carts for different parts of the site? Okay, okay. You can handle this. Create a super class and extend two separate services from it, let's say `shopping-cart-produce` and `shopping-cart-bulk`. Not that bad. Only, wait!?!? Is this for real? They now want the user to be able to create an arbitrary number of shopping carts? Anywhere from 1 to infinity? What is this, Super Market Spree?

Well, you can handle this too, and it'll pretty easy, because you have . . . `ember-multiton-service`!!!

Simply replace `Ember.inject.service('my-service')` with `multiton('my-service', 'someKey')`. And then you're done!

## Installation

`ember install ember-multiton-service`

## Usage

Use the `multiton` macro instead of `Ember.inject.service`, and provide it with however many keys you need:

```js
import Ember from 'ember';
import multiton from 'ember-multiton-service';

export default Ember.Component.extend({
  cart: multiton('shopping-cart', 'section', 'aisle')
});
```

### Keys

You'll notice that in the above scenario we pass three values into `multiton`. The first is the path to the service, just like what we would pass into `Ember.inject.service`. The second two are keys that we bind the service to. You could provide any number of keys, from 1 to infinity. (Good for Super Market Spree.) When injecting the service, `ember-multiton-service` will check to see if any other instances exist with those keys. If so, it simply returns it. If not, it creates a new one.

To illustrate, let's consider that component from the last example:

```hbs
{{cart-toggle section="food" aisle="bulk"}}
{{cart-toggle section="food" aisle="produce"}}
{{cart-toggle section="hardware" aisle="crockpots"}}
{{cart-toggle section="food" aisle="bulk"}}
```

In the scenario above, the first and last components will share the same `shopping-cart` service, as both their multiton keys are the same. Meanwhile, each of the middle two components will have their own instance of the `shopping-cart` service, as their key combos are unique.
