import {Response, Request, NextFunction} from 'express';
import { Product } from "../models/Product"

export const getProduct= function(req: Request, res: Response, next: NextFunction){
    Product.findAll()
    .then((products) => {
        res.send(products);
    })
    .catch((error) => next(error));
}

export const postProduct= function(req: Request, res: Response, next: NextFunction){
    const product = req.body;
    Product.create(product)
    .then((createdProduct) => {
        res.send(createdProduct);
    })
    .catch((error) => next(error));
}