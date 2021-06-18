const colaboradoras = require("../models/colaboradoras")
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

  //console.log(req.url)
    colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
};

const postColaboradora = (req, res) => {
   
      const senhaComHadsh = bcrypt.hashSync(req.body.password, 10)
      req.body.password  = senhaComHadsh
      let colaboradora = new colaboradoras(req.body);
      

    colaboradora.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
}

const login = (req, res) => {
  colaboradoras.findOne({ email: req.body.email}, function(error, colaboradora){
    if(!colaboradora) {
     return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`)
    }
    const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password)
    if(!senhaValida){
      return res.status(403).send('Senha inválida')
    }
    const token = jwt.sign({email: req.body.email}, SECRET)
    return res.status(200).send(token)
  })
}




module.exports = {
    getAll,
    postColaboradora,
    login
}
