import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import deckRoutes from './routes/deckRoutes';
import themeRoutes from './routes/themeRoutes';
import config from './config';
import path from 'path';
import { updatePrecons } from './controllers/loadPrecons';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/api', deckRoutes);
app.use('/api', themeRoutes);

app.get('/update-precons', async (req, res) => {
  try {
    const preconsFilePath = path.join(__dirname, '../dist/data/precons.json');
    const dataDir = path.join(__dirname, '../dist/data/Commander-Precons');

    await updatePrecons(preconsFilePath, dataDir);

    res.status(200).send('Precons updated successfully!');
  } catch (error) {
    console.error('Error updating precons:', error);
    res.status(500).send('An error occurred while updating precons.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});