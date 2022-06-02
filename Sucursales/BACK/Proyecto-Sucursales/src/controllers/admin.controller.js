'use strict'

const Company = require('../models/company.model');
const Admin = require('../models/admin.model');
const Office = require('../models/office.model');
const ProductCompany = require('../models/productCompany.model');
const ProductOffice = require('../models/productOffice.model');
const {dataObligatory, encryptPassword} = require('../utils/validate');

exports.testAdminController = (req, res)=>{
    return res.send({message: 'The function test admin controller is running.'})
}

//Esta función sirve para agregar a un usuario
exports.addAdmin = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            userAdmin: params.userAdmin,
            passwordAdmin: params.passwordAdmin,
            role: 'ADMIN'
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            let adminFound = await Admin.findOne({name: params.name});
            if(adminFound){
                return res.status(400).send({message: 'This admin already exist.'});
            }else{
                data.passwordAdmin = await encryptPassword(params.passwordAdmin);
                let admin = new Admin(data);
                await admin.save();
                return res.status(200).send({message: 'Admin created successfully.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Con esta función un administrador podrá crear una empresa.
exports.addCompany = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            typeCompany: params.typeCompany,
            location: params.location,
            phone: params.phone,
            email: params.email,
            userCompany: params.userCompany,
            passwordCompany: params.passwordCompany,
            role: 'COMPANY'
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            let companyFound = await Company.findOne({$or: [
                {name: params.name.toUpperCase()},
                {userCompany: params.userCompany}
            ]});
            if(companyFound){
                return res.status(400).send({message: 'This company or user company already exist.'});
            }else{
                data.passwordCompany = await encryptPassword(params.passwordCompany);
                let company = new Company(data);
                await company.save();
                return res.status(200).send({message: 'Company created successfully.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Con esta función un ADMIN podrá editar los campos de una empresa.
exports.updateCompany = async(req, res)=>{
    try{
        const idCompany = req.params.id;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            typeCompany: params.typeCompany,
            location: params.location,
            phone: params.phone,
            email: params.email,
            userCompany: params.userCompany
            
        }
        const msg = await dataObligatory(data); 
        if(msg){
            return res.status(400).send(msg);
        }else{
            const company = await Company.findOne({_id: idCompany});
            
            if(company.name != params.name.toUpperCase()){
                const companyFound = await Company.findOne({name: params.name.toUpperCase()});
                if(companyFound){
                    return res.status(400).send({message: 'This company already exist.'});
                }else{
                    const companyUpdated = await Company.findOneAndUpdate({_id: idCompany}, data, {new:true});
                    return res.status(200).send({message: 'Company updated: ', companyUpdated});
                }
            }else if(company.userCompany != params.userCompany){
                const companyFound = await Company.findOne({userCompany: params.userCompany});
                if(companyFound){
                    return res.status(400).send({message: 'This user company already exist.'});
                }else{
                    const companyUpdated = await Company.findOneAndUpdate({_id: idCompany}, data, {new:true});
                    return res.status(200).send({message: 'Company updated: ', companyUpdated});
                }
            }else{
                const companyUpdated = await Company.findOneAndUpdate({_id: idCompany}, data, {new:true});
                return res.status(200).send({message: 'Company updated: ', companyUpdated});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar una compañia y todas sus sucursales y sus productos.
exports.deleteCompany = async(req, res)=>{
    try{
        const idCompany = req.params.id;
        const productsOfficesCompanyDeleted = await ProductOffice.deleteMany({idCompany: idCompany});
        const officesCompanyDeleted = await Office.deleteMany({idCompany: idCompany});
        const productsCompanyDeleted = await ProductCompany.deleteMany({idCompany: idCompany});
        const companyDeleted = await Company.findOneAndDelete({_id: idCompany});
        return res.status(200).send({message: "Company deleted", companyDeleted});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver las empresas que existen.
exports.getCompanies = async(req, res)=>{
    try{
        const companiesFound = await Company.find();
        if(companiesFound){
            return res.status(200).send({companiesFound});
        }else{
            return res.status(404).send({message: "Companies not found."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver una compañia
exports.getCompany = async(req, res)=>{
    try{
        const idCompany = req.params.id;
        const companyFound = await Company.findOne({_id: idCompany});
        if(companyFound){
            return res.status(200).send({companyFound});
        }else{
            return res.status(404).send({message: "Company not found."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}



//Función para ver las sucursales de una empresa
exports.getOffices = async(req, res)=>{
    try{
        const idCompany =req.params.id;
        const offices = await Office.find({idCompany: idCompany});
        return res.status(200).send({offices});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver las sucursales de una empresa
exports.getCompanyProducts = async(req, res)=>{
    try{
        const idCompany =req.params.id;
        const companyProducts = await ProductCompany.find({idCompany: idCompany});
        return res.status(200).send({companyProducts});
    }catch(err){
        console.log(err);
        return err;
    }
}




