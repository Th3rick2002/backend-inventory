import {DataTypes} from "sequelize";
import {ISaleDetails} from "./Sale_details.interface";
import instanceDB from "../../config/DBConection";

export const Sale_details = instanceDB.getSequelizeInstance().define<ISaleDetails>(
    "Sale_details",
    {
        idSalesDetails:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        unitPrice:{
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        idProduct:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idSale: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'sale_details',
    }
)