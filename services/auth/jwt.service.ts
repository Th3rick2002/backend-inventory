import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from "dotenv";
dotenv.config();

export interface IUserJWT {
    idUser: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    iat?: number;
    exp?: number;
}

const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret){
    throw new Error('JWT_SECRET secret must be set');
}

export const Auth = (user:IUserJWT) =>{
    const payload = {
        idUser:user.idUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix(),
    }

    return jwt.encode(payload, jwtSecret);
}

export {jwtSecret}