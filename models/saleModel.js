const connection = require('./connection');

const createNewSale = async () => {
    const query = 'INSERT INTO StoreManager.sales VALUES ()';
    const [rows] = await connection.execute(query);
    return rows.insertId;
};

module.exports = {
    createNewSale,
};