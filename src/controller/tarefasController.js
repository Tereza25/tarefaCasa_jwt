const mongoose = require('mongoose')
require('dotenv-safe').config();
const tarefas = require('../models/tarefas');
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');

const getAll = (req, res) => {
  const authHeader = req.get('authorization');
  if(!authHeader){
    return res.status(401).send("Não autorizado")
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro){
    if(erro){
      return res.status(403).send('Erro');
    }
    tarefas.find(function(err, tarefas){
      if(err) { 
        return res.status(500).send({ message: err.message })
      }
      return res.status(200).send(tarefas);
    })
  });

};

const postTarefa = (req, res) => {

  let tarefa = new tarefas(req.body)

  tarefa.save(function(err){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(201).send(tarefa)
  })

};

const deleteTarefa = (req, res) => {
  const id = req.params.id;

  tarefas.find({ id }, function(err, tarefa){
    if(tarefa.length > 0){
      tarefas.deleteMany({ id }, function(err){
        if(err) { 
          res.status(500).send({ 
            message: err.message, 
            status: "FAIL" 
           })
        }
        res.status(200).send({ 
          message: 'Tarefa removida com sucesso', 
          status: "SUCCESS" 
        })
      })
    }else{
      res.status(200).send({ 
        message: 'Não há tafera para ser removida', 
        status: "EMPTY" 
      })
    }
  })
};

module.exports = {
  getAll,
  postTarefa,
  deleteTarefa
};