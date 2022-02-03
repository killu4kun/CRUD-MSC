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

const getSalesAll = async (req, res) => {
    const sales = await saleService.saleGetAll();
    return res.status(200).json(sales);
  };

const getSalesById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: 'Sale not found' });
    
    const sale = await saleService.saleGetById(id);
    if (sale && sale.length) return res.status(200).json(sale);

    return res.status(404).json({ message: 'Sale not found' });
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const [sale] = req.body;

    const productIsExistent = await productService.productGetById(sale.product_id);
    if (!productIsExistent) return res.status(404).json({ message: 'Sale not found' });
    await saleService.saleUpdate({ id, ...sale });

    return res.status(200).json({ saleId: id, itemUpdated: [{ id, ...sale }] });
};

module.exports = {
    addSalesController,
    getSalesAll,
    getSalesById,
    updateSales,
};