import {Response, Request, NextFunction} from 'express';
import { Category } from "../models/Category"

export const getCategory= function(req: Request, res: Response, next: NextFunction){
    Category.findAll()
    .then((categories) => {
        res.send(categories);
    })
    .catch((error) => next(error));
}

export const postCategory= function(req: Request, res: Response, next: NextFunction){
    const category = req.body;
    Category.create(category)
    .then((createdCategory) => {
        res.send(createdCategory);
    })
    .catch((error) => next(error));
}

export const updateCategory = function(req: Request, res: Response, next: NextFunction){
    const data = req.body;
    const id = req.params;
    
}