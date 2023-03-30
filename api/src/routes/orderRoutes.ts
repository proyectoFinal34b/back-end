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

   router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
  
      await order.update({ state: "cancelled" });
      return res.send(order);
    } catch (error) {
      console.log(error);
      return res.status(500).send("An error occurred while cancelling the order");
    }
  });


export default router;