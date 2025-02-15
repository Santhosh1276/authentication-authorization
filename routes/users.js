import express from "express"
import bcrypt from "bcrypt"
import { createUser, getUser } from "../controllers/users.js"
import { generateJwtToken } from "../controllers/generateToken.js"
import { internalError } from "../utils/apiError.js"
const router = express.Router()

// sign up router
router.post("/sign-up", async (req, res) => {
    try {
        console.log("req >>>", req.body)
        const { id = '', email = '', password = '' } = req?.body
        if (id === "" || email === "" || password === "") {
            return res.status(400).json({ "error": "All fields are Mandatory !!!", "data": req.body })
        }
        let user = await getUser(req)
        if (user) {
            return res.status(400).json({ "error": "User Already Exist" })
        }
        else {
            // Generate an hashed password 
            let salt = await bcrypt.genSalt(10)
            let hashedPassword = await bcrypt.hash(req.body.password, salt)
            let createNewUser = await createUser(req, hashedPassword)
            console.log("create new user >>>", createNewUser)
            return res.status(200).json({ "message": "User Created Successfully", user_info: createNewUser })
        }
    }
    catch (error) {
        console.log("Error occured on sign up >>>>", error)
        await internalError();

    }
})

router.post("/log-in", async(req, res) => {
    try {
        const { id = '', email = '', password = '' } = req?.body
        if (id === "" || email === "" || password === "") {
            return res.status(400).json({ "error": "All fields are Mandatory !!!", "data": req.body })
        }

        let findUser = await getUser(req)
        console.log("find user >>",findUser, req.body)
        if (!findUser) {
            return res.status(400).json({"error":"Invalid Credentials !!!!!"})
        }

        let checkPassword = await bcrypt.compare(
            req.body.password,
            findUser?.password
        )

        if (!checkPassword) {
            return res.status(400).json({"error":"Invalid Credentials"})
        }

        let generateToken = await generateJwtToken(findUser?.id)
        return res.status(200).json({"message":"Login Successfully",accessToken:generateToken, userInfo:findUser})


    }
    catch (e) {
        console.log('err occured on login >>', e)
        await internalError();
    }
})

export const userRouter = router