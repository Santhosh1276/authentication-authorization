import mongoose from "mongoose";

export function connectDB() {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/auth`)
        console.log("DB connected successfully")

    }
    catch (e) {
        console.error("Connection failed DB >>", e)
    }
}