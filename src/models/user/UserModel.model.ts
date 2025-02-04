import mongoose, { Model, Schema } from "mongoose";
import { DEFAULT_IMG } from "../../config/constants";
import { IUser, UserRoles } from "../../shared/index";

const UserModel: Schema<IUser> = new Schema(
  {
    profilePic: {
      type: String,
      default: DEFAULT_IMG,
    },
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [30, "Name must be less than 30 characters long"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
      trim: true,
    },
    role: {
      type: String,
      enum: UserRoles,
      default: UserRoles.user,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserModel);

export default User;
