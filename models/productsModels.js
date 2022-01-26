const connection = require('./connection');

const AddProducts = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const FindProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [result] = await connection.execute(query, [name]);
  return result;
};

module.exports = {
  AddProducts,
  FindProductByName,
};
