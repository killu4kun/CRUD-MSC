const Products = require('../models/productsModels');

const create = async (newProduct) => {
  const products = await Products.getAll();
  const alreadyExists = products.some(({ name }) => name === newProduct.name);
  if (alreadyExists) throw new Error('Product already exists');

  const createdProduct = await Products.create(newProduct);

  return createdProduct;
};

const validQuantity = (quantity) => {
  if (typeof quantity !== 'number' || quantity <= 0) return true;
  return false;
};

const isValid = (name, quantity) => {
  switch (true) {
    case name === undefined:
      return { code: 400, message: '"name" is required' };
    case name.length < 5:
      return {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      };
    case quantity === undefined:
      return { code: 400, message: '"quantity" is required' };
    case validQuantity(quantity):
      return {
        code: 422,
        message: '"quantity" must be a number larger than or equal 1',
      };
    default:
      return {};
  }
};

module.exports = {
  create,
  isValid,
};
