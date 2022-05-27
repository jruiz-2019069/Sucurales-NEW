'use'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'llave';

exports.createToken = async(user)=>{
    try{
        if(user.role == 'ADMIN'){ //Aquí validamos que el usario que le este llegando sea de tipo ADMIN.
            const payload = {
                sub: user._id,
                name: user.name,
                userAdmin: user.userAdmin,
                passwordAdmin : user.passwordAdmin, //Creamos el token correspondiente para un ADMIN.
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else{
            const payload = {
                sub: user._id,
                name: user.name,
                typeCompany: user.typeCompany,
                location: user.location,
                phone: user.phone,                 //Si el usuario que le esta llegando no es tipo ADMIN es porque le
                email: user.email,                 //está llegando una empresa, entonces creamos el token correspondiente
                userCompany: user.userCompany,     //para una empresa.
                passwordCompany : user.passwordCompany,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}