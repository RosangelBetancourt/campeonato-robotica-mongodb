const PatrocinantesModel = require('../models//patrocinantes');
const ModalidadModel = require('../models/modalidad');
const mongoose = require('mongoose')

class Patrocinantes {

    agregar(patrocinante) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!patrocinante.nombre || !patrocinante.rif || !patrocinante.modalidad_patrocinada) {
                    reject('Faltan propiedades escenciales: nombre, rif y modalidad_patrocinada')
                } else {
                    //validamos que el patrocio por parte de las modalidades a patrocinar
                    const existeModalidad = await ModalidadModel.findOne({
                        nombre: patrocinante.modalidad_patrocinada
                    })

                    if (existeModalidad == null) {
                        return reject({
                            ok: false,
                            mensaje: 'No existe la modalidad para patrocinar',
                        })
                    }

                    const nuevoPatrocinante = {
                        nombre: patrocinante.nombre,
                        rif: patrocinante.rif,
                        modalidad_patrocinada: patrocinante.modalidad_patrocinada
                    }

                    const patrocinanteCreado = await PatrocinantesModel.create(
                        nuevoPatrocinante
                    )

                    if (!patrocinanteCreado) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al crear el nuevo Patrocinante',
                        })
                    }
                    resolve({
                        ok: true,
                        Patrocinante: patrocinanteCreado,
                    })
                }
            } catch (error) {
                console.error('Error al agregar los Patrocinantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Patrocinante',
                })
            }
        })
    }

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const totalPatrocinantes = await PatrocinantesModel.find().select(
                    '_id nombre rif modalidad_patrocinada'
                )
                return resolve({
                    ok: true,
                    totalPatrocinantes
                })
            } catch (error) {
                console.error('Error al agregar los Patrocinantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Patrocinante',
                })
            }
        })
    }

    //Nueva funcionalidad o EndPoint
    editar(patrocinante, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!patrocinante.nombre || !patrocinante.rif) {
                    reject('Faltan propiedades escenciales: nombre y rif')
                }

                //Actualizaremos los datos del patrocinador
                const edicionPatrocinador = { nombre: patrocinante.nombre, rif: patrocinante.rif };
                const patrotinanteEditado = await PatrocinantesModel.updateOne({ _id: id }, { $set: edicionPatrocinador })

                if (!patrotinanteEditado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al editar el Patrocinante',
                    })
                }

                return resolve({
                    ok: true,
                    mensaje: 'Patrocinante editado',
                    patrotinanteEditado: patrotinanteEditado,
                })
            } catch (error) {
                console.error('Error al editar los Patrocinantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Patrocinante',
                })
            }
        })
    }

    //Nueva funcionalidad o EndPoint
    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                //validacion del ID para que sea como el ID de Mongoose
                if (!mongoose.isValidObjectId(id)) {
                    return reject({
                        ok: false,
                        mensaje: 'ID no válido',
                    })
                }

                // Eliminamos el Patrocinador seleccionado
                const patrocinanteEliminado = await PatrocinantesModel.findByIdAndDelete(id)
                if (!patrocinanteEliminado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar el Patrocinador',
                    })
                }

                return resolve({
                    ok: true,
                    patrocinanteEliminado,
                    mensaje: 'Patrocinante eliminado',
                })
            } catch (error) {
                console.error('Error al eliminar el Patrocinador:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Patrocinador',
                })
            }
        })
    }


}

const patrocinantesC = new Patrocinantes();
module.exports = patrocinantesC;