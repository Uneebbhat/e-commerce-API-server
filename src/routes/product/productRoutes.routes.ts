import { Router } from "express";
import {
  createProduct,
  filterProducts,
  getProductById,
  getProducts,
} from "../../controllers/product/productController.controller";
import authentication from "../../middlewares/authentication.middleware";
import authorization from "../../middlewares/authorization.middleware";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/", limits: { fileSize: 1000000 } });

router
  .post(
    "/v1/create-product",
    authentication,
    authorization(["admin"]),
    upload.single("productImg"),
    createProduct
  )
  .get("/v1/get-products", getProducts)
  .get("/v1/get-product/:id", getProductById)
  .get("/v1/filter-products", filterProducts);

export default router;
