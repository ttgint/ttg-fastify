module.exports = async function(fastify, opts) {
  const schema = {
    response: {
      200: {
        type: 'object',
        properties: {
          token: { type: 'string' }
        }
      }
    },
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' }
      }
    }
  };

  fastify.post('/token', { schema }, async function(request, reply) {
    const { username, password } = request.body;

    // get the actual user here, make sure you compare the hashed password
    const user = opts.auth.user || null;

    if (user == null || user.username !== username || user.password !== password) {
      reply.status(401).send({ message: 'Invalid username or password' });
    } else {
      const token = fastify.jwt.sign({ sub: user.username }, { expiresIn: '1h' });
      reply.send({ token });
    }
  });
};

module.exports.autoPrefix = '/auth';
