const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Add favorite
router.post("/favorites/:id", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { favorites: req.params.id }
  });
  res.json({ message: "Added to favorites" });
});

// Remove favorite
router.delete("/favorites/:id", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { favorites: req.params.id }
  });
  res.json({ message: "Removed from favorites" });
});

// Get favorites
router.get("/me/favorites", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");
  res.json(user.favorites);
});

module.exports = router;
