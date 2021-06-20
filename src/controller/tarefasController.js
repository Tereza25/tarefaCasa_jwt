
const tarefas = require("../models/tarefas")
const SECRET = process.env.SECRET




const getAll = async(req, res)=>{



    const autHeader = req.get('authorization')
    if(!autenticado){
      res.status(401).json()
    }
     tarefas.find(function (err, colaboradoras){
        res.status(200).send(colaboradoras)
      })     
  







}

module.exports = {getAll}