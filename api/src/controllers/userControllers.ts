import {Response, Request, Router, NextFunction} from 'express';
import { sequelize } from '../db';
import { User } from '../models/User';
import { Op } from 'sequelize';



export const getUserByName =(req:Request, res: Response, next: NextFunction)=>{
    const{ name } = req.query
    try {
      if(!name){
        User.findAll()
          .then((findUser) => {
            res.send(findUser);
          })
          .catch((error) =>{
            console.log(error)
            next(error)});
      }
      else{
        User.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`, // buscar en cualquier parte del nombre ignorando mayúsculas/minúsculas
            },
          },
        })
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
            const idUser = await User.findByPk(id, {include: [{model:sequelize.models.Cat},{model: sequelize.models.Order}]})
            
            idUser?
            res.send(idUser):
            res.send(`ID: ${id} not found`)
        }    
    } catch (error) { 
        res.status(400).json( error)
    }
}
 
 export const postUser=(req: Request, res: Response, next: NextFunction)=>{
    const {name,lastName,email,active,phoneNumber,image,status} = req.body;
    try{
      if(!name || !lastName || !email){
        res.status(422).json({ message: "Falta información: nombre, apellido o correo electrónico" });
        return;
      }else{
         const user = req.body
        User.create(user)
        .then((createdUser) => {
            res.status(200).json({message:"usuario creado con exito!!!", createdUser });
        })
        .catch((error) =>{
          console.log(error)
          next(res.status(400).json({msg: error}))});
      }

    }
    catch(error){
        res.status(400).json( error)
    }
}

export const delUser= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
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

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
      
      const { name, lastName, email, active, phoneNumber, image, status} = req.body;
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
                  res.status(200).send(updated);
              })
              .catch(error=>{
                console.log(error)
                next(error)
              })
          } else {
              res.status(404).send(`Usuario con id ${id} no encontrado`);
          }
      });
  } catch (error) {
      res.status(400).json(error);
  }
}

export const activeAdmin = async (req: Request, res: Response, next: NextFunction)=>{
  const{ id }= req.params
  const { idAdmin } = req.params
  const {active, status} = req.body
  if(active===undefined || !status){return res.status(400).json({message: "No se aceptan campos vacíos"})}
  try {
    const admin = await User.findByPk(idAdmin)
    if(admin?.status==="admin" || admin?.status==="superAdmin"){
       await User.findByPk(id)
       .then(user=>{
        if(user){
          user.active = active ;
          user.status = status ;
         return user.save()
        } else {
          res.status(400).send("Usuario no encontrado")
        }
       })
       .then(updateUser =>{
        res.status(200).send({updateUser, message: "Usuario actualizado"})
       })
     
    } else {
      res.status(400).json("No tienes permisos para realizar esa acción")
    }
    
  } catch (error) {
    res.status(400).json({message: error})
  }
}




