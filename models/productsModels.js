const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [rows] = await connection.execute(query, [id]);
  return rows[0];
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?';
  try {
    await connection.execute(query, [id]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  getById,
  deleteById,
};
