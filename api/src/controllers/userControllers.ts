import {Response, Request, Router, NextFunction} from 'express';
import { sequelize } from '../db';
import { User } from '../models/User';
import { Op } from 'sequelize';
import { Cat } from '../models/Cat';
import bcrypt from 'bcrypt'
import { Order } from '../models/Order';


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
  } catch (error:any) {
    res.status(500).json({error : error.message});
  }
};
 
 export const postUser=async (req: Request, res: Response, next: NextFunction)=>{
    const {name,lastName,email, password} = req.body;
    const user = req.body
    try{
      if(!name || !lastName || !email || !password){
        res.status(422).json({ message: "Falta información: nombre, apellido o correo electrónico" });
        return;
      }else{
        const passHash:any= await bcrypt.hash(password,10)

        User.create({...user, password:passHash})
        .then((createdUser) => {
            res.status(200).json({message:"usuario creado con exito!!!", createdUser });
        })
        .catch((error) =>{
          console.log(error)
          next(res.status(400).json({msg: error}))});
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
}

export const activeAdmin = async (req: Request, res: Response, next: NextFunction)=>{
  const{ id }= req.params
  const { idAdmin } = req.params
  const {active, status} = req.body
  if(active===undefined || !status){return res.status(400).json({message: "No se aceptan campos vacíos"})}
  try {
    const admin = await User.findByPk(idAdmin)
    if(admin?.status==="superAdmin"){
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


export const sponsorCat = async (req: Request, res: Response, next: NextFunction)=>{
  const {id} = req.params; //ul user que va a apadrinar
  const {idCat} = req.params //el gato apadrinado
  const {idAdmin} = req.params; //el admin que tiene la posibilidad de hacer esa asignacion
  try {
    const admin = await User.findByPk(idAdmin)
    if(admin?.status==="admin" || admin?.status==="superAdmin"){
      const cat = await Cat.findByPk(idCat)
      if(cat){
        const sponsor = await User.findByPk(id)
        await cat.$set<User>("sponsor", sponsor)
        res.send("El usuario con ID " + id + " ahora es el patrocinador del gato con ID " + idCat);
      } else {
        res.status(404).send("No se encontró ningún gato con el ID especificado.");
      }
    } else {
      res.status(401).send("No tiene permisos para realizar esta acción.");
    }
  } catch (error) {
    next(error);
  }
}

export const orderUser = async (req: Request, res: Response, next: NextFunction)=>{
  const {id, idOrder} = req.params;
  try {
    
    const order = await Order.findByPk(idOrder)
    const user = await User.findByPk(id)
    if(!order){res.status(400).json("La orden de id "+idOrder+" no existe")}
    if(user){
      await user.$set<Order>("orders", order)
      res.status(200).json("La orden fue añandida al usuario")
    }else {
      res.status(400).json(`El usuario de id ${id} no existe`)
    }


  } catch (error:any) {
    res.status(400).json({error: error.message})
  }
}


export const validateUser=async(req:Request, res:Response, next:NextFunction)=>{
  const {email, password} =req.body
  try {
    if(!email)return res.status(409).json("Debe ingresar un email")
    if(!password)return res.status(409).json("Debe ingresar contraseña")
    
    const user = await User.findOne({ where: { email: email as string } })
    if(!user)return res.status(409).json("Las credenciales no coinciden")
    
    const validateHash = await bcrypt.compare(password, user.password)
    const validatedUser = await User.findByPk(user.id, {
      include: [{ model: sequelize.models.Cat }, { model: sequelize.models.Order }],
      attributes: { exclude: ['password'] } // Excluir la propiedad 'password'
    })   
     validateHash ?
    res.status(200).json({validatedUser, logged: true}) :
    res.status(409).json({message:"contraseña incorrecta", logged: false})

  } catch (error:any) {
    res.status(500).json({error:error.message})
  }
};



