const ModalidadModel = require('../models/modalidad');
const { v4: uuidv4 } = require('uuid');

class Modalidad {

    agregar(modal) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!modal.nombre) {
                    reject('Faltan propiedades escenciales: Codigo o Nombre')
                } else {
                    //validamos que no exista otra modalidad con el mismo nombre
                    const existeModalidad = await ModalidadModel.findOne({
                        nombre: modal.nombre
                    })
    
                    if (existeModalidad) {
                        return reject({
                            ok: false,
                            mensaje: 'Ya existe una modalidad con ese nombre',
                        })
                    }
    
                    const nuevaModalidad = {
                        nombre: modal.nombre
                    }
    
                    const modalidadCreada = await ModalidadModel.create(
                        nuevaModalidad
                    )
        
                    if (!modalidadCreada) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al crear la nueva Modalidad',
                        })
                    }
                    resolve({
                        ok: true,
                        Modalidad: modalidadCreada,
                    })
                }
            } catch (error) {
                console.error('Error al agregar las Modalidades:', error)
                return resolve({
                    ok: false,
                    mensaje: 'Hubo un error al agregar la modalidade',
                })
            }
        })
    }

    listar() {

        return new Promise(async (resolve, reject) => {
            try {
                const totalModalidades = await ModalidadModel.find().select(
                    '_id nombre categorias'
                )
                return resolve({
                    ok: true,
                    totalModalidades
                })
            } catch (error) {
                console.error('Error al mostrar las Modalidades:', error)
                return resolve({
                    ok: false,
                    mensaje: 'Hubo un error al mostrar las modalidades',
                })
            }
        })
    }
}

const modalidadesC = new Modalidad();
module.exports = modalidadesC;