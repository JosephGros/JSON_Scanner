import mongoose, { Document, Schema } from 'mongoose';

interface ICommander {
    name: string;
}

interface ISynergyCommander extends Document {
    theme: string;
    commanders: ICommander[];
}

const CommanderSchema = new Schema<ICommander>({
    name: { type: String, required: true }
});

const SynergyCommanderSchema = new Schema<ISynergyCommander>({
    theme: { type: String, required: true },
    commanders: { type: [CommanderSchema], required: true }
});

const SynergyCommanderModel = mongoose.model<ISynergyCommander>('SynergyCommander', SynergyCommanderSchema);

export default SynergyCommanderModel;
