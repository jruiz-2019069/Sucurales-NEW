'use strict'

const express = require('express');
const api = express.Router();
const companyController = require('../controllers/company.controller');
const middleware = require('../services/middleware');

api.post('/testCompanyController',companyController.testCompanyController);
api.post('/login', companyController.login);
api.put('/updateCompanyLoged', [middleware.isLoged, middleware.isCompany], companyController.updateCompanyLoged);
api.delete('/deleteCompany',[middleware.isLoged, middleware.isCompany], companyController.deleteCompany);
api.post('/addProductOffice/:idCompany/:idProduct/:idOffice', [middleware.isLoged, middleware.isCompany], companyController.addProductOffice);
api.get('/getCompany', [middleware.isLoged, middleware.isCompany], companyController.getCompany);

module.exports = api;