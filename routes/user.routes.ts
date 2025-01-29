import {Router} from 'express';
import userController from "../controllers/UserControllers/UserController";
import authenticate from "../middlewares/auth/Auth.middleware"
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware"
const userRouter = Router();

// Public endpoints
userRouter.post('/auth/public/register',authenticate, isAdmin, userController.userRegister)
userRouter.post('/auth/public/login', userController.login)

// Private endpoints
userRouter.get('/private/user-id/:id', authenticate, userController.getUserById)
userRouter.get('/private/user-list/', authenticate, userController.getListUser)
userRouter.put('/private/update-user/:id', authenticate, userController.updateUserById)
userRouter.delete('/private/delete-user/:id', authenticate, isAdmin, userController.deleteUserById)

export default userRouter;