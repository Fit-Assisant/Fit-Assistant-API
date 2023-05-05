import SQLiteDatabase, { Database } from "better-sqlite3";
let database: Database;
const connection = (): Promise<void> => {
  return new Promise((resolve) => {
    database = new SQLiteDatabase("data.db");
    createDatabase(database);
    return resolve();
  });
};
const createDatabase = (db: Database): void => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS categories
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL
    )
    `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS exercices
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    machine BOOLEAN NOT NULL
    )
    `
  ).run();
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

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS programs
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    visible INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 0
    )
    `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS programs_exercices
    (
    program INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    exercice INTEGER NOT NULL REFERENCES exercices(id) ON DELETE CASCADE,
    sorting INTEGER NOT NULL,
    duration FLOAT DEFAULT NULL,
    repetitions INTEGER DEFAULT NULL,
    series INTEGER DEFAULT NULL,
    intensity INTEGER DEFAULT NULL,
    PRIMARY KEY (program, exercice, sorting)
    )
    `
  ).run();
};

export { connection, database };
