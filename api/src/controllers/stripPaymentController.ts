import {Response, Request, NextFunction} from 'express';
import Stripe from 'stripe'

const  stripe  =  new  Stripe ( "sk_test_51Mw8EZKXctGo6PdRT0FtzwVMJ6uTisOodOgzqE6ePiJQwK9uEYzmul2a8nC1J7VrjasnsHwxNUOhAMJioHG2sgGz00oMZS2UgG" ,  { 
    apiVersion : '2022-11-15' , 
  } ) ;

  
export const stripPayment = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const {id, amount} = req.body
    const payment = await stripe.paymentIntents.create({ //actualiza el estado para poder confirmarlo
        amount,
        currency: "USD",  //la moneda que lo recibimos
        description: "", //colocar el id del producto que este en la base de datos
        payment_method: id,
        confirm: true //esto confirma el pago automaticamente
    });      //registrar el pago
    res.send({message: 'Pago realizado'});
    }catch (error:any) {
        res.json({message: error.raw.message}); //agregar algo dependiendo del interfaz
    }
}
