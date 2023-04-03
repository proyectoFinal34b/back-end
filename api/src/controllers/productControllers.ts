import {Response, Request, NextFunction} from 'express';
import { sequelize } from '../db';
import { Product } from "../models/Product"
import { Rating } from '../models/Rating';

export const getProductByName =(req:Request, res: Response, next: NextFunction)=>{
  const{ name } = req.query
  try {
    if(!name){
      Product.findAll()
        .then((findProduct) => {
          res.send(findProduct);
        })
        .catch((error) => next(error));
    }
    else{
      Product.findAll({ where: { name: name as string } })
        .then((findProduct) => {
          if(findProduct) {
            res.send(findProduct);
          } else {
            res.send(`Producto ${name} no encontrado`)
          }
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    res.status(400).json( error)
  }
}

export const getProductById= async (req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params;
  try {
      if(id){
          const idProduct = await Product.findByPk(id)
          idProduct?
          res.send(idProduct):
          res.send(`Product ID: ${id} not found`)
      }    
  } catch (error) { 
      res.status(400).json( error)
  }
}

export const postProduct= function(req: Request, res: Response, next: NextFunction){
    const product = req.body;
    try{
        Product.create(product)
      .then((createdProduct) => {
        res.status(200).json({message:"producto creado con éxito.", createdProduct });
      })
      .catch((error) => next(error));
    }
    catch(error){
      res.status(400).json(error)
    }
}

export const postRating = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const ratingData = req.body;
    ratingData.productId = productId;
  
    Rating.create(ratingData)
      .then((createdRating) => {
        res.send(createdRating);
      })
      .catch((error) => next(error));
};

export const delProduct = async (req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params;
  if(id){
      const delProduct = await Product.findByPk(id)
      Product.destroy(
          {
              where:
              { id }
          })
      delProduct ?
      res.send(delProduct) :
      res.send("Product not found")
  }
  else {
      res.send("ingrese el id del producto a eliminar")
  }
}

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
      const { name, summary, image, stock, price, discount, ratings} = req.body;
      Product.findByPk(id)
      .then((product) => {
          if(product){
              product.name = name || product.name;
              product.summary = summary || product.summary;
              product.image = image || product.image;
              product.stock = stock || product.stock;
              product.price = price ||product.price;
              product.discount = discount || product.discount;
              product.ratings = ratings || product.ratings;

            product.save()
              .then((updated) => {
                  res.status(200).send(updated);
              });
          } else {
              res.status(404).send(`Producto con id ${id} no encontrado`);
          }
      });
  } catch (error) {
      res.status(400).json(error);
  }
}