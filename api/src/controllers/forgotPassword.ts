import {Response, Request, NextFunction} from 'express';
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
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
                message:"No existe el  email"
            })
        }
        const token =jwt.sign({id: user.id}, "mysecret");
        user.update({
            tokenResetPassword: token
        })
        //let testAccount = await nodeMailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //   host: "smtp.ethereal.email",
        //   port: 587,
        //   secure: false, // true for 465, false for other ports
        //   auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass, // generated ethereal password
        //   },
        // });
      
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth:{
                user:config.emAdress,
                pass:config.emPassword,
            }
        })
        console.log(transporter)
    const emailPort ="localhost:3001/user/password";
    
    const mailOption ={
        from:"bastet1872@gmail.com",
        to: `jruiz721818@gmail.com`,
        subject: "enlace para recuperar contraseña",
        text:`${emailPort}/${user.id}/${token}`
    }
    console.log(mailOption.text)
    transporter.sendMail(mailOption, (err, response)=>{
        if(err){
            console.error("Ocurrio un error", err);
        }else{
            res.status(200).json("El email se envio correctamente")
        }
    })
    }catch (error) {
        res.status(500).send(error)
    }
 }
