import {Response, Request, NextFunction} from 'express';
import { User } from "../models/User"

export const getUser= function(req: Request, res: Response, next: NextFunction){
    User.findAll()
    .then((users) => {
        res.send(users);
    })
    .catch((error) => next(error));
}

export const postUser= function(req: Request, res: Response, next: NextFunction){
    const user = req.body;
    User.create(user)
    .then((createdUser) => {
        res.send(createdUser);
    })
    .catch((error) => next(error));
}
