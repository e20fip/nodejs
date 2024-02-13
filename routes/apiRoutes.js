const express = require("express")
const router = express.Router()
const { apiFetch } = require("../controller/apiController")

router.route("/").post(apiFetch)

module.exports = router
