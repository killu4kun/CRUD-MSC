const Products = require('../services/productServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, productId, message } = await Products.create(name, quantity);

  if (message) return res.status(code).json({ message });
  return res.status(code).json({ productId });
};

module.exports = {
  createProduct,
};
