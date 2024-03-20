import pool from './db.js';

export const createUser = async (username, email, password, name, role, confirmationCode) => {
    const result = await pool.query(
        'INSERT INTO tp_es.users (username, email, password, name, role, confirmation_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [username, email, password, name, role, confirmationCode]
    );
    return result.rows[0];
};

export const getUserByUsername_ = async (username) => {
    const result = await pool.query(
        'SELECT * FROM tp_es.users WHERE username = $1',
        [username]
    );
    return result.rows[0];
};
