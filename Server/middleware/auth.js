import  jwt  from "jsonwebtoken";
import ENV from  '../config.js';
import UserModel from "../model/User.model.js";


// auth middleware 
export default async function Auth(req, res, next){
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(new Error('Acces refusé'))
    }
    console.log('je suis ici');
    try {
        console.log('je suis ici 1', token);
        const decodedToken =  jwt.verify(token, 'Mouhamed10-');

        console.log('louga', decodedToken);
        req.user = await UserModel.findById(decodedToken.userId);

        console.log('joe', req.user);

        // res.json (decodedToken);  
        next();

    } catch (error) {
        res.status(401).json({ error : "Authentification Failed"})
    }
}


export function localVariables(req, res, next){
          req.app.locals = {
            OTP : null, 
            resetSession : false 
          }
          next()
}