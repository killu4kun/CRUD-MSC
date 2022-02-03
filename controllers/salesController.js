const saleService = require('../services/saleService');
const productService = require('../services/productServices');

const addSalesService = (req,res) => {
    const sales = req.body;

    const promises = sales.map(({product_id}) => productService.)
}