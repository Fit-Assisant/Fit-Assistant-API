import SQLiteDatabase, { Database } from "better-sqlite3";
let database: Database;
const connection = (): Promise<void> => {
  return new Promise((resolve) => {
    database = new SQLiteDatabase("data.db");
    createExercicesTable(database);
    createUserTable(database);
    return resolve();
  });
};
const createExercicesTable = (db: Database): void => {
  db.prepare(
    `
CREATE TABLE IF NOT EXISTS exercices
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
image VARCHAR NOT NULL,
machine BOOLEAN NOT NULL
)
`
  ).run();
};

const createUserTable = (db: Database): void => {
  db.prepare(
    `
CREATE TABLE IF NOT EXISTS user
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
firstname VARCHAR NOT NULL,
lastname VARCHAR NOT NULL,
username VARCHAR NOT NULL,
age INTEGER NOT NULL,
sexe VARCHAR NOT NULL,
email VARCHAR NOT NULL
)
`
  ).run();
};

export { connection, database };
