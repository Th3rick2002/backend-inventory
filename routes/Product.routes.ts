import {Router} from 'express';
import ProductConstroller from "../controllers/ProductControlles/ProductConstroller";
import authenticate from "../middlewares/auth/Auth.middleware";
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware";
import productConstroller from "../controllers/ProductControlles/ProductConstroller";

const productRoutes = Router();

//private routes
productRoutes.post('/private/register-product/', authenticate, isAdmin, productConstroller.registerProduct)


export default productRoutes;