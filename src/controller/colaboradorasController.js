const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET


const getAll = (req, res) => {
  const autHeader = req.get('authorization')
  if(!autenticado){
    res.status(401).json()
  }
    colaboradoras.find(function (err, colaboradoras){
      res.status(200).send(colaboradoras)
    })     
};

const postColaboradora = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;
  const colaboradora = new colaboradoras(req.body)


  colaboradora.save(function(err){
  if (err) res.status(500).send({ message: err.message })

  res.status(201).send(colaboradora.toJSON());
})
}


const login = (req, res) => {
  colaboradoras.findOne({ email: req.body.email}, function(error, colaboradora) {
     if(!colaboradora) {
        return res.status(404).send(`email: ${req.body.email} não cadastrado`)
     }
     const senhaValida = bcrypt.compareSync(req.body.password, colaboradora.password); 
  
     if(!senhaValida) {
        return res.status(403).send("Que senha é essa?")
     }
  
     const token = jwt.sign({ email: req.body.email }, SECRET); 
     return res.status(200).send(token)

     
  })
  }




module.exports = {
    getAll,
    postColaboradora,
    login
}
