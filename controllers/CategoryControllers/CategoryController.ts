import {Request, Response, NextFunction} from "express";
import {Category} from "../../models/categories/Category.model";

class CategoryController {
    async getCategories(req: Request, res: Response){
        try{
            const categories = await Category.findAll({
                attributes: ['name'],
            })

            if (!categories){
                res.status(404).json({
                    status: false,
                    message: "No Categories Found"
                })
                return;
            }

            res.status(200).json({
                status: true,
                data: categories,
                message: "Categories found"
            })
        }catch(err){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: err
            })
        }
    }

    async createCategory(req: Request, res: Response){
        try{
            const {name} = req.body;
            const category = await Category.findOne({where: {name}})

            if (category){
                res.status(400).json({
                    status: false,
                    message: "Category already exists"
                })
            }

            const newCategory = {
                name: name
            }

            await Category.create(newCategory)
            res.status(201).json({
                status: true,
                message: "Category created"
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

export default new CategoryController();