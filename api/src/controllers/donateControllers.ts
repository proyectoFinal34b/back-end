import {Response, Request, NextFunction} from 'express';
import nodeMailer from "nodemailer";
import  config from "../../lib/config";
var fs=require('fs');
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
}


const data = require('../../public/donacion.html')

export const postDonated =async (req: Request, res: Response, next: NextFunction)=>{

    const {user}=req.body  
    
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: config.emAdress,
            pass: config.emPassword,
        }
    });
        const mailOption = {
          from:"bastet1872@gmail.com",
          to: `${user.email}`,
          subject: `Donacion exitosa`,
          html : data,
        }
        transporter.sendMail(mailOption, (err, response) => {
          if (err) return res.status(400).send(response);
          return res.status(200).json("El  Email se envio correctamente")
        })
        };
