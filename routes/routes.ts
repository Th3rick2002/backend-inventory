import {Router} from 'express';

const router = Router();

router.get('/', ()=>{
    console.log("BIENVENIDO A LA API")
});

export default router;