import {Router} from 'express';
import userController from "../controllers/UserControllers/UserController";
import authenticate from "../middlewares/auth/Auth.middleware"
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware"
const router = Router();

// Public endpoints
router.post('/auth/public/register',authenticate, isAdmin, userController.userRegister)
router.post('/auth/public/login', userController.login)

// Private endpoints
router.get('/private/user-id/:id', authenticate, userController.getUserById)
router.get('/private/user-list/', authenticate, userController.getListUser)
router.put('/private/update-user/:id', authenticate, userController.updateUserById)
router.delete('/private/delete-user/:id', authenticate, isAdmin, userController.deleteUserById)

export default router;