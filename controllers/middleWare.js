import jwt from "jsonwebtoken"

export const authenticated = async (req, res, next) => {
    let token;
    if (req.headers) {
        try {
            token = req.headers['x-auth-token']
            const decode = await jwt.verify(token, process.env.SECRET_KEY)
            next()
        } catch (error) {
            return res.status(400).json({ error: "Invalid Authorization" })
        }
    }

    if (!token) {
        return res.status(404).json({ error: "Invalid Token" })
    }
}