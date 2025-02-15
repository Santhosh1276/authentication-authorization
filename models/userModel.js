import mongoose, { modelNames, Schema } from "mongoose";

const user = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        maxlength: 34,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export const userSchema = mongoose.model("user", user)