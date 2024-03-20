import express from 'express';
import { registerUser, getUserByUsername, authenticateUser } from '../db/expressFunctions.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUserByUsername);
router.post('/login', authenticateUser)


export default router;
