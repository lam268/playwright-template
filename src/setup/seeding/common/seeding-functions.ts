import models from '../models/index';
import * as dotenv from 'dotenv';
import { parse } from 'csv-parse';
import { QueryTypes } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();
const DATABASE = process.env.DATABASE_NAME;
const CSV_DELIMITER = ',';
const TABLE_TO_CSV_PATH = {
  classes: 'class',
};

function getFileCSVToArray(filePath: string, delimiter: string = CSV_DELIMITER) {
  return new Promise((resolve) => {
    const csvData = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter }))
      .on('data', function (csvRow) {
        csvData.push(csvRow);
      })
      .on('end', function () {
        resolve(csvData);
      });
  });
}

function getFileCSVToArrayJSON(filePath: string, delimiter: string = CSV_DELIMITER) {
  return new Promise((resolve) => {
    const csvData = [];
    const headers = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter }))
      .on('data', function (csvRow) {
        if (!headers.length) {
          headers.push(...csvRow);
        } else {
          const dataJson = {};
          csvRow.forEach((itemData, index) => {
            dataJson[headers[index]] = itemData;
          });
          csvData.push(dataJson);
        }
      })
      .on('end', function () {
        resolve(csvData);
      });
  });
}

export async function deleteDataTableByColumn(
  columName: string,
  columValue: string | number,
  tableName: string,
) {
  const sql = `UPDATE ${DATABASE}.${tableName} SET deletedAt=NOW() WHERE ${columName} = ${
    typeof columValue === 'string' ? `"${columValue}"` : columValue
  } AND deletedAt IS NULL`;
  await models.sequelize.query(sql, {
    type: QueryTypes.UPDATE,
  });
}

export async function updateDataTableByColumn(
  columUpdateName: string,
  columUpdateValue: string | number,
  tableName: string,
  columName: string,
  columValue: string | number,
) {
  const sql = `UPDATE ${DATABASE}.${tableName} SET ${columUpdateName} = ${
    typeof columUpdateValue === 'string' ? `"${columUpdateValue}"` : columUpdateValue
  } WHERE ${columName} = ${
    typeof columValue === 'string' ? `"${columValue}"` : columValue
  } AND deletedAt IS NULL`;
  await models.sequelize.query(sql, {
    type: QueryTypes.UPDATE,
  });
}

export async function importDataTableByCSV(tableName: string, fileNameCSV: string) {
  const filePath = path.resolve(__dirname, `../csv/${TABLE_TO_CSV_PATH[tableName]}/${fileNameCSV}`);

  const dataImport = (await getFileCSVToArray(filePath)) as [];
  const columNameImport = (dataImport.shift() as []).join(',');
  const dataValues = dataImport.map((dataValue: []) => {
    return (
      '(' +
      dataValue.map((dataAttributeValue) => {
        if (typeof dataAttributeValue === 'string') {
          return `'${dataAttributeValue}'`;
        }
        return dataAttributeValue;
      }) +
      ')'
    );
  });
  const sql = `INSERT INTO ${DATABASE}.${tableName} (${columNameImport}) VALUES ${dataValues.join(
    ',',
  )};`;
  await models.sequelize.query(sql, {
    type: QueryTypes.INSERT,
  });
}

export async function getDataByCSV(tableName: string, fileNameCSV: string) {
  const filePath = path.resolve(
    __dirname,
    `../../csv/${TABLE_TO_CSV_PATH[tableName]}/${fileNameCSV}`,
  );
  const dataArrayJSON = (await getFileCSVToArrayJSON(filePath)) as [];
  return dataArrayJSON;
}

export async function truncateTable(tableName: string) {
  const sql = `TRUNCATE ${DATABASE}.${tableName}`;
  await models.sequelize.query(`SET FOREIGN_KEY_CHECKS = 0`, {
    type: QueryTypes.UPDATE,
  });
  await models.sequelize.query(sql, {
    type: QueryTypes.DELETE,
  });

  await models.sequelize.query(`SET FOREIGN_KEY_CHECKS = 1`, {
    type: QueryTypes.UPDATE,
  });
}
