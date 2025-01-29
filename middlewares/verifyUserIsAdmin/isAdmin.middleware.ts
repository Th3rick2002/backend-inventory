import {Request, Response, NextFunction} from "express";

interface Authentication extends Request{
    user?: any
}

const isAdmin = (req: Authentication, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        if (!user || !user.role) {
            res.status(403).json({
                status: false,
                message: "User information is missing or invalid",
            });
            return;
        }

        if(user.role !== 'admin'){
            res.status(403).json({
                status: false,
                message: 'You don\'t have enough permissions',
            })
            return;
        }
        next()
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Error in the server",
            error: err,
        });
    }
}

export default isAdmin