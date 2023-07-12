import { User } from "./user";
import { database } from "../../config/database";
import { SHA256 } from "crypto-js";
export namespace UserHelper {
  /**
   * Const declaration to get all users
   *
   * @returns Users list
   *
   * @beta
   */
  export const getAllUser = (): Array<User> => {
    return database.prepare("SELECT * FROM user").all() as Array<User>;
  };

  /**
   * Const declaration to create user
   *
   * @param firstname - Firstname's user
   * @param lastname - Lastname's user
   * @param username - Username's user
   * @param email - Email's user
   * @param password - Password's user
   *
   * @beta
   */
  export const createUser = (
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): void => {
    database
      .prepare(
        "INSERT INTO user (firstname, lastname, username, email, keypass) VALUES (?, ?, ?, ?, ?)"
      )
      .run(firstname, lastname, username, email, SHA256(password).toString());
  };

  export const getUserById = (id: string): User => {
    return database.prepare("SELECT * FROM user WHERE id = ?").get(id) as User;
  };

  export const getUserByEmail = (email: string): User => {
    return database.prepare("SELECT * FROM user WHERE email = ?").get() as User;
  };

  export const deleteUserById = (id: string): void => {
    database.prepare("DELETE FROM user WHERE id = ?").run(id);
  };

  export const checkUser = (email: string, password: string): User => {
    console.log(password);
    console.log(SHA256(password).toString());
    return database
      .prepare("SELECT * FROM user WHERE email = ? AND keypass = ?")
      .get(email, SHA256(password).toString()) as User;
  };
}
