import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export async function generateJwtToken(id) {
    console.log(process.env.SECRET_KEY, "secret key >>>")

    return jwt.sign({ id }, process.env.SECRET_KEY)
}