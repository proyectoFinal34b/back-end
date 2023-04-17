import {Response, Request, NextFunction} from 'express';
import Stripe from 'stripe'

const  stripe  =  new  Stripe ( "sk_test_51MxuUbL58axdeL10ID3YrqawVf0RUkWA0i6S9H1dww7yEjvOpaeQXtRmTmYVOye1icsigRY37pXJr9sxaEjumc7F00ZQYB4lZ5" ,  { 
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