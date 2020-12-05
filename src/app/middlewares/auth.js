import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async(req, res, next) => {


    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided!'});
    }

    const [, token] = authHeader.split(' ');   
    const secret = process.env.SECRET_HASH;
    
    try{
            const decoded = await promisify(jwt.verify)(token, secret);
         // console.log(decoded);
            req.userId = decoded._id;
            return next();
    } catch(err) {
            return res.status(401).json({ error: 'Invalid auth token!'});
    }


    return next();
};