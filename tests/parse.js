var parse = require('../scripts/parse');
var _ = require('lodash');
var test = require('tape');

test('parse is function', function (t) {
    t.plan(1);
    t.ok(_.isFunction(parse));
});