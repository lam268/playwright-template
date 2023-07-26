/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    dialect: 'mysql',
  },
};
