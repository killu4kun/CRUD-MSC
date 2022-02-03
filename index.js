require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
// comitao do teste

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
  productsController.create,
);

app.get('/products', productsController.getAll);

app.get('/products/:id', ensureProductId, productsController.getById);

app.put(
  '/products/:id',
  ensureProductId,
  ensureProductQuantity,
  ensureProductName,
  productsController.update,
);

app.delete('/products/:id', ensureProductId, productsController.deleteById);

app.get('/sales', salesController.getSalesAll);

app.get('/sales/:id', salesController.getSalesById);

app.use(ensureSaleProdId, ensureSaleQuantity);

app.post('/sales', salesController.addSalesController);

app.put('/sales/:id', salesController.updateSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
