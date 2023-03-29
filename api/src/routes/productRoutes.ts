import {Response, Request, Router, NextFunction} from 'express';
import {Product} from "../models/Product"

const router: Router= Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    Product.findAll()
        .then((Products) => {
            res.send(Products);
        })
        .catch((error) => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;
    Product.create(product)
        .then((createdProduct) => {
            res.send(createdProduct);
        })
        .catch((error) => next(error))
   });


export default router;