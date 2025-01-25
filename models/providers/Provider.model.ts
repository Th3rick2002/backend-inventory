import {DataTypes} from "sequelize";
import {IProvider} from "./Provider.interface";
import instanceDB from "../../config/DBConection";

export const Provider = instanceDB.getSequelizeInstance().define<IProvider>(
    'Provider',
    {
        idProvider: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'providers',
    }
)