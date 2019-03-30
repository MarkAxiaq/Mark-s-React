const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  sessionName: process.env.SESSION_NAME,
  sessionSecretKey: process.env.SESSION_SECRET_KEY,
  sessionLifeTime: process.env.SESSION_LIFE_TIME,
};