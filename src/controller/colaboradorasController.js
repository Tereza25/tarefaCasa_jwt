const colaboradoras = require("../models/colaboradoras")
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const authVerify = (req, res, next) => {
=======
const SECRET = process.env.SECRET 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8

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
<<<<<<< HEAD
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
=======
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

        colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8
};

const getAll = (req, res) => {
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras)
  })
}
const postColaboradora = (req, res) => {
<<<<<<< HEAD
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  let colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
=======
    const senhaComHash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = senhaComHash;
    const colaboradora = new colaboradoras(req.body);  
  
    colaboradora.save(function(err){
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};


<<<<<<< HEAD
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



=======
const login = (req, res) => {
  colaboradoras.findOne({ email: req.body.email }, function(error, colaboradora) {
    if (!colaboradora) {
      return res.status(404).send(`Não existe colaboradora com o email ${req.body.email}`);
    }
    const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password);

    if(!senhaValida) {
      return res.status(403).send(`Que senha é essa?`)
    }

    const token = jwt.sign({ email: req.body.email }, SECRET);
      return res.status(200).send(token)


  });
}
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8



module.exports = {
<<<<<<< HEAD
  getAll,
  postColaboradora,
  login,
  createToken,
  authVerify
=======
    getAll,
    postColaboradora,
    login
>>>>>>> e9781e9c7c6194049d0728e15a6c1d318ec9d2d8
}

