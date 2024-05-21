import fs from 'fs';
import path from 'path';
import TopCommanderModel from '../models/topComModel';
import connectDB from '../db/db';

const BATCH_SIZE = 2000;

const loadTopCommanders = async () => {
    await connectDB();

    const filePath = path.join(__dirname, 'data', 'Top-Commanders', 'topComTheme.json');
    console.log(`Reading file: ${filePath}`);

    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const topCommanders = JSON.parse(rawData);

        let batch = [];
        let batchCount = 0;

        for (const commander of topCommanders) {
            batch.push(commander);

            if (batch.length === BATCH_SIZE || topCommanders.indexOf(commander) === topCommanders.length - 1) {
                const start = batchCount * BATCH_SIZE;
                const end = start + batch.length;

                const batchName = `Top ${start}-${end} Commanders`;
                const commanderDoc = new TopCommanderModel({ batchName, commanders: batch });

                await commanderDoc.save();

                batch = [];
                batchCount++;
            }
        }

        console.log(`Top commanders from the past two years saved successfully.`);
    } catch (error: any) {
        console.error(`Error saving top commanders: ${error.message}`);
    }
};

export default loadTopCommanders;
