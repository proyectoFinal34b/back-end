import {Response, Request, NextFunction} from 'express';
import { Order } from "../models/Order"

export const getOrder= function(req: Request, res: Response, next: NextFunction){
    Order.findAll()
    .then((orders) => {
        res.send(orders);
    })
    .catch((error) => next(error));
    
}

export const postOrder= function(req: Request, res: Response, next: NextFunction){
    const order = req.body;
    Order.create(order)
    .then((createdOrder) => {
        res.send(createdOrder);
    })
    .catch((error) => next(error));
}