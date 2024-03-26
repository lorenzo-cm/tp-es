import { v4 } from 'uuid';
import pool from '../db/db.js';

import { findSessionById, checkValidSession, deleteInvalidSessions } from '../db/sessionFunctions.js';


export const createSession = async (req, res) => {
    const { user } = req;
    const sessionToken = v4(); // Generate a unique session token
    const userId = user.id; // Assuming you have the user's ID

    try {
        // Insert the session into your database
        await pool.query(
          'INSERT INTO tp_es.user_sessions (session_token, user_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'30 days\')',
          [sessionToken, userId]
        );

        // Set the session token as an HTTP-only cookie
        res.cookie('session_id', sessionToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // Cookie expires in 30 days
            sameSite: 'lax',
            domain: 'localhost',
        });

        // Send back a success response
        res.status(200).json({ sessionToken: sessionToken, message: 'Login bem-sucedido' });

    } catch (error) {
        console.error('Erro ao criar sessão', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


function baseAuth(req, res) {

    try {
        const sessionToken = req.cookies.session_id;

        if (!sessionToken) {
            return res.status(401).send('Token not found');
        }

        const userId = checkValidSession(sessionToken)
        

        if (!userId) {
            deleteInvalidSessions(sessionToken)
        
            res.clearCookie('session', {
                httpOnly: true,
                secure: true, // Note: Set to false if you're not using https in development
                sameSite: 'lax', // Adjust according to your requirements
                domain: 'localhost', // Set appropriately for production
            });

            return {status: 401, message: 'Token expired'}
        }
        
        return {data: {userId: userId} , status: 200, message: 'Token validated'}
    } 
    
    catch (error) {
        return {status: 500, message: 'Internal server error'}
    }
}

export async function authSession(req, res) {

    const responseJson = baseAuth(req, res);

    if (responseJson.hasOwnProperty("data")) {
        req.data = responseJson.data
    }

    res.status(responseJson.status).json({ message: responseJson.message})
}


export const authSessionMiddleware = async (req, res, next) => {
    const responseJson = baseAuth(req, res);

    if (responseJson.hasOwnProperty("data")) {
        req.data = responseJson.data
    }

    if (responseJson.status >= 400){
        res.status(responseJson.status).json({ message: responseJson.message})
    }

    next()
};


export const authSessionMiddlewareRedirect = (req, res, next) => {

    const responseJson = baseAuth(req, res);

    if (responseJson.hasOwnProperty("data")) {
        req.data = responseJson.data
    }

    if (responseJson.status <= 400){
        console.log('redirecting user');
        return res.redirect('/profile');
    }

    if (responseJson.status >= 400){
        res.status(responseJson.status).json({ message: responseJson.message})
    }

    next()
};
