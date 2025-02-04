import { Request, Response } from "express";
import CreateProductSchema from "../../schemas/product/CreateProductSchema.schema";
import ErrorHandler from "../../utils/ErrorHandler";
import Product from "../../models/product/ProductModel.model";
import ResponseHandler from "../../utils/ResponseHandler";
import cloudinaryUpload from "../../services/cloudinaryUpload";
import NodeCache from "node-cache";
import { IProduct } from "../../shared";

const cache = new NodeCache();

export const createProduct = async (req: Request, res: Response) => {
  const { error } = CreateProductSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const { title, description, price, stock, category } = req.body;

    let productImgURL = null;

    if (req.file) {
      const result = await cloudinaryUpload(
        req.file.path,
        {
          folder: "e-commerce/product",
        },
        res
      );
      productImgURL = (result as any).secure_url;
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      productImg: productImgURL,
    });
    if (!newProduct) {
      ErrorHandler.send(res, 500, "Failed to create product");
    }

    cache.del("products");

    ResponseHandler.send(res, 201, "Product created successfully", newProduct);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal server error: ${error.message}`);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let cachedProducts;
    if (cache.has("products")) {
      cachedProducts = cache.get("products") as IProduct[];
      ResponseHandler.send(res, 200, "Products fetched successfully", {
        length: cachedProducts.length,
        products: cachedProducts,
      });
    } else {
      cachedProducts = await Product.find().sort({ createdAt: -1 });
      cache.set("products", cachedProducts);
      ResponseHandler.send(res, 200, "Products fetched successfully", {
        length: cachedProducts.length,
        products: cachedProducts,
      });
    }
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal server error: ${error.message}`);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      ErrorHandler.send(res, 404, "Product not found");
    }

    ResponseHandler.send(res, 200, "Product fetched successfully", product!);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal server error: ${error.message}`);
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const { title, price, category } = req.query;

    // Build filter object based on provided query parameters
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (price) {
      filter.price = Number(price);
    }

    if (category) {
      filter.category = category;
    }

    // Find products matching the filter criteria
    const filteredProducts = await Product.find(filter).sort({ createdAt: -1 });

    if (!filteredProducts.length) {
      ResponseHandler.send(
        res,
        200,
        "No products found matching the criteria",
        {
          length: 0,
          products: [],
        }
      );
    } else {
      ResponseHandler.send(res, 200, "Products filtered successfully", {
        length: filteredProducts.length,
        products: filteredProducts,
      });
    }
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal server error: ${error.message}`);
  }
};
