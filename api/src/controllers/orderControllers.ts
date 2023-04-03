import {Response, Request, NextFunction} from 'express';
import { Order } from "../models/Order"

export const getOrder = async (req:Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try{
        if(id){
            const idOrder = await Order.findByPk(id)
            idOrder?
            res.send(idOrder):
            res.send(`Order ID: ${id} not found`)      
        }
        else{
            Order.findAll()
             .then((findOrder) => {
               res.send(findOrder);
            })
            .catch((error) => next(error));   
        } 
    }catch (error) {
        res.status(400).json( error)
    }
        
}

export const postOrder= function(req: Request, res: Response, next: NextFunction){
    const order = req.body;
    try{
        Order.create(order)
      .then((createdOrder) => {
        res.status(200).json({message:"orden creada con éxito.", createdOrder });
      })
      .catch((error) => next(error));
    }
    catch(error){
        res.status(400).json(error)
    }
}

export const delOrder = async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    if(id){
        const delOrder = await Order.findByPk(id)
        Order.destroy(
            {
                where:
                { id }
            })
        delOrder ?
        res.send(delOrder) :
        res.send("Order not found")
    }
    else {
        res.send("ingrese el id de la orden a eliminar")
    }
}

export const updateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const { list, delivery, status } = req.body;
        Order.findByPk(id)
        .then((order) => {
            if(order){
                order.list = list || order.list;
                order.delivery = delivery || order.delivery;
                order.status = status || order.status;
              order.save()
                .then((updated) => {
                    res.status(200).send(updated);
                });
            } else {
                res.status(404).send(`Orden con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
  }