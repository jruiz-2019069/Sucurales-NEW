'use strict'

const ProductCompany = require('../models/productCompany.model');
const {dataObligatory} = require('../utils/validate');

exports.testProductCompanyController = (req, res)=>{
    return res.send({message: 'The function test product company controller is running.'});
}

//Función para agregar un producto a una empresa
exports.addProductCompany = async(req, res)=>{
    try{
        const idCompany = req.params.id;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            supplier: params.supplier,
            price: params.price,
            stock: params.stock,
            idCompany: idCompany
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            const productCompanyFound = await ProductCompany.findOne({name: params.name.toUpperCase(), idCompany: idCompany});
            if(productCompanyFound){
                return res.status(400).send({message: "This product already exist."});
            }else{
                if(params.stock < 0 || params.price < 0){
                    return res.status(400).send({message: 'Numbers below zero are not allowed.'});
                }else{
                    let productCompany = new ProductCompany(data);
                    await productCompany.save();
                    return res.status(200).send({message: "Product created successfully."});
                }
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para actualizar el producto de una empresa
exports.updateProductCompany = async(req, res)=>{
    try{
        const idProductCompany = req.params.id;
        const idCompany = req.user.sub;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            supplier: params.supplier,
            price: params.price,
            stock: params.stock,
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            const productCompany = await ProductCompany.findOne({_id: idProductCompany});
            if(productCompany.name !=  params.name.toUpperCase()){
                const productCompanyFound = await ProductCompany.findOne({name: params.name.toUpperCase(), idCompany: idCompany});
                if(productCompanyFound){
                    return res.status(400).send({message: 'This product already exist.'});
                }else{
                    const productCompanyUpdated = await ProductCompany.findOneAndUpdate({_id: idProductCompany}, data, {new:true});
                    return res.status(200).send({message: "Product updated", productCompanyUpdated});
                }
            }else{
                const productCompanyUpdated = await ProductCompany.findOneAndUpdate({_id: idProductCompany}, data, {new:true});
                    return res.status(200).send({message: "Product updated", productCompanyUpdated});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para eliminar un producto de una empresa
exports.deleteProductCompany = async(req, res)=>{
    try{
        const idProductCompany = req.params.id;
        const productCompanyDeleted = await ProductCompany.findOneAndDelete({_id: idProductCompany});
        return res.status(200).send({message: "Product deleted successfully.", productCompanyDeleted});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver los productos de una empresa
exports.getProductsCompany = async(req, res)=>{
    try{
        const idCompany = req.params.id;
        const productsCompany = await ProductCompany.find({idCompany: idCompany});
        return res.status(200).send({productsCompany});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ver un producto de una empresa
exports.getProductCompany = async(req, res)=>{
    try{
        const idProductCompany = req.params.id;
        const productCompany = await ProductCompany.findOne({_id: idProductCompany});
        return res.status(200).send({productCompany});
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para buscar productos por el stock (Pendiente, preguntar al profe)


//Función para buscar productos de la empresa por el nombre
exports.searchProductsCompany = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const params = req.body;
        const searchProductsCompany = await ProductCompany.find({name: {$regex: params.name.toUpperCase(), $options: 'i'}, idCompany: idCompany});
        if(Object.entries(searchProductsCompany).length >= 1){
            return res.status(200).send({searchProductsCompany});
        }else{
            return res.status(404).send({message: "There are no products to show."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para buscar productos de una empresa por proveedor
exports.searchProductsCompanyBySupplier = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const params = req.body;
        const searchProductsCompany = await ProductCompany.find({supplier: {$regex: params.supplier.toUpperCase(), $options: 'i'}, idCompany: idCompany});
        if(Object.entries(searchProductsCompany).length >= 1){
            return res.status(200).send({searchProductsCompany});
        }else{
            return res.status(404).send({message: "There are no products to show with this supplier."});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Función para ordenar los products por mayor y menor stock
exports.sortProductsCompanyByLargerStock = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const productsLargerStock = await ProductCompany.find({idCompany: idCompany}).sort({stock:-1});
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
exports.sortProductsCompanyByRetailStock = async(req, res)=>{
    try{
        const idCompany = req.user.sub;
        const productsRetailStock = await ProductCompany.find({idCompany: idCompany}).sort({stock:1});
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



