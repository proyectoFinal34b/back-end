import {Response, Request, Router, NextFunction} from 'express';
import {Category} from "../models/Category"

const router: Router= Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    Category.findAll()
        .then((Categories) => {
            res.send(Categories);
        })
        .catch((error) => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const category = req.body;
    Category.create(category)
        .then((createdCategory) => {
            res.send(createdCategory);
        })
        .catch((error) => next(error))
   });


export default router;