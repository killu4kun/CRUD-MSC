const Products = require("../models/productsModels");

const isValid = (name, quantity) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity === undefined) {
    return { code: 400, message: '"quantity" is required' };
  }

  if (typeof quantity !== "number" || quantity <= 0) {
    return {
      code: 422,
      message: '"quantity" must be a positive number',
    };
  }
  return {};
};

const create = async (name, quantity) => {
  const productIsValid = isValid(name, quantity);

  if (productIsValid.message) return productIsValid;

  const productId = await Products.create(name, quantity);

  return { code: 201, productId };
};

module.exports = {
  create,
  isValid,
};
