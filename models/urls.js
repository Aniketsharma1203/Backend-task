import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true,
    },
    shortId:{
        type: String,
    },
    clicks:{
        type: Number
    },
    lastAccessed:{
        type: Date,
    },
}, { timestamps: true });

export default new mongoose.model('urls', urlSchema);