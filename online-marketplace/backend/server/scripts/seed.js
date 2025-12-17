// scripts/seed.js
require('dotenv').config();
const { connectDB } = require('../src/config/db');
const User = require('../src/models/user');
const Category = require('../src/models/category');
const Item = require('../src/models/item');
const { hashPassword } = require('../src/utils/hash');

(async () => {
  await connectDB();
  await User.deleteMany({});
  await Category.deleteMany({});
  await Item.deleteMany({});

  const pw = await hashPassword('password123');

  const seller = await User.create({ name: 'Seller One', email: 'seller@example.com', passwordHash: pw, role: 'seller', sellerProfile: { storeName: "Seller's Shop" }});
  const buyer = await User.create({ name: 'Buyer One', email: 'buyer@example.com', passwordHash: pw, role: 'buyer' });

  const cat = await Category.create({ name: 'Clothing', description: 'Wearable items' });

  await Item.create({
    sellerId: seller._id,
    title: 'Red T-Shirt',
    description: '100% cotton',
    category: cat.name,
    price: 15.99,
    deliveryTimeEstimate: 3,
    stock: 10
  });

  console.log('Seed done');
  process.exit(0);
})();
