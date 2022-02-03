const saleService = require('../services/saleService');
const productService = require('../services/productServices');

const addSalesController = (req, res) => {
    const sales = req.body;

    const promises = sales.map(({ product_id }) => productService.productExists(product_id));
    Promise.all(promises).then((productIds) => {
        const ValidAll = productIds.every((isvalid) => isvalid);
        if (!ValidAll) res.status(404).json({ message: 'Product not found' });
    });
};

module.exports = {
    addSalesController,
};