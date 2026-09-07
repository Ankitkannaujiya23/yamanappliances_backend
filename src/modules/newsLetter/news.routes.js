import express from 'express';
import { createNewsLetter } from './news.controller.js';


const router = express.Router();

router.post('/', createNewsLetter);

export default router;