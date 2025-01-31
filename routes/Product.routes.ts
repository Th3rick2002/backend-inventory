import {Router} from 'express';
import ProductConstroller from "../controllers/ProductControlles/ProductConstroller";
import authenticate from "../middlewares/auth/Auth.middleware";
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware";
import productConstroller from "../controllers/ProductControlles/ProductConstroller";

const productRoutes = Router();

//public routes
productRoutes.get('/public/products/', authenticate, productConstroller.getProducts)
productRoutes.get('/public/products-id/:id', authenticate, productConstroller.getProductById)

//private routes
productRoutes.post('/private/register-product/', authenticate, isAdmin, productConstroller.registerProduct)
productRoutes.put('/private/update-product/:id', authenticate, isAdmin, productConstroller.updateProduct)
productRoutes.delete('/private/delete-product/:id', authenticate, isAdmin, productConstroller.deleteProduct)

export default productRoutes;