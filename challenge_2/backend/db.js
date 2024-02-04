require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

async function createTables(connection) {
  return new Promise(async (resolve, reject) => {
    try {
      const script = fs.readFileSync('models/utils/dev-challenge.sql', { encoding: 'utf-8' });

      const statements = script.split(/;\s*[\r\n]+/);

      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await connection.execute(statement);
            // console.log(statement);
          } catch (err) {
            console.error('Error executing statement:', statement);
            reject(err);
            return;
          }
        }
      }
      console.log('Tables created successfully');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        return reject(err);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return reject(err);
        }

        resolve(hash);
      });
    });
  });
}

async function insertUserData(connection) {
  const processRow = async (row) => {
    const { id, username, password } = row;
    const hash = await hashPassword(password);
    const sql = `INSERT INTO \`dev-challenge\`.user (id, username, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE username=VALUES(username), password=VALUES(password)`;
    await connection.execute(sql, [id, username, hash]);
    console.log(`Inserted/Updated user: ${username}`);
  };

  const stream = fs.createReadStream('models/utils/user.csv').pipe(csv({ separator: ';' }));

  return new Promise((resolve, reject) => {
    const promises = [];

    stream
      .on('data', async (row) => {
        const promise = processRow(row);
        promises.push(promise);
      })
      .on('end', async () => {
        await Promise.all(promises);
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error processing CSV:', err);
        reject(err);
      });
  });
}

async function insertCurrencyData(connection) {
  const processRow = async (row) => {
    const { id, base, counter, rate } = row;
    const sql = `INSERT INTO \`dev-challenge\`.currency (id, base, counter, rate) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE base=VALUES(base), counter=VALUES(counter), rate=VALUES(rate)`;
    await connection.execute(sql, [id, base, counter, rate]);
  };

  const stream = fs.createReadStream('models/utils/currency.csv').pipe(csv({ separator: ';' }));

  return new Promise((resolve, reject) => {
    const promises = [];

    stream
      .on('data', async (row) => {
        const promise = processRow(row);
        promises.push(promise);
      })
      .on('end', async () => {
        await Promise.all(promises);
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error processing CSV:', err);
        reject(err);
      });
  });
}

async function main() {
  console.log("Database Host:", process.env.DB_HOST);
  console.log("Database User:", process.env.DB_USER);
  console.log("Database Password:", process.env.DB_PASSWORD);
  console.log("Database Name:", process.env.DB_NAME);

  const connection = await mysql.createConnection(dbConfig);
  try {
    await createTables(connection);
    await insertUserData(connection);
    await insertCurrencyData(connection);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}


module.exports = main;
