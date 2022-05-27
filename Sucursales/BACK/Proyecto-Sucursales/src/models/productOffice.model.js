'use strict'

const mongoose = require('mongoose');

const productOfficeSchema = mongoose.Schema({
    name: String,
    supplier: String,
    price: Number,
    stock: Number,
    totalSales: Number,
    idOffice: {type: mongoose.Schema.ObjectId, ref: 'Office'}, 
    idCompany: {type: mongoose.Schema.ObjectId, ref: 'Company'}, 
});

module.exports = mongoose.model('ProductOffice', productOfficeSchema);