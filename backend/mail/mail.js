import dotenv from 'dotenv';
dotenv.config();

export const emailConfig = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};
