const connection = require('./connection');

const createNewSale = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [rows] = await connection.execute(query);
  return rows.insertId;
};

const addSaleItem = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
};

const getAll = async () => {
  const query = `SELECT 
    sales.id AS saleId, sales.date, salesproducts.product_id,salesproducts.quantity 
    FROM StoreManager.sales_products AS salesproducts JOIN
      StoreManager.sales AS sales
      ON salesproducts.sale_id = sales.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

module.exports = {
  createNewSale,
  addSaleItem,
  getAll,
};
