import { Document, Types } from "mongoose";

// User Interfaces
export enum UserRoles {
  user = "user",
  admin = "admin",
}

export interface IUser {
  profilePic: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}

export interface IUserDTO extends IUser {
  _id: Types.ObjectId;
  profilePic: string;
  name: string;
  email: string;
  role: UserRoles;
}

// Product Interfaces
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  productImg: string;
}
