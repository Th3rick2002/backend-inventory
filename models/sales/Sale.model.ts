import {DataTypes} from "sequelize"
import {ISale} from "./Sale.interface"
import instanceDB from "../../config/DBConection";

export const Sale = instanceDB.getSequelizeInstance().define<ISale>(
    "Sale",
    {
        idSale: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        tableName: 'sales',
    }
)