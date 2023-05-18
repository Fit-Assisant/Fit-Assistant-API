import { User } from "./user";
import { database } from "../../config/database";
import { SHA256 } from "crypto-js";
export namespace UserHelper {
  export const getAllUser = (): Array<User> => {
    return database.prepare("SELECT * FROM user").all() as Array<User>;
  };

  export const createUser = (
    firstname: string,
    lastname: string,
    username: string,
    age: number,
    sexe: string,
    email: string,
    password: string
  ): void => {
    database
      .prepare(
        "INSERT INTO user (firstname, lastname, username, age, sexe, email, keypass) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        firstname,
        lastname,
        username,
        age,
        sexe,
        email,
        SHA256(password).toString()
      );
  };

  export const getUserById = (id: string): User => {
    return database.prepare("SELECT * FROM user WHERE id = ?").get(id) as User;
  };

  export const deleteUserById = (id: string): void => {
    database.prepare("DELETE FROM user WHERE id = ?").run(id);
  };

  export const checkUser = (email: string, password: string): User => {
    return database
      .prepare("SELECT * FROM user WHERE email = ? AND keypass = ?")
      .get(email, SHA256(password).toString()) as User;
  };
}
