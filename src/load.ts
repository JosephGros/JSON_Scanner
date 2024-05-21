import loadCommanders from './controllers/loadCommanders';
import loadTopCommanders from './controllers/loadTopCommander';
import loadData from './controllers/loadFiles';
import loadDecks from './controllers/loadDecks';
import loadSynergyCommanders from './controllers/loadSynergy';

const run = async () => {
    try {
        await loadData();
        await loadCommanders();
        await loadTopCommanders();
        await loadDecks();
        await loadSynergyCommanders();
        console.log('All data loading complete');
        process.exit(0);
    } catch (error) {
        console.error('Error loading data:', error);
        process.exit(1);
    }
};

run();
