import {Response, Request, NextFunction} from 'express';
import { sequelize } from '../db';
import { Product } from "../models/Product"

export const getProduct= function(req: Request, res: Response, next: NextFunction){
    Product.findAll({
        include: sequelize.models.Rating
      })
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