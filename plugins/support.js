const fp = require('fastify-plugin');

module.exports = fp(async fastify => {
  fastify.decorate('someSupport', () => 'hugs');
});
