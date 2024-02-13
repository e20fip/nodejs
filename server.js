const express = require("express")
const cors = require("cors")
require("dotenv").config()
const PORT = 8000

const server = express()
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: "HEAD,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
server.use(express.json())
server.use(cors(corsOptions))
server.use("/", express.static("./public"))
server.use("/api", require("./routes/apiRoutes"))

server.listen(PORT, () => {
  console.log("server running on port " + PORT)
})
