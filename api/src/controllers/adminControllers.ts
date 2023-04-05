import {Response, Request, NextFunction} from 'express';
import { Admin } from '../models/Admin';
import bcrypt from 'bcrypt'

export const getCred=async(req:Request, res:Response, next:NextFunction)=>{
  const {username, password} =req.body
  try {
    if(!username)return res.status(409).json("Debe ingresar username")
    if(!password)return res.status(409).json("Debe ingresar password")
    
    const admin = await Admin.findOne({ where: { username: username  } })
    res.send(admin)
    if(!admin)return res.status(409).json("Las credenciales no coinciden")
    
    const validateHash = await bcrypt.compare(password, admin.password)
    console.log(validateHash)
    validateHash ?
    res.status(200).json(admin) :
    res.status(409).json("contraseña incorrecta")

  } catch (error:any) {
    res.status(500).json({error:error.message})
  }
};

export const postCred= async(req:Request, res:Response, next:NextFunction)=>{
  const username =req.body.username
  const password =req.body.password
  try {
    if(!username)return res.status(409).json("Debe ingresar username")
    if(!password)return res.status(409).json("Debe ingresar password")

    const passHash:any= await bcrypt.hash(password,10)
    const data:any={
      username:username,
      password:passHash
    }

    const createAdmin = await Admin.create(data)
    !createAdmin ?
    res.status(409).json("el usuario no esta registrado") :
    res.status(200).json(createAdmin)
    
  } catch (error:any) {
    res.status(500).json({error:error.message})
  }
}  
