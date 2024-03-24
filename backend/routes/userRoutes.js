import express from 'express';
import { registerUser, getUserByUsername, authenticateUser } from '../db/expressFunctions.js';
import { createSession, verifySession } from '../session/sessionManager.js'

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUserByUsername);
router.post('/login', authenticateUser, createSession)
router.post('/session/verify', verifySession)

export default router;
