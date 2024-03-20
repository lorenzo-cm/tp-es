import express from 'express';
import { registerUser, getUserByUsername } from '../db/expressFunctions.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUserByUsername);

export default router;
