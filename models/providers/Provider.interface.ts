import {Model} from 'sequelize';

export interface IProvider extends Model {
    idProvider: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
}