import {DataTypes} from 'sequelize';
import {IUser} from "./User.interface"
import instanceDB from "../../config/DBConection";

export const User = instanceDB.getSequelizeInstance().define<IUser>(
    "User",
    {
        idUser: {
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
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'users',
    }
)