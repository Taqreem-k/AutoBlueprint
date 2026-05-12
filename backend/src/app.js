const express = require("express")
const cookieParser= require("cookie-parser")
const blueprintRouter = require('./routes/blueprint.routes')

const app = express()

app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.routes")


app.use("/api/auth", authRouter)
app.use('/api/blueprints', blueprintRouter)




module.exports = app