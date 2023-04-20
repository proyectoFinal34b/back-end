import {Response, Request, NextFunction} from 'express';
import { Product } from "../models/Product"
import { Rating } from '../models/Rating';
import { Op } from 'sequelize';
import { Category } from '../models/Category';
import { User } from '../models/User';

export const getProductByName =(req:Request, res: Response, next: NextFunction)=>{
  const{ name } = req.query
  try {
    if(!name){
      Product.findAll({ include: { model: Category } })
        .then((findProduct) => {
          res.send(findProduct);
        })
        .catch((error) => next(error));
    }
    else{
      Product.findAll({
        include: { model: Category },
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // buscar en cualquier parte del nombre ignorando mayúsculas/minúsculas
          },
        },
      })
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
          const idProduct = await Product.findByPk(id, { include: [{ model: Category }, { model: Rating}] })
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

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { idAdmin } = req.params;
      
  try {
    const admin = await User.findByPk(idAdmin)
    if( admin?.status!== "admin" && admin?.status!=="superAdmin"){  res.status(400).json("No tienes permisos para realizar esta acción")}
    else {   
      const { name, summary, image, stock, active, price, discount, ratings} = req.body;
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
              product.active = active
            product.save()
              .then((updated) => {
                  res.status(200).send(updated);
              });
          } else {
              res.status(404).send(`Producto con id ${id} no encontrado`);
          }
      }); }
  } catch (error) {
      res.status(400).json(error);
  }
}