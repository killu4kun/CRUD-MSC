const saleModel = require('../models/saleModel');

const serialize = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
});

const saleAdd = async (sales) => {
  const newSaleId = await saleModel.createNewSale();
  const serializedSales = sales.map(serialize);

  const promisesArray = serializedSales
    .map((sale) => saleModel.addSaleProducts({ saleId: newSaleId, ...sale }));
    // aguarda todas as sales serem adicionadas
  await Promise.all(promisesArray); 
  return newSaleId;
};

const saleGetAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const saleGetById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

const saleUpdate = async (saleInfo) => {
  const updatedSale = await saleModel.update(saleInfo);
  return updatedSale;
};

module.exports = {
  saleAdd,
  saleGetAll,
  saleGetById,
  saleUpdate,
};