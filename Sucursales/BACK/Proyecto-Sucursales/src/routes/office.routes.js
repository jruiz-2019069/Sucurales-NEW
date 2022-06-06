'use strict'

const express = require('express');
const api = express.Router();
const officeController = require('../controllers/office.controller');
const middleware = require('../services/middleware');

api.get('/testOfficeController', officeController.testOfficeController);
api.post('/addOffice/:idCompany', [middleware.isLoged, middleware.isCompany], officeController.addOffice);
api.put('/updateOffice/:id', [middleware.isLoged, middleware.isCompany], officeController.updateOffice);
api.delete('/deleteOffice/:id', [middleware.isLoged, middleware.isCompany], officeController.deleteOffice);
api.get('/getOffices/:id', [middleware.isLoged, middleware.isCompany || middleware.isAdmin], officeController.getOffices);
api.get('/getOffice/:id', [middleware.isLoged, middleware.isCompany], officeController.getOffice);
api.post('/searchOffices', [middleware.isLoged, middleware.isCompany], officeController.searchOffices);
api.put('/sellProduct/:id', [middleware.isLoged, middleware.isCompany], officeController.sellProduct);

module.exports = api;