'use strict'

const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: String,
    typeCompany: String,
    location: String,
    phone: String,
    email: String,
    userCompany: String,
    passwordCompany: String, 
    role: String
});

module.exports = mongoose.model('Company', companySchema);