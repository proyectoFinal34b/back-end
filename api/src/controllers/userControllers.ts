import {Response, Request, Router, NextFunction} from 'express';
import { User } from '../models/User';



export const getUserByName =(req:Request, res: Response, next: NextFunction)=>{
    const{ name } = req.query
    try {
      if(!name){
        User.findAll()
          .then((findUser) => {
            res.send(findUser);
          })
          .catch((error) => next(error));
      }
      else{
        User.findOne({ where: { name: name as string } })
          .then((findUser) => {
            if(findUser) {
              res.send(findUser);
            } else {
              res.send(`Nombre ${name} no encontrado`)
            }
          })
          .catch((error) => next(error));
      }
    } catch (error) {
      res.status(400).json( error)
    }
  }
  

 export const getUserById= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try {
        if(id){
            const idUser = await User.findByPk(id)
            
            idUser?
            res.send(idUser):
            res.send(`ID: ${id} not found`)
        }    
    } catch (error) { 
        res.status(400).json( error)
    }
}
 
 export const postUser=(req: Request, res: Response, next: NextFunction)=>{
    const user = req.body;
    try{
        User.create(user)
        .then((createdUser) => {
            res.status(200).json({message:"usuario creado con exito!!!", createdUser });
        })
        .catch((error) => next(error));
    }
    catch(error){
        res.status(400).json( error)
    }
}

export const delUser= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.body;
    if(id){
        const delUser = await User.findByPk(id)
        User.destroy(
            {
                where:
                { id }
            })
        delUser ?
        res.send(delUser) :
        res.send("User not found")
    }
    else {
        res.send("ingrese el id del usuario a eliminar")
    }
}

export  const putUser = (req: Request, res: Response, next: NextFunction)=>{
    res.send("ruta actualizar user")
} 




