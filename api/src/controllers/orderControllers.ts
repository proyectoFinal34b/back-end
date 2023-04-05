import {Response, Request, NextFunction} from 'express';
import { Order } from "../models/Order"
import { User } from '../models/User';
import { Product } from '../models/Product';

export const getOrder = async (req:Request, res: Response, next: NextFunction)=>{
    try{
            Order.findAll()
             .then((findOrder) => {
               res.send(findOrder);
            })
            .catch((error) => next(error));   
        
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

export const getOrderById = async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try{
        const order = await Order.findByPk(id)

        if(!order){
         res.send(` La orden de ID ${id} no se ha encontrado`)    
        }

        const productList = [];
    
        if (order?.list) {
            for (const item of order.list) {
              const product = await Product.findByPk(item);
              if (product) {
                productList.push(product);
              }
            }
          }

        res.status(200).send({ ...order?.dataValues, list: productList })
         
    }catch (error) {
        res.status(400).json( error)
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

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { idAdmin } = req.params;
    const { list, delivery, status } = req.body;
    try {
        const admin = await User.findByPk(idAdmin)
        if(admin?.status==="admin" || admin?.status==="superAdmin"){
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
        } else {
            res.status(400).json("No tienes permiso para realizar esa acción")
        }
        

    } catch (error) {
        res.status(400).json(error);
    }
  }