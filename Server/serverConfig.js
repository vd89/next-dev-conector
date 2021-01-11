const config = require('config');

module.exports = {
  ENVIRONMENT: config.get('ENVIRONMENT') || process.env.NODE_ENV,
  PORT: config.get('PORT') || process.env.PORT,
  MONGO_URL: config.get('MONGO_URL') || process.env.MONGO_URL,
  SESSION_SECRET: config.get('SESSION_SECRET') || process.env.SESSION_SECRET,
  PRODUCTION_URL: config.get('PRODUCTION_URL') || process.env.PRODUCTION_URL,
};
