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

export const getEntryById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        Entries.findByPk(id)
        .then((entry) => {
            if(entry){
                res.status(200).send(entry);
            } else {
                res.status(404).send(`Entry con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
}


export const createEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const entry = req.body;
        const newEntry: Entries = await Entries.create(entry);
        res.status(201).send(newEntry);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateEntry = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, images, summary } = req.body;
        Entries.findByPk(id)
        .then((entry) => {
            if(entry){
                entry.title = title || entry.title;
                entry.images = images || entry.images;
                entry.summary = summary || entry.summary;
                entry.save()
                .then((updatedEntry) => {
                    res.status(200).send(updatedEntry);
                });
            } else {
                res.status(404).send(`Entry con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deleteEntry = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        Entries.findByPk(id)
        .then((entry) => {
            if(entry){
                entry.destroy()
                .then(() => {
                    res.status(200).send(`Entry con id ${id} eliminado`);
                });
            } else {
                res.status(404).send(`Entry con id ${id} no encontrado`);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
}