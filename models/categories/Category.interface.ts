import {Model} from 'sequelize';

export interface ICategory extends Model{
    idCategory: number;
    name: string;
}