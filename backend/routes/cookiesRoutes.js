import express from 'express';
import { v4 } from 'uuid';

const router = express.Router();

router.get('/set-cookie/', (req, res) => {
    res.cookie('session_2', v4(), {
        httpOnly: true,
        secure: true, // change to true in production
        maxAge: 1000 * 60 * 60,
        sameSite: 'lax', // 'none' requires secure to be true
        domain: 'localhost', // Comment this out if testing locally
    });
    res.send('Cookie is set');
});

router.get('/get-cookie/', (req, res) => {
    const cookieSession = req.cookies.session;
    res.json({ cookie_session: cookieSession });
});

export default router;
