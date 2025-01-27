import {Router} from 'express';
import userController from "../controllers/UserControllers/UserController";
import authenticate from "../middlewares/auth/Auth.middleware"
const router = Router();


// Public endpoints
router.post('/auth/public/register', userController.userRegister)
router.post('/auth/public/login', userController.login)

// Private endpoints
router.get('/private/user-id/:id', authenticate, userController.getUserById)

export default router;