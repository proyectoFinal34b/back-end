import {Response, Request, Router, NextFunction} from 'express';
import { sequelize } from '../db';
import { User } from '../models/User';
import { Cat } from '../models/Cat';


export const getUserByName =(req:Request, res: Response, next: NextFunction)=>{
  
  const{ name } = req.query;
  try {
    
    if(!name){
      User.findAll({include: sequelize.models.Cat})
      .then((findUser) => {
        res.json(findUser);
      })
      .catch((error) => next(error));
    }
    else {
      User.findAll({ where: { name: name as string } })
      .then((findUser) => {
        findUser ?
        res.json(findUser):
        res.json(`Nombre ${name} no encontrado`);
      })
      .catch((error) => next(error));
    }
  } catch (error:any) {
    res.status(500).json({error : error.message});
  }
};
  
 export const getUserById= async (req: Request, res: Response)=>{
  
  const { id } = req.params;
  try {
    if(id){
      const idUser = await User.findByPk(id, 
        {
          include: sequelize.models.Cat
        });
      idUser ?
      res.json(idUser):
      res.json(`ID: ${id} no encontrado`);
    }
  } catch (error:any) {
    res.status(500).json({error : error.message});
  }
};
 
 export const postUser = async(req: Request, res: Response)=>{
  
  const user = req.body;
  const { catId } =req.body;
  try{
    const searchCat= await Cat.findByPk(catId)
    if(searchCat){
      const newUser =await  User.create(user);
      await newUser.$add<Cat>("cats",[searchCat])
    .then(() => res.json(`${searchCat.name} adicionado al Usuario ${newUser.name}`))
    } else {
      res.status(400).json(`No existe el gato con ID ${catId}`);
    }
  } catch(error:any) {
    res.status(500).json({error : error.message})
  }
};
 
export const delUser= async (req: Request, res: Response)=>{
  
  const { id } = req.params;
  try {
    if(id){
      const delUser = await User.findByPk(id)
      User.destroy(
        {
          where:{ id }
        });
      delUser ?
      res.json({ message:"Usuario eliminado con exito!!!", delUser}) :
      res.json(`Usuario con el ID ${id} no encontrado`)
    } 
    else {
      res.json("Ingrese el ID del usuario a eliminar")
    }   
  } catch(error:any){
    res.status(500).json({error : error.message})
  }
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  
  const { name, lastName, email, active, phoneNumber, image} = req.body;
  const { id } = req.params;
  try {
    User.findByPk(id)
    .then((user) => {
      if(user){
        user.name = name || user.name;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.active = active || user.active;
        user.phoneNumber =phoneNumber ||user.phoneNumber;
        user.image = image || user.image;
        
        user.save()
        .then((updated) => {
          res.status(200).json(updated);
        });
      } else {
        res.status(404).json(`Usuario con id ${id} no encontrado`);
      }
    });
  } catch(error:any){
    res.status(500).json({error : error.message})
  }
};

