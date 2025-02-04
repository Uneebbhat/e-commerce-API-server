import Joi from "joi";

const CreateProductSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price is required",
  }),
  stock: Joi.number().required().messages({
    "number.base": "Stock must be a number",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  productImg: Joi.string().optional(),
  // image: Joi.string().required().messages({
  //   "string.empty": "Image is required",
  // }),
});

export default CreateProductSchema;
