const Products = require('../models/productsModels');

const create = async (newProduct) => {
  const products = await Products.getAll();
  const alreadyExists = products.some(({ name }) => name === newProduct.name);
  if (alreadyExists) throw new Error('Product already exists');

  const createdProduct = await Products.create(newProduct);

  return createdProduct;
};
const getById = async (id) => {
    const foundProduct = await Products.getById(id);
    return foundProduct;
  };
  
  const getAll = async () => {
    const products = await Products.getAll();
    return products;
  };
  
  const update = async ({ id, name, quantity }) => {
    const updatedProduct = await Products.update({ id, name, quantity });
    return updatedProduct;
  };
module.exports = {
  create,
  update,
  getAll,
  getById,
};
