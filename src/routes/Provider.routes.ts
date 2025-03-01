import {Router} from "express";
import providerController from "../controllers/ProvidersControllers/ProviderController";
import authenticate from "../middlewares/auth/Auth.middleware"
import isAdmin from "../middlewares/verifyUserIsAdmin/isAdmin.middleware"

const providerRouter = Router();

// public routes
providerRouter.get('/public/providers/', authenticate, providerController.getProviders )
providerRouter.get('/public/providers/:id', authenticate, providerController.getProviderById)

// private routes
providerRouter.post('/private/register-provider/', authenticate, isAdmin, providerController.createProvider)

export default providerRouter;