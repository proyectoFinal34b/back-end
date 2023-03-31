import {Response, Request, NextFunction} from 'express';
import { sequelize } from '../db';
import { Product } from "../models/Product"
import { Rating } from '../models/Rating';

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


export const postRating = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const ratingData = req.body;
    ratingData.productId = productId;
  
    Rating.create(ratingData)
      .then((createdRating) => {
        res.send(createdRating);
      })
      .catch((error) => next(error));
  };