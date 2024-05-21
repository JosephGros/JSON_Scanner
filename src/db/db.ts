import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState === 0) { // Check if the connection is already established
        try {
            await mongoose.connect('mongodb+srv://wileyjosephgros:adminAPI@mtgvaultapi.ipkvptw.mongodb.net/MTGTombAPI?retryWrites=true&w=majority&appName=MTGVaultAPI', {});
            console.log('Connected to MongoDB');
        } catch (error: any) {
            console.error('Error connecting to MongoDB:', error.message);
            process.exit(1);
        }
    }
};

export default connectDB;