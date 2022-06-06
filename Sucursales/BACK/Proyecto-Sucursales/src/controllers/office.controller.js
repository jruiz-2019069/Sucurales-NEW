'use strict'

const Office = require('../models/office.model');
const ProductOffice = require('../models/productOffice.model');
const {dataObligatory, encryptPassword, dencryptPassword} = require('../utils/validate');

exports.testOfficeController = (req, res)=>{
    return res.send({message: 'The function test office controller is running.'});
}

//Función para crear una sucursal de una empresa
exports.addOffice = async(req, res)=>{
    try{
        const idCompany = req.params.idCompany;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            direction: params.direction,
            phone: params.phone,
            email: params.email,
            idCompany: idCompany
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            const officeFound = await Office.findOne({name: params.name.toUpperCase(), idCompany: idCompany});
            if(officeFound){
                return res.status(400).send({message: "This office already exist."});
            }else{
                let office = new Office(data);
                await office.save();
                return res.status(200).send({message: "Office created successfully."});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para editar una sucursal
exports.updateOffice = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const idCompany = req.user.sub
        const params =req.body;
        const data = {
            name: params.name.toUpperCase(),
            direction: params.direction,
            phone: params.phone,
            email: params.email,
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send(msg);
        }else{
            const office = await Office.findOne({_id:idOffice});
            if(office.name != params.name.toUpperCase()){
                const officeFound = await Office.findOne({name: params.name.toUpperCase(), idCompany: idCompany});
                if(officeFound){
                    return res.status(400).send({message: 'This office already exist.'});
                }else{
                    const officeUpdated = await Office.findOneAndUpdate({_id: idOffice}, data, {new:true});
                    return res.status(200).send({message: "Office updated", officeUpdated});
                }
            }else{
                const officeUpdated = await Office.findOneAndUpdate({_id: idOffice}, data, {new:true});
                return res.status(200).send({officeUpdated});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar una sucursal de una empresa
exports.deleteOffice = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const officeDeleted = await Office.findOneAndDelete({_id: idOffice});
        const productsOfficeDeleted = await ProductOffice.deleteMany({idOffice: idOffice});
        return res.status(200).send({message: "Office deleted", officeDeleted});
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

//Función para ver una sucursal de una empresa
exports.getOffice = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const office = await Office.findOne({_id: idOffice});
        if(office){
            return res.status(200).send({office});
        }else{
            return res.status(404).send({message: "There is not offices to show."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para buscar sucursales mediante el nombre
exports.searchOffices = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const params = req.body;
        const searchOffices = await Office.find({name: {$regex: params.name.toUpperCase(), $options: 'i'}, idCompany: idCompany});
        if(Object.entries(searchOffices).length >= 1){
            return res.status(200).send({searchOffices});
        }else{
            return res.status(404).send({message: "There are no offices to show."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para simular una compra de un producto
exports.sellProduct = async(req, res)=>{
    try{    
        const idProduct = req.params.id;
        const params = req.body;
        const data = {
            stock: params.stock
        }
        const msg = await dataObligatory(data);
        const product = await ProductOffice.findOne({_id: idProduct});
        if(msg){
            return res.status(400).send(msg);
        }else{
            if(params.stock > product.stock || params.stock == 0){
                return res.status(400).send({message: `The stock is: ${product.stock}`});
            }else{
                const stockUpdated = product.stock - params.stock;
                const totalSalesUpdated = parseInt(product.totalSales) + parseInt(params.stock);
                const productUpdated = await ProductOffice.findOneAndUpdate({_id:idProduct}, {stock: stockUpdated, totalSales: totalSalesUpdated}, {new:true});
                return res.status(200).send({message: "Successful sale", productUpdated});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}