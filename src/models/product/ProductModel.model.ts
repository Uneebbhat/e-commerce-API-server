import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "../../shared";

const ProductModel: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    productImg: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductModel
);

export default Product;
