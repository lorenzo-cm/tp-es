import { createUser, getUserByUsername_ } from './baseFunctions.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { generateToken } from '../services/tokenService.js';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;

        // Gerar um código de confirmação
        const confirmationCode = generateToken();

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


export const authenticateUser = async (req, res) => {
    try {
        const username = req.query.username; // Capture "username" from query params
        const password = req.query.password

        console.log(`user ${username} and pass ${password} for db`)

        if (!username) {
            return res.status(400).send('Username is required');
        }

        if (!username) {
            return res.status(400).send('Password is required');
        }

        const user = await getUserByUsername_(username);

        if (!user){
            res.status(404).send('User not found');
        }

        if (user.username == username && user.password == password){
            return res.status(200)
        }

        else{
            return res.status(400).send('Wrong password/user')
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal server error');
    }
}