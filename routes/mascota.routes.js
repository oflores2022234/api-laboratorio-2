const { Router } = require('express');
const { check } = require('express-validator');


const { 
    
    mascotasPost,
    mascotaGet,
    getMascotaById,
    putMascotas,
    mascotasDelete } = require('../controllers/mascota.controller');

const { existeMascotaById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get("/", mascotaGet);

router.post(

    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("especie", "La especie no puede estar vacia").not().isEmpty(),
        check("edad", "La edad no puede estar vacia").not().isEmpty(),
        check("tamano", "El tamano no puede estar vacio").not().isEmpty(),
        check("color", "El color no puede estar vacio").not().isEmpty(),
        check("sexo", "El sexo no puede estar vacio").not().isEmpty(),
    ], mascotasPost);

router.get(
    "/:id",
    [
        check('id', 'no es id valido').isMongoId(),
        check('id').custom(existeMascotaById),
    ], getMascotaById);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),

        validarCampos
    ], putMascotas);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], mascotasDelete)


module.exports = router;