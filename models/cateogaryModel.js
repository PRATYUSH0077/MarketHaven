import mongoose, { mongo } from "mongoose";

const cateogarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    },
})

export default mongoose.model('Cateogary', cateogarySchema);