import express from 'express';
import { 
  postDonated, 
 
} from '../controllers/donateControllers';

const   router = express.Router();


router.post("/", postDonated)

export default router;