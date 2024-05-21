import { Request, Response } from 'express';
import Theme from '../models/themeModel';

export const create = async (req: Request, res: Response) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).send(theme);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const themes = await Theme.find();
    res.status(200).send(themes);
  } catch (error) {
    res.status(400).send(error);
  }
};