'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require('../services/middleware');

api.get('/testAdminController', adminController.testAdminController);
api.post('/addAdmin', adminController.addAdmin);
api.post('/addCompany', adminController.addCompany);
api.put('/updateCompany/:id', [middleware.isLoged], adminController.updateCompany);
api.delete('/deleteCompany/:id', [middleware.isLoged, middleware.isAdmin], adminController.deleteCompany);
api.get('/getCompanies', [middleware.isLoged, middleware.isAdmin], adminController.getCompanies);
api.get('/getCompany/:id', [middleware.isLoged], adminController.getCompany);
api.get('/getOffices/:id', [middleware.isLoged, middleware.isAdmin], adminController.getOffices);
api.get('/getCompanyProducts/:id', [middleware.isLoged, middleware.isAdmin], adminController.getCompanyProducts);

module.exports = api;