import {Response, Request, Router, NextFunction} from 'express';
import { Cat } from '../models/Cat';

const router: Router= Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Cat.findAll()
   .then((Cats) => {
    res.status(200).send(Cats);
   })
   .catch((error) => next(error));
 });

 router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const cat = req.body;
  Cat.create(cat)
   .then((createdCat) => {
    res.send(createdCat);
   })
   .catch((error) => next(error));
 });


export default router;