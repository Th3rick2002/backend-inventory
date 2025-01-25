import {Model} from "sequelize";

export interface IProduct extends Model{
    idProduct: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    idCategory: number;
    idProvider: number;
}