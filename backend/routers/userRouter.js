import express from 'express';
import { v4 } from 'uuid';

// Importing user and session management functions
import { createUser, getUserByUsername_, getUserById_ } from '../db/userFunctions.js';
import { createSession, authSessionMiddlewareRedirect, authSessionMiddleware } from '../session/sessionManager.js';
import { sendConfirmationEmail } from '../services/emailService.js';

const router = express.Router();

const getUserById = async (req, res) => {

    try {
        const userId = req.data.user_id

        if (!userId) {
            return res.status(400).send('UserId invalid');
        }

        const user = await getUserById_(userId);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal server error');
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;

        // Generate a confirmation code
        const confirmationCode = v4();

        // Assuming createUser function now also receives the confirmation code
        const newUser = await createUser(username, email, password, name, role, confirmationCode);
        
        // Send the confirmation email
        await sendConfirmationEmail(email, confirmationCode);

        // Respond with success, might want to strip out sensitive information
        res.json({ user: newUser, message: "Please check your email to confirm your account." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering new user' });
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        console.log(`${username}, ${password}`)

        if (!username) {
            return res.status(400).send('Username is required');
        }

        if (!password) {
            return res.status(400).send('Password is required');
        }

        const user = await getUserByUsername_(username);

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.username === username && user.password === password) {
            req.user = user;
            next();
        } else {
            return res.status(400).send('Wrong password or user');
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).send('Internal server error');
    }
};

// Router setup
router.get('/', authSessionMiddleware, getUserById);
router.post('/register', registerUser);
router.post('/login', authSessionMiddlewareRedirect, authenticateUser, createSession);

export default router;