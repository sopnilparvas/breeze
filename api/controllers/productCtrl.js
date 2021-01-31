const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Filtering, sorting, paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|regex)\b/g, match => `$${match}`);
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// Get products
const getProducts = asyncHandler(async (req, res) => {
  const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
  const products = await features.query;

  res.json({ length: products.length, products });
});

// Get product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "No product found!" });

  res.json(product);
});

// Create products
const createProduct = asyncHandler(async (req, res) => {
  const { product_id, title, price, description, content, images, category } = req.body;
  if (!images) return res.status(400).json({ message: "No images were uploaded!" });

  const product = await Product.findOne({ product_id });
  if (product) return res.status(400).json({ message: "Product already exist!" });

  const newProduct = await Product.create({
    product_id,
    title,
    price,
    description,
    content,
    images,
    category,
  });

  res.status(201).json(newProduct);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { product_id, title, price, description, content, images, category } = req.body;

  if (!images) return res.status(400).json({ message: "No images were uploaded!" });

  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { product_id, title, price, description, content, images, category }
  );

  res.json({ message: "Updated successfully!" });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted successfully!" });
});

module.exports = { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
