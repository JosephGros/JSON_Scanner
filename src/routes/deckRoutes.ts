import { Router } from 'express';
import { create, getAll } from '../controllers/deckController';

const router = Router();

router.post('/decks', create);
router.get('/decks', getAll);

export default router;
