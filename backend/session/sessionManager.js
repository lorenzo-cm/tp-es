import { v4 } from 'uuid';
import pool from '../db/db.js';


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
        res.cookie('session', sessionToken, {
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



export async function verifySession(req, res) {
    // Read the session token from the cookies
    const sessionToken = req.cookies.session;

    if (!sessionToken) {
        return res.status(401).send('Token not found');
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM tp_es.user_sessions WHERE session_token = $1 AND expires_at > NOW()',
            [sessionToken]
        );

        if (rows.length === 0) {
            // Correct the DELETE statement's WHERE clause
            await pool.query(
                'DELETE FROM tp_es.user_sessions WHERE session_token = $1 AND expires_at < NOW()',
                [sessionToken]
            );
        
            // Correct the cookie name to match what was set ('session', not 'sessionToken')
            res.clearCookie('session', {
                httpOnly: true,
                secure: true, // Note: Set to false if you're not using https in development
                sameSite: 'lax', // Adjust according to your requirements
                domain: 'localhost', // Set appropriately for production
            });

            return res.status(401).json({ message: 'Token expired' });
        }

        req.userId = rows[0].user_id; // Store the userId in the request object for later use
        
        res.status(200).json({ message: 'Token validated' });
    } catch (error) {
        console.error('Error verifying session', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
