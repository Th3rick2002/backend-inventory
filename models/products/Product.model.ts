import {DataTypes} from "sequelize";
import {IProduct} from "./Product.interface";
import instanceDB from "../../config/DBConection";

export const Product = instanceDB.getSequelizeInstance().define<IProduct>(
    "Product",
    {
        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idCategory: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idProvider: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'products',
    }
)