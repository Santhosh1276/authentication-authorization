import express from "express"
import { internalError } from "../utils/apiError.js";
import { getAllUsers } from "../controllers/getUserDetails.js";

const router = express.Router()

router.post("/getAllUsers", async (req, res) => {
    try {
        let allUser = await getAllUsers();
        if (!allUser) {
            return res.status(400).json({ "error": "No User Data Available" })

        }

        return res.status(200).json({
            'message': "Data Fetched Successfully",
            "data": allUser,
            "accessToken": req?.headers?.['x-auth-token']
        })


    } catch (error) {
        console.log("Error occured on sign up >>>>", error)
        await internalError();
    }
})


export let getUsersRouter = router;

