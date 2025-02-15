import express from "express";
import cors from "cors"
import { connectDB } from "./db.js";
import { userRouter } from "./routes/users.js";
import { getUsersRouter } from "./routes/getUsers.js";
import { authenticated } from "./controllers/middleWare.js";
const app = express()
const port = process.env.PORT ?? 9000

app.use((cors()))

// for parsing the data globally 
app.use(express.json())

// database connection
connectDB()

app.use("/api/user", userRouter)
app.use("/api/user", authenticated, getUsersRouter)



app.listen(port, () => {
    console.log(`server running on ${port} port`)
})

