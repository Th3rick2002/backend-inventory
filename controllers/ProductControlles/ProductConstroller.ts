import {Request, Response, NextFunction} from 'express';
import {Category} from "../../models/categories/Category.model";
import {Provider} from "../../models/providers/Provider.model";
import {Product} from "../../models/products/Product.model";
import {IProductValidation} from "./IProductValidation.interface";
import {ProductValidations} from "./ProductsValidations"

class productController {
    async registerProduct(req: Request, res: Response) {
        try{
            const product = req.body as IProductValidation;
            ProductValidations.validationProduct(product);

            const category= await Category.findOne({where: {idCategory: product.idCategory}})
            if(!category){
                res.status(404).json({
                    status: false,
                    message: 'Category not found'
                });
                return;
            }

            const provider = await Provider.findOne({where: {idProvider: product.idProvider}})
            if(!provider){
                res.status(404).json({
                    status: false,
                    message: 'Provider not found'
                })
                return;
            }

            const newProduct = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                idCategory: product.idCategory,
                idProvider: product.idProvider

            }

            await Product.create({newProduct})
            res.status(201).json({
                status: true,
                message: 'Product created',
            })
        }catch(err){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: err
            })
        }
    }
}

export default new productController();