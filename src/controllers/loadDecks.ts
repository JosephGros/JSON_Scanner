import fs from 'fs';
import path from 'path';
import DeckModel from '../models/deckModel';
import connectDB from '../db/db';

const loadDecks = async () => {
    await connectDB();

    const decksDirectory = path.join(__dirname, 'data', 'Decks2');
    console.log(`Reading files from: ${decksDirectory}`);

    const colors = fs.readdirSync(decksDirectory);

    let deckCounter = 1;

    for (const color of colors) {
        const colorDirectory = path.join(decksDirectory, color);
        const files = fs.readdirSync(colorDirectory);

        for (const file of files) {
            try {
                const filePath = path.join(colorDirectory, file);
                const rawData = fs.readFileSync(filePath, 'utf-8');
                const cards = JSON.parse(rawData);

                const deckName = `Deck ${deckCounter++}`;
                const deck = new DeckModel({
                    deckName,
                    color,
                    cards
                });

                await deck.save();
                console.log(`Deck ${deckName} from ${file} saved successfully under color ${color}.`);
            } catch (error: any) {
                console.error(`Error saving deck from ${file}: ${error.message}`);
            }
        }
    }
};

export default loadDecks;
