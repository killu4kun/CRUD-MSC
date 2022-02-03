require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const ensureProductName = require('./middlewares/ensureProductName');
const ensureProductId = require('./middlewares/ensureProductId');
const ensureProductQuantity = require('./middlewares/ensureProductQuantity');
const ensureSaleProdId = require('./middlewares/ensureSaleProdId');
const ensureSaleQuantity = require('./middlewares/ensureSaleQuantity');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/products',
  ensureProductQuantity,
  ensureProductName,
  productsController.createProduct,
);

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', ensureProductId, productsController.getProductById);

app.put(
  '/products/:id',
  ensureProductId,
  ensureProductQuantity,
  ensureProductName,
  productsController.updateProduct,
);

app.delete('products/:id', ensureProductId, productsController.deleteProduct);

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getSaleById);

app.use(ensureSaleProdId, ensureSaleQuantity);

app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
