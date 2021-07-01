const express = require("express")
const router = express.Router()
const controller = require("../controller/colaboradorasController")

router.get("/",  controller.authVerify, controller.getAll)
router.post("/", controller.postColaboradora)
router.post("/login", controller.login, controller.createToken)

module.exports = router;