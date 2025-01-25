import {Model} from "sequelize";

export interface IUser extends Model {
    idUser: number;
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
}