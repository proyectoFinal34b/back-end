import {Response, Request, NextFunction} from 'express';
import nodeMailer from "nodemailer";
import jwt,{SignOptions} from "jsonwebtoken";
import { User } from '../models/User';
import  config from "../../lib/config";
import bcrypt from "bcrypt";

export const resetPassword = async (req: Request, res: Response, next: NextFunction) =>{
    const {email, password}= req.body
    const hashPass = await bcrypt.hash(password,10)
    try {
        if(!email){
            console.log("Debe ingresar un email")
        }else{
            User.findOne({where:{
            email:email
            }})
            .then((user) => {
              if(user){
                user.password = hashPass || user.password;
                user.save()
                .then((updated) => {
                  res.status(200).json(updated);
                });
              } else {
                res.status(404).json(`Usuario con email ${email} no encontrado`);
              }
            });
        await  User.findOne({
                where:{
                    email:email
                }
            }).then(data)
            
        }
    } catch (error) {
        console.log(error)
    }
}
// export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
//     const { email } = req.pa;
//     console.log(token)
//     try {
//       if (token) {
//         const decoded: any = jwt.verify(token, "mysecretekey");
//         console.log(decoded)

//        // const user = await User.findOne({ decoded });
//         // if (!user) {
//         //   return res.status(404).send({ message: 'Usuario no encontrado' });
//         // }
//         // console.log(user);
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({ message: 'Ha ocurrido un error al encontrar al usuario' });
//     }
//   };
// export const resetPassword= async (req:Request, res: Response, next: NextFunction)=>{
//     const {token}=req.params
//     try {
//         if(token){
//             const search = await User.findOne({where:{
//                 tokenResetPassword:token
//             }})    
//             console.log(search)
        
//         }
        
//     } catch (error) {
        
//     }

// }
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
    // const emailPort ="http://localhost:3001/user/reset";
    const emailPort ="https://new-front-git-dev-proyectofinal34b.vercel.app/changepassword";
    
    const mailOption ={
        from:"bastet1872@gmail.com",
        to: `${user.email}`,
        subject: "Enlace para recuperar contraseña",
        text:`${emailPort}`,  
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
function data(value: User | null): User | PromiseLike<User | null> | null {
    throw new Error('Function not implemented.');
}

