import SQLiteDatabase, { Database } from "better-sqlite3";
let database: Database;
const connection = (): Promise<void> => {
  return new Promise((resolve) => {
    database = new SQLiteDatabase("data.db");
    createExercicesTable(database);
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
image VARCHAR NOT NULL
)
`
  ).run();
};

export { connection, database };
