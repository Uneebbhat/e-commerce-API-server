import Joi from "joi";
import { DEFAULT_IMG } from "../../config/constants";
import { UserRoles } from "../../shared/index";

const UserSchema = Joi.object({
  profilePic: Joi.string().optional().default(DEFAULT_IMG),
  name: Joi.string().required().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 30 characters long",
  }),
  email: Joi.string().required().email().lowercase().trim().messages({
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string().required().min(8).trim().messages({
    "string.min": "Password must be at least 8 characters long",
  }),
  role: Joi.string()
    .valid(...Object.values(UserRoles))
    .optional()
    .default(UserRoles.user),
});

export default UserSchema;
