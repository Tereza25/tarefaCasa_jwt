const express = require("express");
const router = express.Router();
const controller = require('../controllers/colaboradoraController')

router.get("/", controller.getAll);
router.post("/create", controller.postcolaboradora);
router.delete("/:id", controller.deletecolaboradora);
router.post("/login", controller.login);

module.exports = router;