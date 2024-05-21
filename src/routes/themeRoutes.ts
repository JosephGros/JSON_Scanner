import { Router } from 'express';
import { create, getAll } from '../controllers/themeController';

const router = Router();

router.post('/themes', create);
router.get('/themes', getAll);

export default router;
