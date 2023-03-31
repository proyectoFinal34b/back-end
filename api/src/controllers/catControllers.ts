import {Response, Request, Router, NextFunction} from 'express';
import { Cat } from '../models/Cat';

 export const getCatByName =(req:Request, res: Response, next: NextFunction)=>{
    const{ name } = req.query
    try {
        if(!name){
            Cat.findAll()
            .then((findCat) => {
                res.send(findCat);
   })
   .catch((error) => next(error));
        }
        else{
            res.send(`Cat ${name} no encontrado`)
        }
    } catch (error) {
        res.status(400).json( error)
    }
 }

 export const getCatById= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try {
        if(id){
            const idCat = await Cat.findByPk(id)
            idCat ?
            res.send(idCat) :
            res.send(`Cat id: ${id} not found`)
        }    
    } catch (error) { 
        res.status(400).json( error)
    }
}
 
 export const postCat=(req: Request, res: Response, next: NextFunction)=>{
    const cat = req.body;
    try{
        Cat.create(cat)
        .then((createdCat) => {
            res.status(200).json({ message:"Cat creado con exito!!!", createdCat,});
        })
        .catch((error) => next(error));
    }
    catch(error){
        res.status(400).json( error)
    }
}

export const delCat= async (req: Request, res: Response, next: NextFunction)=>{
    const {id}=req.body;
    try {
        if(id){
            const delCat = await Cat.findByPk(id)
            Cat.destroy(
                {
                    where:
                    { id }
                })
            delCat ?
            res.send(delCat):
            res.send("Cat not found")
        }
        else {
            res.send("ingrese el id del Cat a eliminar")
        }    
    } catch (error) {
        res.status(400).json( error)
    }
}

export const updateCat = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        
        const { name, age, description, image, status, arrived} = req.body;
        Cat.findByPk(id)
        .then((user) => {
            if(user){
                user.name = name || user.name;
                user.age = age || user.age;
                user.description = description || user.description;
                user.status = status || user.status;
                user.arrived =arrived ||user.arrived;
                user.image = image || user.image;
  
              user.save()
                .then((updated) => {
                    res.status(200).send(updated);
                });
            } else {
                res.status(404).send(`Gato con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
  }
  

