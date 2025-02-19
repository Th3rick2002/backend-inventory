import {Request, Response, NextFunction} from "express";
import {Category} from "../../models/categories/Category.model";
import {CategoryValidations} from "./CategoryValidations";

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
            CategoryValidations.validationName(name)
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

    async getCategoryById(req: Request, res: Response){
        try{
            const {id} = req.params
            CategoryValidations.validationId(parseInt(id))
            const category = await Category.findOne({where: {id}})

            if (!category){
                res.status(404).json({
                    status: false,
                    message: "No Category Found"
                })
                return;
            }

            res.status(200).json({
                status: true,
                category,
                message: "Category found"
            })
        }catch (error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }

    async updateCategory(req: Request, res: Response){
        try{
            const {id} = req.params
            const {name} = req.body
            CategoryValidations.validationId(parseInt(id))
            CategoryValidations.validationName(name)

            const category = await Category.findOne({where: {id}})

            if (!category){
                res.status(404).json({
                    status: false,
                    message: "No Category Found"
                })
            }

            const newCategory = {
                name: name
            }

            await Category.update(
                newCategory,
                {where: {id}}
            )

            res.status(200).json({
                status: true,
                message: "Category updated"
            })
        }catch (error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }

    async deleteCategory(req: Request, res: Response){
        try{
            const {id} = req.params
            CategoryValidations.validationId(parseInt(id))
            const findCategory = await Category.findOne({where: {id}})

            if (!findCategory){
                res.status(404).json({
                    status: false,
                    message: "No Category Found"
                })
            }

            await Category.destroy({where: {id}})
            res.status(200).json({
                status: true,
                message: "Category deleted"
            })
        }catch (error){
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error
            })
        }
    }
}

export default new CategoryController();