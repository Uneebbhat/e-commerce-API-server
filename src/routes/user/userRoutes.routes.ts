import { Router } from "express";
import {
  login,
  signup,
} from "../../controllers/user/userController.controller";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/", limits: { fileSize: 3000000 } });

router
  .post("/v1/signup", upload.single("profilePic"), signup)
  .post("/v1/login", login);

export default router;
