const productService = require('../services/productServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.productCreate({
      name,
      quantity: Number(quantity),
    });
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.message === 'Product already exists') {
      return res.status(409).json({ message: err.message });
    }
    res.status(400).send(err);
  }
};

const getById = async (req, res) => {
  const { id } = req;

  const foundProduct = await productService.productGetById(id);
  if (!foundProduct) { return res.status(404).json({ message: 'Product not found' }); }

  res.status(200).json(foundProduct);
};

const getAll = async (req, res) => {
  const products = await productService.productGetAll();
  return res.status(200).json(products);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const foundProduct = await productService.productGetById(id);
  if (!foundProduct) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = await productService.productUpDate(
    { id: Number(id), name, quantity: Number(quantity) },
  );
  return res.status(200).json(updatedProduct);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const foundProduct = await productService.productGetById(id);
  if (!foundProduct) return res.status(404).json({ message: 'Product not found' });

  await productService.productDeleteById(id);
  return res.status(200).json(foundProduct);
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleteById,
};