import fs from 'fs-extra';
import path from 'path';
import { Card, PreconStructure } from '../interfaces/IPrecon';

const readJSONFile = async (filePath: string): Promise<any> => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJSONFile = async (filePath: string, data: any) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const updatePrecons = async (preconsFilePath: string, dataDir: string) => {
  try {
    const precons: PreconStructure = await readJSONFile(preconsFilePath);

    const years = await fs.readdir(dataDir);
    for (const year of years) {
      const yearDir = path.join(dataDir, year);
      const colors = await fs.readdir(yearDir);

      for (const color of colors) {
        const colorDir = path.join(yearDir, color);
        const decks = await fs.readdir(colorDir);

        for (const deck of decks) {
          const deckFilePath = path.join(colorDir, deck);
          if (deck.endsWith('.json')) {
            try {
              const deckData: Card[] = await readJSONFile(deckFilePath);
              if (!precons['Commander-Precons'][year][color][deck]) {
                precons['Commander-Precons'][year][color][deck] = [];
              }
              precons['Commander-Precons'][year][color][deck] = deckData;
            } catch (error:any) {
              console.error(`Error reading file ${deckFilePath}:`, error.message);
              throw new Error(`Error reading file ${deckFilePath}: ${error.message}`);
            }
          }
        }
      }
    }

    await writeJSONFile(preconsFilePath, precons);
    console.log('Precons updated successfully!');

  } catch (error: any) {
    console.error('Error updating precons:', error.message);
    throw new Error(`Error updating precons: ${error.message}`);
  }
};

export { updatePrecons };