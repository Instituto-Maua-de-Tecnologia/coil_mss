import { PrismaClient } from "@prisma/client";

import { DatabaseMain } from "./DatabaseMain";
import { IUserRepo } from "../interfaces/IUserRepo";
import { User } from "../../structure/entities/User";

export class UserRepo implements IUserRepo {
  private client: PrismaClient;

  constructor() {
    this.client = new DatabaseMain().rd_client;
  }

  public get_user(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public get_user_by_email(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public create_user(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async update_user(updatedUser: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
