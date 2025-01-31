import {Request, Response, NextFunction} from 'express';
import {Category} from "../../models/categories/Category.model";
import {Provider} from "../../models/providers/Provider.model";
import {Product} from "../../models/products/Product.model";
import {ProductValidations} from "./ProductsValidations";

class productController {
    async registerProduct(req: Request, res: Response, next: NextFunction) {
        try{
            const {name, description, price, stock, idCategory, idProvider} = req.body;
            ProductValidations.validationProduct(name, description, price, stock, idCategory, idProvider);

            const category= await Category.findOne({where: {idCategory}})
            if(!category){
                res.status(404).json({
                    status: false,
                    message: 'Category not found'
                });
                return;
            }

            const provider = await Provider.findOne({where: {idProvider}})
            if(!provider){
                res.status(404).json({
                    status: false,
                    message: 'Provider not found'
                })
                return;
            }

            let newProduct = {
                name: name,
                description: description,
                price: price,
                stock: stock,
                idCategory: idCategory,
                idProvider: idProvider
            }

            await Product.create(newProduct)
            res.status(201).json({
                status: true,
                message: 'Product created',
            })
        }catch(error){
            next(error)
        }
    }

    async getProducts(req: Request, res: Response) {
        try{
            const products = await Product.findAll({
                include: [
                    {model: Category},
                    {model: Provider}
                ]
            })

            if(!products){
                res.status(404).json({
                    status: false,
                    message: 'Products not found'
                })
                return;
            }

            res.status(200).json({
                status: true,
                products: products,
                message: 'Products found'
            })
        }catch(err){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: err
            })
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try{
            const idProduct = req.params.id;

            ProductValidations.validationId(parseInt(idProduct));
            const product = await Product.findOne({
                include: [
                    {model: Category},
                    {model: Provider}
                ],
                where: {idProduct}
            })

            if(!product){
                res.status(404).json({
                    status: false,
                    message: 'Products not found'
                })
                return;
            }

            res.status(200).json({
                status: true,
                products: product,
                message: 'Products found'
            })
        }catch(error){
            next(error)
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try{
            const {idProduct} = req.params;
            const {name, description, price, stock, idCategory, idProvider} = req.body;

            ProductValidations.validationId(parseInt(idProduct));
            ProductValidations.validationProduct(name, description, price, stock, idCategory, idProvider);

            const product = await Product.findOne({where: {idProduct}})
            if(!product){
                res.status(404).json({
                    status: false,
                    message: 'Product not found'
                })
                return;
            }

            let updateProduct = {
                name: name,
                description: description,
                price: price,
                stock: stock,
                idCategory: idCategory,
                idProvider: idProvider
            }

            await Product.update(
                updateProduct,
                {where: {idProduct}}
            )

            res.status(200).json({
                status: true,
                message: 'Product updated'
            })
        }catch(error){
            next(error)
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try{
            const {idProduct} = req.params;
            ProductValidations.validationId(parseInt(idProduct));

            const product = await Product.findOne({where: {idProduct}})
            if(!product){
                res.status(404).json({
                    status: false,
                    message: 'Product not found'
                })
                return;
            }

            await Product.destroy({where: {idProduct}})
            res.status(200).json({
                status: true,
                message: 'Product deleted'
            })
        }catch(error){
            next(error)
        }
    }
}

export default new productController();