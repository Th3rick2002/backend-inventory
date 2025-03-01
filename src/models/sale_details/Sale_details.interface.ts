import {Model} from 'sequelize';

export interface ISaleDetails extends Model{
    idSalesDetails: number;
    quantity: number;
    unitPrice: number;
    idProduct: number;
    idSale: number;
}