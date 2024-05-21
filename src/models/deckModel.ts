import mongoose, { Document, Schema } from 'mongoose';

interface ICard {
    qty: number;
    name: string;
    categories: string[];
    prices: {
        ck: number;
        ckFoil: number;
        tcg: number;
        tcgFoil: number;
        mtgo: number;
        mtgoFoil: number;
        cm: number;
        cmFoil: number;
    };
    set: string;
    superTypes: string[];
    subTypes: string[];
    saltScore?: number;
    cmc: number;
}

interface IDeck extends Document {
    deckName: string;
    color: string;
    cards: ICard[];
}

const DeckSchema = new Schema<IDeck>({
    deckName: { type: String, required: true },
    color: { type: String, required: true },
    cards: [
        {
            qty: { type: Number, required: true },
            name: { type: String, required: true },
            categories: { type: [String], required: true },
            prices: {
                ck: { type: Number, required: true },
                ckFoil: { type: Number, required: true },
                tcg: { type: Number, required: true },
                tcgFoil: { type: Number, required: true },
                mtgo: { type: Number, required: true },
                mtgoFoil: { type: Number, required: true },
                cm: { type: Number, required: true },
                cmFoil: { type: Number, required: true }
            },
            set: { type: String, required: true },
            superTypes: { type: [String], required: true },
            subTypes: { type: [String], required: true },
            saltScore: { type: Number, required: false },
            cmc: { type: Number, required: true }
        }
    ]
});

const DeckModel = mongoose.model<IDeck>('Deck', DeckSchema);

export default DeckModel;
