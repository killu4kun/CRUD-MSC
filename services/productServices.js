const Products = require('../models/productsModels');

const findProduct = async (name) => {
    const product = await Products.FindProductByName(name);
    if (product.length !== 0) return { code: 409, message: 'Product already exists' };
    return {};
};

const validQuantity = (quantity) => {
    if (typeof quantity !== 'number' || quantity <= 0) return true;
    return false;
};

const isValid = (name, quantity) => {
    switch (true) {
        case (name === undefined): return { code: 400, message: '"name" is required' };
        case (name.length < 5): return {
            code: 422,
            message: '"name" length must be at least 5 characters long',
        };
        case (quantity === undefined): return { code: 400, message: '"quantity" is required' };
        case (validQuantity(quantity)): return { 
            code: 422, 
            message: '"quantity" must be a number larger than or equal 1', 
        };
        default: return {};
    }
};

const create = async (name, quantity) => {
    const productValid = isValid(name, quantity);

    if (name) {
        const product = await findProduct(name);
        if (product.message) return product;
    }

    if (productValid.message) return productValid;

    const product = await Products.AddProducts({ name, quantity });
    return { code: 201, productId: product.id };
};

module.exports = {
  create,
  isValid,
};
