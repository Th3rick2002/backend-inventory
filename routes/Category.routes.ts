import {Router} from 'express';
import authenticate from "../middlewares/auth/Auth.middleware";
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware";
import categoryController from "../controllers/CategoryControllers/CategoryController";

const categoryRouter = Router();

//public routes
categoryRouter.get('/public/categories/', authenticate, categoryController.getCategories)
categoryRouter.get('/public/categories-id/:id', authenticate, categoryController.getCategoryById)

//private routes
categoryRouter.post('/private/register-category/', authenticate, isAdmin, categoryController.createCategory);
categoryRouter.post('/private/update-category/', authenticate, isAdmin, categoryController.updateCategory);
categoryRouter.post('/private/delete-category/', authenticate, isAdmin, categoryController.deleteCategory);

export default categoryRouter;