import {Response, Request, NextFunction} from 'express';
import { Cat } from '../models/Cat';
import { User } from '../models/User';

import { Op } from 'sequelize';

export const getCatByName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  try {
    if (!name) {
      Cat.findAll()
        .then((findCat) => {
          res.send(findCat);
        })
        .catch((error) => next(error));
    } else {
      Cat.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
        .then((findCat) => {
          if (findCat) {
            res.send(findCat);
          } else {
            res.status(400).json(`Cat ${name} no encontrado`);
          }
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

 export const getCatById= async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try {
        if(id){
            const idCat = await Cat.findByPk(id)
            idCat ?
            res.send(idCat) :
            res.send(`Cat id: ${id} not found`)
        }    
    } catch (error) { 
        res.status(400).json( error)
    }
}
 
 export const postCat=async (req: Request, res: Response, next: NextFunction)=>{
    const cat = req.body;
    const { id }= req.params
    try{
        const admin = await User.findByPk(id)
        if(admin?.status==="admin" || admin?.status==="superAdmin"){
           Cat.create(cat)
        .then((createdCat) => {
            res.status(200).json({ message:"Cat creado con exito!!!", createdCat});
        })
        .catch((error) =>{
            res.status(400).json(error);}); 
        } else {
            res.json({message:"No tienes permisos para realizar esta acción"})
        }
        
    }
    catch(error){
        res.status(400).json({msg: error})
    }
}

export const delCat= async (req: Request, res: Response, next: NextFunction)=>{
    const {id}=req.params;
    try {
        if(id){
            const delCat = await Cat.findByPk(id)
            Cat.destroy(
                {
                    where:
                    { id }
                })
            delCat ?
            res.send(delCat):
            res.send("Cat not found")
        }
        else {
            res.send("ingrese el id del Cat a eliminar")
        }    
    } catch (error) {
        res.status(400).json( error)
    }
}

export const updateCat = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { idAdmin } = req.params;
    try {
        const { name, age, description, image, status, arrived, gender, state, sterilization, vaccinesFull, hairType, deworming, chip} = req.body;
        const admin = await User.findByPk(idAdmin)
        
        if(admin?.status==="admin" || admin?.status==="superAdmin"){
        Cat.findByPk(id)
        .then((cat) => {
            if(cat){
                cat.name = name || cat.name;
                cat.age = age || cat.age;
                cat.description = description || cat.description;
                cat.status = status!==cat.status ? !cat.status : cat.status
                cat.gender = gender || cat.gender;
                cat.state = state || cat.state;
                cat.arrived =arrived ||cat.arrived;
                cat.image = image || cat.image;
                cat.sterilization = sterilization!==cat.sterilization ? !cat.sterilization : cat.sterilization;
                cat.vaccinesFull = vaccinesFull!==cat.vaccinesFull ? !cat.vaccinesFull : cat.vaccinesFull;
                cat.hairType = hairType || cat.hairType;
                cat.deworming = deworming!==cat.deworming ? !cat.deworming : cat.deworming;
                cat.chip = chip!==cat.chip ? !cat.chip : cat.chip;
              cat.save()
                .then((updated) => {
                    res.status(200).send(updated);
                });
            } else {
                res.status(404).send(`Gato con id ${id} no encontrado`);
            }
        });
        } else {
            res.status(400).json("No tienes permisos para realizar esa acción")
        }

    } catch (error) {
        res.status(400).json(error);
    }
  }
  

