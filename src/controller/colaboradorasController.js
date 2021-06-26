const Colaboradoras = require('../models/colaboradoras');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const getAll = (req, res)=>{
    Colaboradoras.find(function(err, colaboradoras){
        if(err){
            return res.status(500).send({message: err.message})
        }
        return res.status(200).send(colaboradoras);
    })
}

const postcolaboradora = (req, res)=>{
    const senhaHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaHash
    const  colaboradora = new Colaboradoras(req.body)

    colaboradora.save(function(err){
        if(err) { 
          res.status(500).send({ message: err.message })
        }
        res.status(201).send(colaboradora)
      })
}

const deletecolaboradora = async (req, res) => {
    try{
        const colaboradora = await  Colaboradoras.findById(req.params.id)
        if(Colaboradoras == null){
            return res.status(404).json({message: 'Colaboradora não encontrada'})
        }
        await colaboradora.remove()
        res.json({message: 'Colaboradora deletada com sucesso!'})

    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const login = (req, res) =>{
    Colaboradoras.findOne({ email: req.body.email}, function(error, colaboradora){
        if(!colaboradora){
            return res.status(404).send(`Não existe colaboradora com email ${req.body.email}`);
        }

        const senhaValida = bcrypt.compareSync(req.body.senha, colaboradora.senha);
        console.log(req.body.senha)
        console.log(colaboradora.senha)

        if (!senhaValida) {
          return res.status(403).send(`que senha é essa hein ${senhaValida}`);
        }

        const token = jwt.sign({ email: req.body.email }, SECRET);

        return res.status(200).send(token);
      });
}

module.exports = {
    getAll,
    postcolaboradora,
    deletecolaboradora,
    login
}