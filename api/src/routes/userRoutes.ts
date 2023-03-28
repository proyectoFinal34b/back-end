import {Response, Request, Router} from 'express';

const router: Router= Router()

router.get('/', (req: Request, res: Response) => {
 res.send('soy la ruta getUser!');
});

router.post('/', (req: Request, res: Response) => {
    res.send('soy la ruta postUser!');
   });


export default router;