'use strict'

const mongoose = require('mongoose');

const officeSchema = mongoose.Schema({
    name: String,
    direction: String,
    phone: String,
    email: String,
    idCompany: {type: mongoose.Schema.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('Office', officeSchema);