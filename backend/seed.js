const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

async function seed() {
  await User.deleteMany();
  await Product.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  await User.create([
    { name: "Test1", email: "test1@mail.com", password },
    { name: "Test2", email: "test2@mail.com", password }
  ]);

  const products = Array.from({ length: 10 }).map((_, i) => ({
    title: `Product ${i + 1}`,
    price: 100 + i * 10,
    description: "Sample product",
    image: "https://via.placeholder.com/300"
  }));

  await Product.insertMany(products);

  console.log("Seed complete");
  process.exit();
}

seed();
