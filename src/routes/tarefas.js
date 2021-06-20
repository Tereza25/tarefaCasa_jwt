const express = require("express")
const router = express.Router()
const controller = require("../controller/tarefasController")
require ('dotenv-safe').config()





router.get('/', controller.getAll)