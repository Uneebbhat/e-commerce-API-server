import Joi from "joi";

const UserLoginSchema = Joi.object({
  email: Joi.string().required().email().lowercase().trim().messages({
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string().required().min(8).trim().messages({
    "string.min": "Password must be at least 8 characters long",
  }),
});

export default UserLoginSchema;
