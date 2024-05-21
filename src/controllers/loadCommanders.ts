import fs from 'fs';
import path from 'path';
import CommanderModel, { ICommander } from '../models/themeTopComModel';
import connectDB from '../db/db';

const loadCommanders = async () => {
    await connectDB();

    const themesDirectory = path.join(__dirname, 'data', 'top24Commanders');
    console.log(`Reading files from: ${themesDirectory}`);

    try {
        const files = fs.readdirSync(themesDirectory);

        for (const file of files) {
            const themeName = path.parse(file).name;
            const filePath = path.join(themesDirectory, file);
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const commanders: string[] = JSON.parse(rawData);

            const commanderDocs: ICommander[] = commanders.map(commander => ({
                name: commander
            }));

            const commanderModel = new CommanderModel({
                themeName: themeName,
                commanders: commanderDocs
            });

            await commanderModel.save();
            console.log(`Commanders for theme ${themeName} saved successfully.`);
        }
    } catch (error: any) {
        console.error(`Error saving commanders: ${error.message}`);
    }
};

export default loadCommanders;
