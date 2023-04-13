import {Response, Request, NextFunction} from 'express';
import nodeMailer from "nodemailer";
import jwt,{SignOptions} from "jsonwebtoken";
import { User } from '../models/User';
import  config from "../../lib/config";


export const forgotPassword =async (req:Request, res: Response, next: NextFunction)=>{
    if(!req.body.email){
     return    res.status(400).send({message:"El email es requerido"})
    }
    try {
        const user= await User.findOne<User>({
            where:{
                email:req.body.email
            }
        })       
        if(!user){
            return res.status(403).send({
                message:"Email no registrado"
            })
        }
        const token =jwt.sign({id: user.id},"mysecretekey",{ expiresIn:"1h"});
        user.update({
            tokenResetPassword: token
        })
        const transporter = nodeMailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
                user:config.emAdress,
                pass:config.emPassword,
            }
        })
    const emailPort ="http://localhost:3001/user/reset/";
    
    const mailOption ={
        from:"bastet1872@gmail.com",
        to: `${user.email}`,
        subject: "Enlace para recuperar contraseña",
        text:`${emailPort}/${user.id}?name=${token}`,  
    }
    transporter.sendMail(mailOption, (err, response)=>{
        if(err){
            console.error("No se pudo enviar el Email", err);
        }else{
            res.status(200).json("El  Email se envio correctamente")
        }
    })
    }catch (error) {
        res.status(500).send(error)
    }
 }
