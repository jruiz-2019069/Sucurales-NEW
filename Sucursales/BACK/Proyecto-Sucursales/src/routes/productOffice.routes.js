'use strict'

const productOfficeController = require('../controllers/productOffice.controller');
const express = require('express');
const api = express.Router();
const middleware = require('../services/middleware');

api.get('/testProductOfficeController', productOfficeController.testProductOfficeController);
api.get('/getProductsOffice/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.getProductsOffice);
api.get('/getProductOffice/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.getProductOffice);
api.post('/searchProductsOffice/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.searchProductsOffice);
api.post('/searchProductsOfficeBySupplier/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.searchProductsOfficeBySupplier);
api.get('/sortProductsOfficeByLargerStock/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.sortProductsOfficeByLargerStock);
api.get('/sortProductsOfficeByRetailStock/:id', [middleware.isLoged, middleware.isCompany], productOfficeController.sortProductsOfficeByRetailStock);


module.exports = api;
