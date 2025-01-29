import express from "express";
import instanceDB from "./config/DBConection";
import userRouter from "./routes/user.routes";
import providerRouter from "./routes/Provider.routes";
import categoryRoutes from "./routes/Category.routes";

import {Category, Product, Provider, Sale_details, Sale, User} from "./models/associations/associations"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/provider', providerRouter);
app.use('/api/category', categoryRoutes);


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
        await User.sync({alter: true});
        await Category.sync({alter:true});
        await Provider.sync({alter:true});
        await Product.sync({alter:true});
        await Sale.sync({alter:true});
        await Sale_details.sync({alter:true});

        console.log("all models synchronized successfully.");

    }catch (e){
        console.error("Server Error:", e);
    }
}

export function startServer(){
    app.listen(port, () => {
        console.log('Server started on port', port);
    })

    //testConnectionDB()
    //syncModel()
}