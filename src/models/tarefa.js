const mongoose = require('mongoose')

const tarefasSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId ,
    descricao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String },
    dataInclusao: { type: Date,
        default: new Date
     }
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefasSchema)

module.exports = tarefas