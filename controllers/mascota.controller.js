const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');
const { response, request } = require('express');


const mascotasPost = async (req, res) => {
    const {nombre, especie, edad, tamano, color, sexo} = req.body;
    const mascota = new Mascota({nombre, especie, edad, tamano, color, sexo});

    await mascota.save();
    res.status(202).json({
        mascota
    });
}

const mascotaGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};
    
    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaById = async (req,res) => {
    const {id} = req.params;
    const mascota = await Mascota.find({_id: id});

    res.status(200).json({
        mascota
    });
}

const putMascotas = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const mascota = await Mascota.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota Actualizada Exitosamente!!!',
        mascota
    })
}

const mascotasDelete = async (req, res = response) => {
    const {id} = req.params;
    const mascota = await Mascota.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Mascota Eliminado Exitosamente',
        mascota
    });

}


module.exports = {
    mascotasPost,
    mascotaGet,
    getMascotaById,
    putMascotas,
    mascotasDelete
}