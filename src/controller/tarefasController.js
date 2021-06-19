const tarefas = require("../models/tarefa")
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAll = (req, res) => {
    const authHeader = req.get('authorization')
    const token = authHeader.split(' ')[1];
    console.log('Meu header:' , token)

  if (!authHeader){
    return res.status(401).send('erro no header')
  }  

  jwt.verify(token, SECRET, function(erro) {
    if (erro){
      return res.status(401).send('Não autorizado')
    }
  })

  tarefas.find(function (err, tarefas){
      res.status(200).send(tarefas)
    })     
}

const postTarefas = (req, res) => {
    console.log(req.body);
  
    let tarefa = new tarefas(req.body);
      tarefa.save(function(err){
      if (err) res.status(500).send({ message: err.message })
  
      res.status(201).send(tarefa.toJSON());
    })
  };

module.exports = {
    getAll,
    postTarefas
}