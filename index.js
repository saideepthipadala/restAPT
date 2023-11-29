import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import documentRoutes from './routes/document.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

const URL = process.env.URI;
const PORT = process.env.PORT || 5000;


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/', documentRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true }).then(() => app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})).catch((error) => console.log(error.message));
