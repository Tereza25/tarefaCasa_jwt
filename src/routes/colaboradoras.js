const express = require("express")
const router = express.Router()
const controller = require("../controller/colaboradorasController")

router.get("/",  controller.authVerify, controller.getAll)
router.post("/", controller.postColaboradora)
<<<<<<< HEAD
router.post("/login", controller.login, controller.createToken)
=======
router.post('/login', controller.login);
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8

module.exports = router;