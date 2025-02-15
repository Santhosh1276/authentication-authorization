import { userSchema } from "../models/userModel.js";


export async function getUser(req) {
    return await userSchema.findOne({id:req?.body?.id})
    
}

export async function createUser(req, hashedPassword) {
    return await new userSchema({
        ...req.body,
        password : hashedPassword

    }).save()
}