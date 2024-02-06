const {Schema, model} = require('mongoose');

const MascotaSchema = Schema({

    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    especie:{
        type: String,
        require: [true, 'La especie es obligatoria']
    },
    edad:{
        type: String,
        require: [true, 'La edad es obligatoria']
    },
    tamano:{
        type: String,
        require: [true, 'El tamano es obligatorio']
    },
    color:{
        type: String,
        require: [true, 'El color es obligatorio']
    },
    sexo:{
        type: String,
        require: [true, 'El sexo es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }

})


module.exports = model('Mascota', MascotaSchema);