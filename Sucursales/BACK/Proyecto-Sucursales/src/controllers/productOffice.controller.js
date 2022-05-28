'use strict'

const ProductOffice = require('../models/productOffice.model');

exports.testProductOfficeController = (req, res)=>{
    try{
        return res.send({message: 'The function test product office controller is running.'});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver los productos de una sucursal
exports.getProductsOffice = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const productsOffice = await ProductOffice.find({idOffice: idOffice});
        return res.status(200).send({productsOffice});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un producto de una sucursal
exports.getProductOffice = async(req, res)=>{
    try{
        try{
            const idProductOffice = req.params.id;
            const productOffice = await ProductOffice.findOne({_id: idProductOffice});
            return res.status(200).send({productOffice});
        }catch(err){
            console.log(err);
            return err;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para buscar productos de la sucursal por el nombre
exports.searchProductsOffice = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const params = req.body;
        const searchProductsOffice = await ProductOffice.find({name: {$regex: params.name.toUpperCase(), $options: 'i'}, idOffice: idOffice});
        if(Object.entries(searchProductsOffice).length >= 1){
            return res.status(200).send({searchProductsOffice});
        }else{
            return res.status(404).send({message: "There are no products to show."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para buscar productos de una empresa por proveedor
exports.searchProductsOfficeBySupplier = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const params = req.body;
        const searchProductsOffice = await ProductOffice.find({supplier: {$regex: params.supplier.toUpperCase(), $options: 'i'}, idOffice: idOffice});
        if(Object.entries(searchProductsOffice).length >= 1){
            return res.status(200).send({searchProductsOffice});
        }else{
            return res.status(404).send({message: "There are no products to show with this supplier."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ordenar los products por mayor y menor stock
exports.sortProductsOfficeByLargerStock = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const productsLargerStock = await ProductOffice.find({idOffice: idOffice}).sort({stock:-1});
        if(productsLargerStock){
            return res.status(200).send({productsLargerStock});
        }else{
            return res.status(404).send({message: "There are no products to show with this supplier."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ordenar los productos de menor a mayor por el stock
exports.sortProductsOfficeByRetailStock = async(req, res)=>{
    try{
        const idOffice = req.params.id;
        const productsRetailStock = await ProductOffice.find({idOffice: idOffice}).sort({stock:1});
        if(productsRetailStock){
            return res.status(200).send({productsRetailStock});
        }else{
            return res.status(404).send({message: "There are no products to show with this supplier."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
