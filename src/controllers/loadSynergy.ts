import fs from 'fs';
import path from 'path';
import SynergyCommanderModel from '../models/themeSynergy';
import connectDB from '../db/db';

const loadSynergyCommanders = async () => {
    await connectDB();

    const filePath = path.join(__dirname, 'data', 'ThemeComSyn.json');
    console.log(`Reading file from: ${filePath}`);

    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);

        for (const theme of Object.keys(data)) {
            const commanders = data[theme];
            const synergyCommander = new SynergyCommanderModel({
                theme,
                commanders
            });

            await synergyCommander.save();
            console.log(`Theme ${theme} with commanders saved successfully.`);
        }
    } catch (error: any) {
        console.error(`Error saving synergy commanders: ${error.message}`);
    }
};

export default loadSynergyCommanders;