import mongoose, { Document, Schema } from 'mongoose';

export interface ICommander {
    name: string;
}

export interface ICommanderDocument extends Document {
    themeName: string;
    commanders: ICommander[];
}

const CommanderSchema = new Schema<ICommanderDocument>({
    themeName: { type: String, required: true },
    commanders: [{
        name: { type: String, required: true }
    }]
});

const CommanderModel = mongoose.model<ICommanderDocument>('Commander', CommanderSchema);

export default CommanderModel;
