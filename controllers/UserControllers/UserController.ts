import {Request, Response} from 'express';
import bcrypt from "bcryptjs"
import {User} from "../../models/users/User.model"
import {Auth} from "../../services/auth/jwt.service";

class UserController{
    async userRegister(req: Request, res: Response){
        try{
            const {firstName, lastName, email, password} = req.body;

            const userFind = await User.findOne({where: {email}})
            if(userFind){
                res.status(403).json({message:"User already exists"})
                return;
            }

            let newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: "user",
            }

            newUser.password = await bcrypt.hash(password, 10);

            await User.create(newUser);
            res.status(201).json({
                message: "User created successfully"
            });
        }catch(err){
             res.status(400).json({
                status: false,
                message: "Process failed",
            })
        }
    }


    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const findUser = await User.findOne({where: {email}})

            if(!findUser){
                res.status(403).json({message:"User not found"})
                return;
            }

            const verifyPassword = await bcrypt.compare(password, findUser.password);

            if(!verifyPassword){
                res.status(401).json({status: false ,message:"Invalid Password"})
                return;
            }

            const user = {
                idUser: findUser.idUser.toString(),
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                email: findUser.email,
                password: findUser.password,
                role: findUser.role,
            }

            const jwtLogin = Auth(user)
            res.status(200).json({
                status: true,
                message: "Login Success",
                user,
                token: jwtLogin
            })
        }catch(err){
            res.status(401).json(
                {
                    status: false ,
                    message:"Invalid Login"
                }
            )
        }
    }

    async getUserById(req: Request, res: Response){
        try{
            const {id} = req.params
            const usersData = await User.findOne({
                attributes: ['firstName','lastName', 'email'],
                where: {idUser: id}
            })
            res.status(200).json({
                status: true,
                usersData,
                message: "User found",
            })
        }catch(err){
            res.status(404).json({status: false ,message:"User no found"})
        }
    }

    async getListUser(req: Request, res: Response){

    }

    async updateUserById(req: Request, res: Response){

    }

    async deleteUserById(req: Request, res: Response){

    }
}

export default new UserController();