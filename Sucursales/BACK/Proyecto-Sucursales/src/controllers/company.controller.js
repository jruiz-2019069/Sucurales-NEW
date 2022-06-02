'use strict'

const Company = require('../models/company.model');
const Admin = require('../models/admin.model');
const Office = require('../models/office.model');
const ProductOffice = require('../models/productOffice.model');
const ProductCompany = require('../models/productCompany.model');
const {dataObligatory, encryptPassword, dencryptPassword} = require('../utils/validate');
const jwt = require('../services/jwt');

exports.testCompanyController = (req, res)=>{
    return res.send({message: 'The function test company controller is running.'})
}

//Con esta función podremos acceder al sistema.
exports.login = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            user: params.user,
            password: params.password
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            let companyFound = await Company.findOne({userCompany: params.user}); //Buscamos a un empresa
            let adminFound = await Admin.findOne({userAdmin: params.user}); //Buscamos un administrador
            if(companyFound && await dencryptPassword(params.password, companyFound.passwordCompany)){ //Aquí verificamos que el usuario que le este llegando sea de una empresa. 
                const token = await jwt.createToken(companyFound); //Creamos el token para una empresa.
                return res.status(200).send({companyFound ,message: 'Entering the system...', token})
            }else if(adminFound && await dencryptPassword(params.password, adminFound.passwordAdmin)){ //Aquí verificamos que el usuario que le este llegando sea un administrador. 
                const token = await jwt.createToken(adminFound); //Creamos el token para un administrador.
                return res.status(200).send({adminFound ,message: 'Entering the system...', token})
            }else{
                return res.status(403).send({message: 'Incorrect username or password'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para actualizar a la empresa que esta logeada.
exports.updateCompanyLoged = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            typeCompany: params.typeCompany,
            location: params.location,
            phone: params.phone,
            email: params.email,
            userCompany: params.userCompany
        }
        const company = await Company.findOne({_id: idCompany});
        const msg = await dataObligatory(data); 
        if(msg){
            return res.status(400).send(msg);
        }else{
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

//Función para eliminar la empresa logeada.
exports.deleteCompany = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const productsOfficesCompanyDeleted = await ProductOffice.deleteMany({idCompany: idCompany});
        const officesCompanyDeleted = await Office.deleteMany({idCompany: idCompany});
        const productsCompanyDeleted = await ProductCompany.deleteMany({idCompany: idCompany});
        const companyDeleted = await Company.findOneAndDelete({_id: idCompany});
        return res.status(200).send({companyDeleted});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para enviarle un producto a una surcursal
exports.addProductOffice = async(req, res)=>{
    try{
        const idCompany = req.params.idCompany;
        const idProductCompany = req.params.idProduct; //Capturamos el id del producto que queremos enviar a la sucursal.
        const idOffice = req.params.idOffice; //Capturamos el id de la oficina al que se enviaran los productos.
        const productCompany = await ProductCompany.findOne({_id: idProductCompany}); //Buscamos el producto que enviaremos.
        const params = req.body;
        const data = {
            name: productCompany.name,
            supplier: productCompany.supplier,
            price: productCompany.price,
            stock: params.stock,
            totalSales: 0,
            idOffice: idOffice,
            idCompany: idCompany
        }
        
        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            if(params.stock <= 0){ //Validamos que el stock que venga no sea negativo.
                return res.status(400).send({message: 'Numbers below zero are not allowed.'}); 
            }else{
                if(params.stock > productCompany.stock){ //Validamos que el stock que envíe no sea mayo al que tienen el producto en la empresa.
                    return res.status(400).send({message: `The stock is: ${productCompany.stock}`});
                }else{
                    const productOffice = await ProductOffice.findOne({name: productCompany.name, idOffice: idOffice});
                    if(productOffice){
                        const stockProductOffice = parseInt(productOffice.stock) + parseInt(params.stock);
                        const productOfficeUpdated = await ProductOffice.findOneAndUpdate({_id: productOffice._id}, {stock: stockProductOffice}, {new:true});
                        const stockProductCompany = productCompany.stock - params.stock;
                        const productCompanyUpdated = await ProductCompany.findOneAndUpdate({_id: idProductCompany}, {stock: stockProductCompany}, {new:true});
                        return res.status(200).send({message: 'Product office created successfully.',productOfficeUpdated});
                    }else{
                        let productOffice = new ProductOffice(data);
                        await productOffice.save();
                        const stockProductCompany = productCompany.stock - params.stock;
                        const productCompanyUpdated = await ProductCompany.findOneAndUpdate({_id: idProductCompany}, {stock: stockProductCompany}, {new:true});
                        return res.status(200).send({message: 'Product office created successfully.'});
                    }
                }
            }
        }
    }catch(err){
        console.log("LLEGO AL ERROR");
        console.log(err);
        return err;
    }
}

//Función para obtener los datos de la empresa logeada.
exports.getCompany = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
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


exports.addTestProductOffice = async(req, res)=>{
    try{
        return res.status(200).send({message: "si llego"});
    }catch(err){
        console.log(err);
        return err;
    }
}