import {Response, Request, NextFunction} from 'express';
import { Category } from "../models/Category"

export const getCategoryByName =(req:Request, res: Response, next: NextFunction)=>{
    const{ name } = req.query
    try {
      if(!name){
        Category.findAll()
          .then((findCategory) => {
            res.send(findCategory);
          })
          .catch((error) => next(error));
      }
      else{
        Category.findAll({ where: { name: name as string } })
          .then((findCategory) => {
            if(findCategory) {
              res.send(findCategory);
            } else {
              res.send(`Categoría ${name} no encontrada`)
            }
          })
          .catch((error) => next(error));
      }
    } catch (error) {
      res.status(400).json( error)
    }
}

export const getCategoryById= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try {
        if(id){
            const idCategory = await Category.findByPk(id)
            idCategory?
            res.send(idCategory):
            res.send(`Category ID: ${id} not found`)
        }    
    } catch (error) { 
        res.status(400).json( error)
    }
}

export const postCategory= function(req: Request, res: Response, next: NextFunction){
    const category = req.body;
    try{
          Category.create(category)
        .then((createdCategory) => {
            res.status(200).json({message:"categoría creada con éxito.", createdCategory })
        })
        .catch((error) => next(error.message));
    }

    catch(error:any){
        res.status(400).json(error.message)
    }
}

export const delCategory= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    if(id){
        const delCategory = await Category.findByPk(id)
        Category.destroy(
            {
                where:
                { id }
            })
        delCategory?
        res.send(delCategory) :
        res.send("Category not found")
    }
    else {
        res.send("ingrese el id de la categoría a eliminar")
    }
}

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const { name } = req.body;
        Category.findByPk(id)
        .then((category) => {
            if(category){
                category.name = name || category.name;
              category.save()
                .then((updated) => {
                    res.status(200).send(updated);
                });
            } else {
                res.status(404).send(`Categoría con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
}
