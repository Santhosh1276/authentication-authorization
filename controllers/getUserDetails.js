import { userSchema } from "../models/userModel.js";


export async function getAllUsers() {
    return await userSchema.find({});
}
