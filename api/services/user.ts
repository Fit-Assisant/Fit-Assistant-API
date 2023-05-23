import jsonfile from "jsonfile";
import { User } from "../models/user/user";
import { UserHelper } from "../models/user/helpers";
import { database } from "../config/database";
export namespace UserService {
  export const getAllUser = (): Array<User> => {
    return UserHelper.getAllUser();
  };

  export const saveUser = (): void => {
    const data = UserHelper.getAllUser();
    jsonfile.writeFile("./data/user.json", data, (error: any) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  };

  export const loadUser = (): void => {
    const data = jsonfile.readFileSync("./data/user.json");
    database.prepare("DELETE FROM user").run();
    data.forEach((user: User) => {
      UserHelper.createUser(
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        user.password
      );
    });
  };
  export const createUser = (
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): void => {
    UserHelper.createUser(firstname, lastname, username, email, password);
  };

  export const getUserById = (id: string): User => {
    return UserHelper.getUserById(id);
  };

  export const deleteUserById = (id: string): void => {
    UserHelper.deleteUserById(id);
  };

  export const checkUser = (email: string, password: string): User => {
    return UserHelper.checkUser(email, password);
  };
}
