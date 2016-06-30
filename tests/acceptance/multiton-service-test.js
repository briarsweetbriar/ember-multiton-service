import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | multiton service');

test('visiting /', function(assert) {
  assert.expect(8);

  visit('/');

  andThen(function() {
    assert.equal($(`${hook('AB')}:first`).text().trim(), $(`${hook('AB')}:last`).text().trim(), 'service is shared across components');
    assert.equal($(`${hook('AB')}:first ${hook('number')}`).text().trim(), 1, 'service value is valid');
    assert.equal($(`${hook('ZX')}:first`).text().trim(), $(`${hook('ZX')}:last`).text().trim(), 'service is uniquely bound to keys');
    assert.equal($(`${hook('ZX')}:first ${hook('number')}`).text().trim(), 2, 'service value is valid with unique keys');
    assert.equal($(`${hook('AC')}:first`).text().trim(), $(`${hook('AC')}:last`).text().trim(), 'every key combo has a unique service');
    assert.equal($(`${hook('AC')}:first ${hook('number')}`).text().trim(), 3, 'service value is valid with different key combos');
    assert.equal($hook('singleton1').find(hook('number')).text().trim(), 10, 'singleton1 has correct value');
    assert.equal($hook('singleton2').find(hook('number')).text().trim(), 10, 'singleton2 has correct value');
  });
});
