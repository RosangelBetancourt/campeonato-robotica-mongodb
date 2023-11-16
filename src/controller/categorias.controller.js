const CategoriasModel = require('../models/categorias');
const ModalidadModel = require('../models/modalidad');
const EquiposModel = require('../models/equipos');

class Categoria {

    agregar(categoria) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!categoria.nombre || !categoria.tipo_de_robot || !categoria.premio || !categoria.modalidad) {
                    reject('Faltan propiedades escenciales: nombre, tipo_de_robot, premio y modalidad')
                } else {
                    //validamos que no exista otra categoria con el mismo nombre
                    const existeCategoria = await CategoriasModel.findOne({
                        nombre: categoria.nombre
                    })

                    if (existeCategoria) {
                        return reject({
                            ok: false,
                            mensaje: 'Ya existe una categoria con ese nombre',
                        })
                    }

                    //validamos que exista la modalidad
                    const existeModalidad = await ModalidadModel.findOne({
                        nombre: categoria.modalidad
                    })

                    if (!existeModalidad) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al agregar la categoria',
                        })
                    }

                    existeModalidad.categorias.push(categoria.nombre)

                    const edicionModalidad = { categorias: existeModalidad.categorias }
                    const modalidadEditada = await ModalidadModel.updateOne({ nombre: categoria.modalidad }, { $set: edicionModalidad })

                    if (!modalidadEditada) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al agregar la categoria',
                        })
                    }

                    const nuevaCategoria = {
                        nombre: categoria.nombre,
                        tipo_de_robot: categoria.tipo_de_robot,
                        premio: categoria.premio,
                        modalidad: categoria.modalidad
                    }

                    const categoriaCreada = await CategoriasModel.create(
                        nuevaCategoria
                    )

                    if (!categoriaCreada) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al crear la nueva Categoria',
                        })
                    }
                    resolve({
                        ok: true,
                        Categoria: categoriaCreada,
                    })
                }
            } catch (error) {
                console.error('Error al agregar las Categorias:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar las Categorias',
                })
            }
        })
    }

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const totalCategorias = await CategoriasModel.find().select(
                    '_id nombre tipo_de_robot premio equipos_participantes modalidad'
                )
                return resolve({
                    ok: true,
                    totalCategorias
                })
            } catch (error) {
                console.error('Error al mostrar las Categorias:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al mostrar las Categorias',
                })
            }
        })
    }

    editar(categoria, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!categoria.premio || !categoria.tipo_de_robot) {
                    reject('Faltan propiedades escenciales: premio y tipo_de_robot')
                } else {
                    //Actualizaremos los datos de la categoria
                    const edicionCategoria = { premio: categoria.premio, tipo_de_robot: categoria.tipo_de_robot };
                    const categoriaEditada = await CategoriasModel.updateOne({ _id: id }, { $set: edicionCategoria })

                    if (!categoriaEditada) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al editar la Categoria',
                        })
                    }

                    return resolve({
                        ok: true,
                        mensaje: 'Categoria editada',
                        categoriaEditada: categoriaEditada,
                    })
                }
            } catch (error) {
                console.error('Error al editar la Categoria:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar la Categoria',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const categoria = await CategoriasModel.findOne({
                    _id: id
                })

                if (!categoria) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar la cateogira no existe esa categoria',
                    })
                }

                const modalidad = await ModalidadModel.findOne({ nombre: categoria.modalidad })
                
                for (let a = 0; a < modalidad.categorias.length; a++) {
                    if (modalidad.categorias[a] == categoria.nombre) {
                        console.log(modalidad.categorias)
                        modalidad.categorias.splice(a, 1)
                        await ModalidadModel.updateOne({ nombre: categoria.modalidad }, { $set: { categorias: modalidad.categorias} })
                    }
                }

                const equipos = await EquiposModel.find().select(
                    '_id nombre miembros categorias_inscritas'
                )

                for (let i = 0; i < equipos.length; i++) {
                    for (let e = 0; e < equipos[i].categorias_inscritas.length; e++) {
                        if (equipos[i].categorias_inscritas[e] == categoria.nombre) {
                            equipos[i].categorias_inscritas.splice(e, 1)
                            await EquiposModel.updateOne({ _id: equipos[i]._id }, { $set: { categorias_inscritas: equipos[i].categorias_inscritas } })
                        }
                    }
                }

                // Eliminamos la categoria seleccionada
                const categoriaEliminada = await CategoriasModel.findByIdAndDelete(id)
                if (!categoriaEliminada) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar la categoria',
                    })
                }

                resolve({
                    ok: true,
                    categoriaEliminada,
                    mensaje: 'Categoria eliminada',
                })
            } catch (error) {
                console.error('Error al Eliminar la Categoria:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al Eliminar la Categoria',
                })
            }
        })
    }
}

const categoriasC = new Categoria();
module.exports = categoriasC;