import dotenv from 'dotenv';
dotenv.config({path: "../../.env"});


import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://libertas-db.chqxlegzwru0.us-east-2.rds.amazonaws.com'], // Allow only this origin, or use '*' to allow all origins
    methods: ['POST', 'GET'], // Specify allowed methods
}));

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
