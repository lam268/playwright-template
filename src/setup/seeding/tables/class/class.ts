/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import models from '../../models/index';
import * as dotenv from 'dotenv';
import { QueryTypes } from 'sequelize';

const moment = require('moment');
// const { QueryTypes } = require('sequelize');

dotenv.config();

const ClassAction = {
  INSERT_RANDOM: 'random',
};

export async function insertRandomClass(totalItems) {
  const classList = [];

  for (let index = 0; index < totalItems; index += 1) {
    const obj = {
      id: null,
      name: `Class_${Math.floor(Math.random() * 100000)}`,
      status: Math.floor(Math.random() * 100000) % 2 === 0 ? 'active' : 'inactive',
      description: `Description_${Math.floor(Math.random() * 100000)}`,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const value = `(${obj.id},'${obj.name}','${obj.description}','${obj.status}','${obj.createdAt}','${obj.updatedAt}')`;
    classList.push(value);
  }
  const values = classList.join(',');
  const database = process.env.DATABASE_NAME;

  const sql = `INSERT INTO ${database}.classes (id,name,description,status,createdAt,updatedAt) VALUES ${values};`;

  await models.sequelize.query(sql, {
    type: QueryTypes.INSERT,
  });
}

async function main() {
  // get list args
  const commandLineArgs = process.argv
    .filter((args) => args.substring(0, 2) === '--')
    .map((commandLineArg) => commandLineArg.substring(2));

  const objArgs: Record<string, string> = {};

  commandLineArgs.forEach((arg) => {
    const arrayKeyAndValue = arg.split('=');
    if (arrayKeyAndValue.length > 1) objArgs[arrayKeyAndValue[0]] = arrayKeyAndValue[1];
  });
  // run actions
  if (objArgs.action === ClassAction.INSERT_RANDOM) {
    const totalItems = +objArgs.item;
    await insertRandomClass(totalItems);
  }
}
main();
