const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../services/productServices');
const productController = require('../../controllers/productsController');

describe('Testa camada Controller - Products', () => {
  describe('Adiciona um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        "name": "Heineken",
        "quantity": 14
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'productCreate').resolves(true);

    });

    after(() => {
      productService.productCreate.restore();
    });

    it('é chamado o status com código 201', async () => {
      await productController.productCreate(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Retorna todos os produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'productGetAll').resolves(true);

    });

    after(() => {
      productService.productGetAll.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.productGetAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Retorna um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 12
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'productGetById').resolves(true);

    });

    after(() => {
      productService.getById.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.productGetById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Atualiza um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 12
      };

      request.body = {
        "name": "Heineken",
        "quantity": 14
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'productUpDate').resolves(true);

    });

    after(() => {
      productService.productUpDate.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.productUpDate(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

});