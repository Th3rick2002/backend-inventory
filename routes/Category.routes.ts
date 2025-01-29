import {Router} from 'express';
import CategoryController from "../controllers/CategoryControllers/CategoryController";
import authenticate from "../middlewares/auth/Auth.middleware";
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware";
import categoryController from "../controllers/CategoryControllers/CategoryController";

const categoryRouter = Router();

//public routes
categoryRouter.get('/public/categories/', authenticate, categoryController.getCategories)

//private routes
categoryRouter.post('/private/register-category/', authenticate, isAdmin, categoryController.createCategory);

export default categoryRouter;