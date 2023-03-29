import {Response, Request, Router, NextFunction} from 'express';
import {Order} from "../models/Order"

const router: Router= Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    Order.findAll()
        .then((Orders) => {
            res.send(Orders);
        })
        .catch((error) => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;
    Order.create(order)
        .then((createdOrder) => {
            res.send(createdOrder);
        })
        .catch((error) => next(error))
   });


export default router;