import { Request, Response, NextFunction } from 'express';
import { Entries } from '../models/Entries';

export const getAllEntries = (req: Request, res: Response, next: NextFunction) => {
    try {
        Entries.findAll()
        .then((allEntries) => {
            res.status(200).send(allEntries);
        });
    } catch (error) {
        res.status(400).json(error);
    }
}