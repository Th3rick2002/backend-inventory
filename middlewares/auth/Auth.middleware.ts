import jwt from "jwt-simple";
import {jwtSecret} from "../../services/auth/jwt.service";
import moment from "moment";
import {Request, Response, NextFunction} from "express";

interface Authentication extends Request{
    user?: any
}

const authenticate = (req: Authentication, res: Response, next: NextFunction) => {
    try{
        if(!req.headers.authorization){
            res.status(401).json({message:"Unauthorized", status:false});
            return;
        }

        //let token = req.headers.authorization.replace(/['"]+/g, '')
        let token = req.headers.authorization.split(' ')[1];
        if(!jwtSecret){
            res.status(401).json({message:"JWT_SECRET no defined", status:false});
            return;
        }
        let payload = jwt.decode(token, jwtSecret)
        if(payload.exp < moment().unix()){
            res.status(401).json({message:"Token has expired", status:false});
            return;
        }
        req.user = payload;
        next()
    }catch(err){
        res.status(401).json({message:"Unauthorized", status:false, error:err});
    }
}

export default authenticate;