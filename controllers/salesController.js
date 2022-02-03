const saleService = require('../services/saleService');
const productService = require('../services/productServices');

const addSalesController = async (req, res) => {
    const sales = req.body;

    const promises = sales.map(({ product_id }) => productService.productExists(product_id));
    Promise.all(promises).then((productIds) => {
        const ValidAll = productIds.every((isvalid) => isvalid);
        if (!ValidAll) res.status(404).json({ message: 'Product not found' });
    });
    const newSaleID = await saleService.saleAdd(sales);
    res.status(201).json({ id: newSaleID, itemsSold: sales });
};

module.exports = {
    addSalesController,
};