import {Model} from 'sequelize';

export interface ISale extends Model{
    idSale: number;
    idUser: number;
    dateCreated: Date;
}