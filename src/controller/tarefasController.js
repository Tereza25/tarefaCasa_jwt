const tarefas = require("../models/tarefas")
const SECRET = process.env.SECRET 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getAll = (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1];
  console.log('Meu header:', token);

  if (!authHeader) {
    return res.status(401).send('erro no header');
  }

  jwt.verify(token, SECRET, function(erro) {
    if(erro) {
      return res.status(401).send('Não autorizado');
    }
  })

        tarefas.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
};

module.exports = {
    getAll
    
}
