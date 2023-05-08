const express = require("express")
import { getUser } from "../controllers/users";

const router = express.Router()

router.get('/getUser/:userId', getUser)

module.exports = router