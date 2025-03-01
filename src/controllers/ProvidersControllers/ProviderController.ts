import {Request, Response} from "express";
import {Provider} from "../../models/providers/Provider.model";

class ProviderController {
    async getProviders(req: Request, res: Response){
        try{
            const providers =await Provider.findAll({
                attributes: ['idProvider', 'firstName', 'lastName', 'email'],
            })
            if (!providers){
                res.status(404).json({
                    status: false,
                    message: "No Providers Found"
                });
                return;
            }

            res.status(200).json(providers);
        }catch (error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }

    async getProviderById(req: Request, res: Response){
        try{
            const {id} = req.params
            const provider = await Provider.findOne({
                attributes: ['idProvider', 'firstName', 'lastName', 'email'],
                where: {id}
            })

            if (!provider){
                res.status(404).json({
                    status: false,
                    message: "No Provider Found"
                })
                return;
            }

            res.status(200).json({
                status: true,
                provider,
                message: "Provider found"
            });
        }catch(error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }

    async createProvider(req: Request, res: Response){
        try{
            const {firstName, lastName, email, address} = req.body;

            const provider = await Provider.findOne({where: {email}})

            if (provider){
                res.status(400).json({
                    status: false,
                    message: "Provider already exists"
                })
                return;
            }

            const newProvider = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
            }

            await Provider.create(newProvider)
            res.status(201).json({
                status: true,
                message: "Provider created"
            })
        }catch(error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }
}

export default new ProviderController();