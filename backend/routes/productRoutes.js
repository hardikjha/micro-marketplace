const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET with search & pagination
router.get("/", async (req, res) => {
  const { search, page = 1, limit = 5 } = req.query;

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page)
  });
});

// Create product
router.post("/", auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Get by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
