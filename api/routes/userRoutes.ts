import {Response, Request, Router} from 'express';

const router: Router= Router()

router.get('/', (req: Request, res: Response) => {
 res.send('soy la ruta getUser!');
});



export default router;