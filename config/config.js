require('dotenv').config();

module.exports = {
  mysql_database: process.env.DB_DATABASE,
  mysql_host: process.env.DB_HOST,
  mysql_user: process.env.DB_USER,
  mysql_password: process.env.DB_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_password: process.env.SESSION_PASSWORD,
};