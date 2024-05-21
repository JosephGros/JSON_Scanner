import mongoose, { Document, Schema } from 'mongoose';

interface Commander {
    name: string;
    num_decks: number;
    rank: number;
    themes: string[];
}

interface TopCommander extends Document {
    batchName: string;
    commanders: Commander[];
}

const CommanderSchema = new Schema<Commander>({
    name: { type: String, required: true },
    num_decks: { type: Number, required: true },
    rank: { type: Number, required: true },
    themes: { type: [String], required: true },
});

const TopCommanderSchema = new Schema<TopCommander>({
    batchName: { type: String, required: true },
    commanders: { type: [CommanderSchema], required: true },
});

const TopCommanderModel = mongoose.model<TopCommander>('TopCommander', TopCommanderSchema);

export default TopCommanderModel;
