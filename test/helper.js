// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const tap = require('tap');
const App = require('../app');

const { beforeEach, tearDown } = tap;

beforeEach(async () => {
  // logic before each tests
  // such cleanup db
});

tearDown(async () => {
  // logic after each test
});

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {
    auth: {
      secret: 'averyverylongsecret',
      user: { username: 'dummy', password: 'dummy' }
    }
  };
}

// automatically build and tear down our instance
function build(t) {
  const app = Fastify();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config());

  // tear down our app after we are done
  t.tearDown(app.close.bind(app));

  return app;
}

module.exports = { build };
