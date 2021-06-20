const express = require("express")
const router = express.Router()
const controller = require("../controller/colaboradorasController")
require ('dotenv-safe').config()



router.get("/", controller.getAll)
router.post("/", controller.postColaboradora)
router.post("/login", controller.login)

module.exports = router;


