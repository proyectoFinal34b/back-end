import { Router, response } from 'express';
import {Response, Request} from 'express';

import {dbCat} from "../utils"
import { Cat } from '../models/Cat';

const router: Router= Router()

router.post("/", (req:Request, res:Response)=>{
    
try {
    const resp= dbCat.map(async (x)=>{
        await Cat.findOrCreate<Cat>(
            {where:
                {
                    name: x.name,
                    description: x.description,
                    gender: x.gender,
                    state:x.state,
                    age:x.age,
                    image:x.image,
                    arrived:x.arrived
                }
            })
        })
        return res.status(200).json("La info se guardo en la DB.")
} catch (error:any) {
    response.send({error:error.message})
}
})    
export default router;