import {DataTypes} from "sequelize";
import {ICategory} from "./Category.interface";
import instanceDB from "../../config/DBConection";

export const Category = instanceDB.getSequelizeInstance().define<ICategory>(
    "Category",
    {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'categories',
    }
)

