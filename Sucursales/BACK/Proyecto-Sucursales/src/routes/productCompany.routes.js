'use strict'

const express = require('express');
const api = express.Router();
const productCompanyController = require('../controllers/productCompany.controller');
const middleware = require('../services/middleware');

api.get('/testProductCompanyController', productCompanyController.testProductCompanyController);
api.post('/addProductCompany/:id', [middleware.isLoged, middleware.isCompany], productCompanyController.addProductCompany);
api.put('/updateProductCompany/:id', [middleware.isLoged, middleware.isCompany], productCompanyController.updateProductCompany);
api.delete('/deleteProductCompany/:id', [middleware.isLoged, middleware.isCompany], productCompanyController.deleteProductCompany);
api.get('/getProductsCompany/:id', [middleware.isLoged, middleware.isCompany], productCompanyController.getProductsCompany);
api.get('/getProductCompany/:id', [middleware.isLoged, middleware.isCompany], productCompanyController.getProductCompany);
api.post('/searchProductsCompany', [middleware.isLoged, middleware.isCompany], productCompanyController.searchProductsCompany);
api.post('/searchProductsCompanyBySupplier', [middleware.isLoged, middleware.isCompany], productCompanyController.searchProductsCompanyBySupplier);
api.get('/sortProductsCompanyByLargerStock', [middleware.isLoged, middleware.isCompany], productCompanyController.sortProductsCompanyByLargerStock);
api.get('/sortProductsCompanyByRetailStock', [middleware.isLoged, middleware.isCompany], productCompanyController.sortProductsCompanyByRetailStock);



module.exports = api;