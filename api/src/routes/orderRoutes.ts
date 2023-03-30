import { Router } from 'express';
import { 
  getOrder, 
  postOrder
} from '../controllers/orderControllers';

const router: Router= Router()


router.get("/", getOrder)
router.post("/", postOrder)


  /* router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
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
  }); */



export default router;
