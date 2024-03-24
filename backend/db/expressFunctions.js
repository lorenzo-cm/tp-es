import { createUser, getUserByUsername_ } from './baseFunctions.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { v4 } from 'uuid';


export const registerUser = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;

        // Gerar um código de confirmação
        const confirmationCode = v4();

        // Aqui, supõe-se que a função createUser agora também recebe o código de confirmação
        const newUser = await createUser(username, email, password, name, role, confirmationCode);
        
        // Enviar o e-mail de confirmação
        await sendConfirmationEmail(email, confirmationCode);

        // Responder com sucesso, mas pode querer excluir informações sensíveis
        res.json({ user: newUser, message: "Please check your email to confirm your account." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering new user' });
    }
};


export const getUserByUsername = async (req, res) => {
    try {
        const username = req.query.username; // Capture "username" from query params
        console.log(username + ' db')
        if (!username) {
            return res.status(400).send('Username is required');
        }
        const user = await getUserByUsername_(username);
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


export const authenticateUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        console.log(`${username}, ${password}`)

        if (!username) {
            return res.status(400).send('Username is required');
        }

        if (!password) { // Fixed to check for password existence
            return res.status(400).send('Password is required');
        }

        const user = await getUserByUsername_(username);

        if (!user) {
            return res.status(404).send('User not found'); // Make sure to return here
        }

        if (user.username == username && user.password == password) {
            req.user = user;
            next()
        } else {
            return res.status(400).send('Wrong password or user'); // Make sure to return here
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).send('Internal server error'); // Make sure to return here
    }
};