import { Request, Response } from "express";
import User from "../models/User.js";

export interface OpenUser{
  username: string;
}

class UserController{
    static async getUserById(req: Request) : Promise<User>{
        const found = await User.findByPk(req.params.id);  
        if(found){
          return found;
        }
        throw new Error("User not found.")
      }


      static async getOpenUserById(req: Request) : Promise<OpenUser>{
        const found = await User.findByPk(req.params.id);  
        if(found){
          return {
            "username": found.username
          };
        }
        throw new Error("User not found.")
      }
}


export default UserController