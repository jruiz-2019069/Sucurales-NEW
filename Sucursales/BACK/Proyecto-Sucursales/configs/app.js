'use strict'

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('../src/routes/admin.routes');
const companyRoutes = require('../src/routes/company.routes');
const officeRoutes = require('../src/routes/office.routes');
const productCompanyRoutes = require('../src/routes/productCompany.routes');
const productOfficeRoutes = require('../src/routes/productOffice.routes');

//Creación del servidor
const app = express();

//Configuraciones del servidor de express
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(cors());

//Rutas del servidor
app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);
app.use('/office', officeRoutes);
app.use('/productCompany', productCompanyRoutes);
app.use('/productOffice', productOfficeRoutes);

module.exports = app;

