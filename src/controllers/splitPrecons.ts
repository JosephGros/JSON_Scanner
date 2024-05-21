import fs from 'fs-extra';
import path from 'path';
import { PreconStructure } from '../interfaces/IPrecon';

const readJSONFile = async (filePath: string): Promise<any> => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJSONFile = async (filePath: string, data: any) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const splitPreconsByYear = async (preconsFilePath: string, outputDir: string) => {
  try {
    const precons: PreconStructure = await readJSONFile(preconsFilePath);

    for (const year in precons['Commander-Precons']) {
      if (precons['Commander-Precons'].hasOwnProperty(year)) {
        const yearData = precons['Commander-Precons'][year];
        const yearFilePath = path.join(outputDir, `${year}.json`);
        await writeJSONFile(yearFilePath, yearData);
        console.log(`Year ${year} data written to ${yearFilePath}`);
      }
    }

    console.log('Precons split by year successfully!');

  } catch (error:any) {
    console.error('Error splitting precons by year:', error.message);
    throw new Error(`Error splitting precons by year: ${error.message}`);
  }
};

const preconsFilePath = path.join(__dirname, '../data/precons.json');
const outputDir = path.join(__dirname, '../data/precons-by-year');

splitPreconsByYear(preconsFilePath, outputDir);
