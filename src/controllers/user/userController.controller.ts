import { Request, Response } from "express";
import UserSignupSchema from "../../schemas/user/UserSignupSchema.schema";
import ErrorHandler from "../../utils/ErrorHandler";
import User from "../../models/user/UserModel.model";
import ResponseHandler from "../../utils/ResponseHandler";
import generateToken from "../../helpers/generateToken";
import UserDTO from "../../dto/user/UserDTO.dto";
import sendEmail from "../../services/sendEmail";
import { welcomeEmail } from "../../templates/emails/welcomeEmail";
import UserLoginSchema from "../../schemas/user/UserLoginSchema.schema";
import bcrypt from "bcrypt";
import { IUserDTO } from "../../shared";
import setCookies from "../../helpers/setCookies";
import cloudinaryUpload from "../../services/cloudinaryUpload";

export const signup = async (req: Request, res: Response) => {
  // Validate the request body
  const { error } = UserSignupSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ErrorHandler.send(res, 409, "User already exists");
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePicURL = null;

    if (req.file) {
      const result = await cloudinaryUpload(
        req.file.path,
        {
          folder: "e-commerce/user",
        },
        res
      );
      profilePicURL = (result as any).secure_url;
    }

    // Creating a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      profilePic: profilePicURL,
    });

    if (!user) {
      ErrorHandler.send(
        res,
        500,
        "Failed to create user due to a server error"
      );
    }

    // Generate a JWT token for the user
    const token = generateToken(res, user);

    setCookies(res, token);

    const userDTO = new UserDTO(user as IUserDTO);

    try {
      const emailTemplate = welcomeEmail(user.name);
      await sendEmail(
        user.email,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html
      );
    } catch (error: any) {
      console.error(`Failed to send welcome email: ${error.message}`);
    }

    ResponseHandler.send(
      res,
      201,
      "Account created successfully",
      userDTO,
      token
    );
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = UserLoginSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
    } else {
      // Comparing the password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        ErrorHandler.send(res, 400, "Invalid credentials");
      } else {
        const userDTO = new UserDTO(user as IUserDTO);

        // Generate a JWT token for the user
        const token = generateToken(res, user);

        setCookies(res, token);

        ResponseHandler.send(
          res,
          200,
          "Logged in successfully",
          userDTO,
          token
        );
      }
    }
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
