import { User } from "./user";
import { database } from "../../config/database";
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
    email: string
  ): void => {
    database
      .prepare(
        "INSERT INTO user (firstname, lastname, username, age, sexe, email) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(firstname, lastname, username, age, sexe, email);
  };

  export const getUserById = (id: string): User => {
    return database.prepare("SELECT * FROM user WHERE id = ?").get(id) as User;
  };

  export const deleteUserById = (id: string): void => {
    database.prepare("DELETE FROM user WHERE id = ?").run(id);
  };
}
