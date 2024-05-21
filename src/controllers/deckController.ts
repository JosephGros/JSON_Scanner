import { Request, Response } from 'express';
import Deck from '../models/deckModel';

export const create = async (req: Request, res: Response) => {
  try {
    const deck = new Deck(req.body);
    await deck.save();
    res.status(201).send(deck);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const decks = await Deck.find();
    res.status(200).send(decks);
  } catch (error) {
    res.status(400).send(error);
  }
};