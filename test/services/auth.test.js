const { test } = require('tap');
const { build } = require('../helper');

test('should return a token', async t => {
  const app = build(t);

  const res = await app.inject({
    url: '/api/auth/token',
    method: 'POST',
    payload: { username: 'dummy', password: 'dummy' }
  });

  const { token } = JSON.parse(res.payload);

  t.ok(token);
});

test('should give Invalid username or password', async t => {
  const app = build(t);

  const res = await app.inject({
    url: '/api/auth/token',
    method: 'POST',
    payload: { username: '', password: 'wrong' }
  });

  const payload = JSON.parse(res.payload);

  t.notOk(payload.token);
  t.is(res.statusCode, 401);
  t.is(payload.message, 'Invalid username or password');
});
