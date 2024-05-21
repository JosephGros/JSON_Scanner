import fs from 'fs';
import path from 'path';
import ThemeModel from '../models/themeModel';
import Card from '../interfaces/ITcard';
import connectDB from '../db/db';

const MAX_CARDS_PER_DOCUMENT = 1000;

const loadData = async () => {
    await connectDB();

    const themesDirectory = path.join(__dirname, 'data', 'Themes');
    console.log(`Reading files from: ${themesDirectory}`);

    const files = fs.readdirSync(themesDirectory);

    for (const file of files) {
        try {
            const filePath = path.join(themesDirectory, file);
            const themeName = path.parse(file).name; 

            const rawData = fs.readFileSync(filePath, 'utf-8');
            let cards: Card[];

            try {
                cards = JSON.parse(rawData);
            } catch (parseError:any) {
                console.error(`Error parsing JSON from file ${filePath}: ${parseError.message}`);
                continue;
            }

            const numberOfDocuments = Math.ceil(cards.length / MAX_CARDS_PER_DOCUMENT);

            for (let i = 0; i < numberOfDocuments; i++) {
                const start = i * MAX_CARDS_PER_DOCUMENT;
                const end = start + MAX_CARDS_PER_DOCUMENT;
                const cardsSubset = cards.slice(start, end);

                const theme = new ThemeModel({
                    themeName: `${themeName}_${i + 1}`,
                    cards: cardsSubset
                });

                await theme.save();
                console.log(`Theme ${themeName}_${i + 1} saved successfully.`);
            }
        } catch (error: any) {
            console.error(`Error saving theme ${file}: ${error.message}`);
        }
    }
};

export default loadData;