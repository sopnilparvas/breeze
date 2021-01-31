const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// Get categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findOne({ name });

  if (category) return res.status(400).json({ message: "This category already exist!" });

  await Category.create({ name });

  res.status(201).json({ message: "A new category created" });
});

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) return res.status(404).json({ message: "This category does not exist!" });

  category.name = name;

  await category.save();

  res.json({ message: "Category updated!" });
});

// Delete category
const deleteCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) return res.status(404).json({ message: "This category does not exist!" });

  await category.remove();

  res.json({ message: "Category deleted!" });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
