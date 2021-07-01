const express = require("express");
const router = express.Router();
const controller = require("../controller/colaboradorasController")
const Tarefa = require("../models/tarefas");

router.get("/", controller.authVerify, () => {
    const getAll = (req, res) => {
        Tarefa.find(function (err, tarefas) {
          res.status(200).send(tarefas)
        })
      }
})


module.exports = router;