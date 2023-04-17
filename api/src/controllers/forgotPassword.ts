import { Response, Request } from 'express';
import nodeMailer from "nodemailer";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
var fs=require('fs');
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

import { User } from '../models/User';
import  config from "../../lib/config";



const data = require('../../public/resetpass.html'); // path to your HTML template

export const resetPassword = async (req: Request, res: Response) => {
    const {email, password}= req.body
    if(!email)return res.status(400).send("Debe ingresar un email")   
    if(!password)return res.status(400).send("Debe ingresar una contraseña")
    try {
        const hashPass = await bcrypt.hash(password,10)
        if(hashPass) {
            User.findOne({where:{email:email}})
            .then((user) => {
                if(user?.tokenResetPassword) {
                    user.password = hashPass;
                    user.tokenResetPassword = ""
                    user.save()
                    .then((updated) => {
                        res.status(200).json(`La contraseña del usuario ${updated.email} fue cambiada`);
                    });
                } else {
                    res.status(404).json("Token no valido");
                } 
            });
        }
    } catch (error:any) {
        res.status(500).json({error:error.message})
    }
}

export const forgotPassword =async (req:Request, res: Response)=>{
    if(!req.body.email) return res.status(400).send({
        message:"El Email es requerido"
    });
    try {
        const user = await User.findOne({
            where : {
                email:req.body.email
            }
        });
        if(!user) { 
            return res.status(403).send({
                message:"Email no registrado"
            });
        }
        const token = jwt.sign({id: user.id},"mysecretekey",{ expiresIn: "1h"});
        console.log(token);
        user.update({
            tokenResetPassword: token
        });
        const transporter = nodeMailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
                user:config.emAdress,
                pass:config.emPassword,
            }
        });        
        const mailOption = {
            from:"bastet1872@gmail.com",
            to: `${user.email}`,
            subject: "Enlace para restablecer contraseña",
             html:`${data}  '\n\n Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso de restaurar su contraseña:\n\n'
              ${config.urlbase}/changepassword?token=${token}\n\n`
        }
        transporter.sendMail(mailOption, (err, response)=>{
            if(err) return res.status(400).send("No se pudo enviar el Email");
            return res.status(200).json("El  Email se envio correctamente")    
        })
    } catch (error:any) {
        res.status(500).json({error:error.message})
    }
 }



