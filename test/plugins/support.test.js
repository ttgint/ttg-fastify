'use strict';

const { test } = require('tap');
const { build } = require('../helper');

test('support works standalone', async t => {
  const fastify = build(t);

  await fastify.ready();
  t.equal(fastify.someSupport(), 'hugs');
});
