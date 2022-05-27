'use strict'

const mongoose = require('mongoose');

const productCompanySchema = mongoose.Schema({
    name: String,
    supplier: String,
    price: Number,
    stock: Number,
    idCompany: {type: mongoose.Schema.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('ProductCompany', productCompanySchema);