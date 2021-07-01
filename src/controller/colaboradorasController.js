const colaboradoras = require("../models/colaboradoras")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const authVerify = (req, res, next) => {

  const { authorization } = req.get('authorization');

  if (!authorization) {
    return res.status(401).json({
      message: "Não Permitido!"
    })
  }
  const token = authorization.split(" ")[0];

  jwt.verify(token, 'secretdk', (error, user) => {
    if (error) {
      return res.status(401).json({
        message: "Não Permitido!"
      })
    }
    next();
  })
};
const getAll = (req, res) => {
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras)
  })
}
const postColaboradora = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  let colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

const getAll = (req, res) => {
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras)
  })
}
const postColaboradora = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  let colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};


const login = async (req, res, next) => {
  const colaboradora = await colaboradoras.findOne({ email: req.body.email })
  const message = {
    message: "Usuario ou senha invalida"
  }
  if (!colaboradora) {
    return res.stauts(400).json(message)
  }

  if (bcrypt.compareSync(req.body.password, colaboradora.password)) {
    req.usuario = {
      nome: colaboradora.nome,
      email: colaboradora.email
    }
    return next();
  }
  return res.status(400).json(message)
}

const createToken = (req, res) => {
  console.log('a')
  jwt.sign(req.usuario, 'secretBiaRamerindo', { expiresIn: '1h' }, (error, token) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }
    res.status(201).json({
      token,
      user: req.usuario
    })
  })
}






module.exports = {
  getAll,
  postColaboradora,
  login,
  createToken,
  authVerify
}

