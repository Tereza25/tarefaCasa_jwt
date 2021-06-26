const express = require("express");
const router = express.Router();
const controller = require("../controllers/tarefasController");

router.get("/", controller.getAll);
router.post("/", controller.postTarefa);
router.delete("/:id", controller.deleteTarefa);

module.exports = router;