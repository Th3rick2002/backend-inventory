import express from "express";
import instanceDB from "./config/DBConection";
import router from "./routes/routes";
import {Sequelize} from "sequelize";
import {Category, Product, Provider, Sale_details, Sale, User} from "./models/associations/associations"

const app = express();
const port = process.env.PORT || 3000;
const sequelize: Sequelize = instanceDB.getSequelizeInstance()

app.use(express.json());
app.use('/api', router);

const testConnectionDB = async () => {
    try
    {
        await instanceDB.testConnectDatabase()
        console.log('Connection database successfully')
    }catch(err){
        console.log(`Error: ${err}`);
    }
}

const syncModel = async () => {
    try{
        //await sequelize.sync({force: true});
        await User.sync({force: true});
        await Category.sync({force:true});
        await Provider.sync({force:true});
        await Product.sync({force:true});
        await Sale.sync({force:true});
        await Sale_details.sync({force:true});
        await sequelize.getQueryInterface().showAllTables()
            .then(tables => {
                console.log(`Tables: ${tables}`);
            })
            .catch(err => {
                console.log(`Error fetching tables: ${err}`);
            })
        console.log("all models synchronized successfully.");

    }catch (e){
        console.error("Server Error:", e);
    }
}

export function startServer(){
    app.listen(port, () => {
        console.log('Server started on port', port);
    })

    testConnectionDB()
    syncModel()
}