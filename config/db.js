import mongoose from 'mongoose';
import colors from 'colors';
// import dotenv from 'dotenv'
// import morgan from 'morgan';

// dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDB ${connection.connection.host}`.bgGreen.white)
    } catch (err) {
        console.log(`Error in connecting to Database : ${err}.`.bgRed.white);
    }
}

export default connectDB;