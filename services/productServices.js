const Products = require('../models/productsModels');

const productCreate = async (newProduct) => {
  const products = await Products.getAll();
  const alreadyExists = products.some(({ name }) => name === newProduct.name);
  if (alreadyExists) throw new Error('Product already exists');

  const createdProduct = await Products.create(newProduct);

  return createdProduct;
};
const productGetById = async (id) => {
    const foundProduct = await Products.getById(id);
    return foundProduct;
  };
  
  const productGetAll = async () => {
    const products = await Products.getAll();
    return products;
  };
  
  const productUpDate = async ({ id, name, quantity }) => {
    const updatedProduct = await Products.update({ id, name, quantity });
    return updatedProduct;
  };
module.exports = {
  productCreate,
  productUpDate,
  productGetAll,
  productGetById,
};
