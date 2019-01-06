// Read the .env file.
require('dotenv').config();

// Require the framework
const Fastify = require('fastify');

// Instantiate Fastify with some config
const app = Fastify({
  logger: true
});

// Register your application as a normal plugin.
app.register(require('./app.js'));

// Start listening.
app.listen(process.env.PORT || 5000, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
