import mongoose, { Document, Schema } from 'mongoose';
import { ITheme } from '../interfaces/Itheme';

const CardSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    rarity: { type: String, required: true },
    image_uris: {
        small: { type: String, required: true },
        normal: { type: String, required: true },
        large: { type: String, required: true },
        png: { type: String, required: true },
        art_crop: { type: String, required: true },
        border_crop: { type: String, required: true },
    },
    cmc: { type: Number, required: true },
    type_line: { type: String, required: true },
    oracle_text: { type: String, required: true },
    color_identity: { type: [String], required: true },
    keywords: { type: [String] },
    flavor_text: { type: String }
});

const ThemeSchema = new Schema({
    themeName: { type: String, required: true, unique: true },
    cards: { type: [CardSchema], required: true }
});

const ThemeModel = mongoose.model<ITheme & Document>('Theme', ThemeSchema);

export default ThemeModel;
