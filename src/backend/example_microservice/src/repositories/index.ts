import { DataSource } from "typeorm";
import { GroupModel } from "../models/GroupModel";
import { UserGroupModel } from "../models/UserGroupModel";

// Define your DataSource options
export const AppDataSource = new DataSource({
  type: "postgres", // or other database type
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "mydatabase",
  entities: [GroupModel, UserGroupModel], // Add all your models here
  synchronize: true, // Use only in development!
});
