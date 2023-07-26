/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DB } from '../../../common/constants';

/* eslint-disable no-console */
const Sequelize = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const db: any = {};
const sequelize = new Sequelize(DB.DATABASE_NAME, DB.DATABASE_USERNAME, DB.DATABASE_PASSWORD, {
  host: DB.DATABASE_HOST,
  dialect: 'mysql',
  logging: null,
  freezeTableName: false,
  operatorsAliases: Sequelize.Op,
  timezone: '+00:00',
  dialectOptions: {
    dateStrings: true,
    typeCast(field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  pool: {
    max: 1,
    min: 0,
    idle: 10000,
    acquire: 60000,
  },
  define: {
    // timestamps: true, // Auto add timestamp for createdAt and updatedAt
    paranoid: true, // Soft delete
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
