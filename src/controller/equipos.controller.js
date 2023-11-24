const EquiposModel = require('../models/equipos');
const CategoriasModel = require('../models/categorias');

class Equipo {

    agregar(equipo) {
        return new Promise(async (resolve, reject) => {
            if (!equipo.nombre || !equipo.miembros) {
                reject('Faltan propiedades escenciales: nombre y miembros')
            } else {
                //validamos que no exista otra modalidad con el mismo nombre
                const existeEquipo = await EquiposModel.findOne({
                    nombre: equipo.nombre
                })

                if (existeEquipo) {
                    return reject({
                        ok: false,
                        mensaje: 'Ya existe un equipo con ese nombre',
                    })
                }

                const nuevoEquipo = {
                    nombre: equipo.nombre,
                    miembros: equipo.miembros
                }

                const equipoCreado = await EquiposModel.create(
                    nuevoEquipo
                )

                if (!equipoCreado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al crear el nuevo Equipo',
                    })
                }
                resolve({
                    ok: true,
                    Equipo: equipoCreado,
                })
            }
        })
    }

    // Nueva funcionalidad
    agregarCategoria(equipo, id) {
        return new Promise(async (resolve, reject) => {
            if (!equipo.categoria) {
                reject('Faltan propiedades escenciales: categoria')
            } else {
                const equipoBuscado = await EquiposModel.findOne({ _id: id })

                if (!equipoBuscado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al agregar la categoria del equipo',
                    })
                }

                const categoriaBuscada = await CategoriasModel.findOne({ nombre: equipo.categoria })

                if (!categoriaBuscada) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al agregar la categoria del equipo porque no existe la categoria',
                    })
                }

                equipoBuscado.categorias_inscritas.push(equipo.categoria)
                categoriaBuscada.equipos_participantes.push(equipoBuscado.nombre)
                await EquiposModel.updateOne({ _id: id }, { $set: { categorias_inscritas: equipoBuscado.categorias_inscritas } })
                await CategoriasModel.updateOne({ nombre: equipo.categoria }, { $set: { equipos_participantes: categoriaBuscada.equipos_participantes } })

                return resolve({
                    ok: true,
                    equipoBuscado,
                    mensaje: "Categoria agregada al equipo exitosamente"
                })
            }
        })
    }

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const totalEquipos = await EquiposModel.find().select(
                    '_id nombre miembros categorias_inscritas'
                )
                return resolve({
                    ok: true,
                    totalEquipos
                })
            } catch (error) {
                console.error('Error al mostrar los Equipos:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al mostrar los Equipos',
                })
            }
        })
    }

    listarPorCategoria() {
        return new Promise( async (resolve, reject) => {
            try {
                const resultado = []

                const categorias = await CategoriasModel.find().select(
                    '_id nombre tipo_de_robot premio equipos_participantes modalidad'
                )
                
                for (let i = 0; i < categorias.length; i++) {
                    const equiposInscritos = categorias[i].equipos_participantes;
    
                    resultado.push({
                        categoria: categorias[i].nombre,
                        equiposInscritos: equiposInscritos
                    })
                }

                resolve({
                    ok: true,
                    Equipos_por_Categoria: resultado
                })
            } catch (error) {
                console.error('Error al mostrar los Equipos:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al mostrar los Equipos',
                })
            }
        })
    }

    editar(equipo, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!equipo.miembros) {
                    reject('Faltan propiedades escenciales: miembros')
                } else {
                    //Actualizaremos los datos del equipo
                    const edicionEquipo = { miembros: equipo.miembros };
                    const equipoEditado = await EquiposModel.updateOne({ _id: id }, { $set: edicionEquipo })

                    if (!equipoEditado) {
                        return reject({
                            ok: false,
                            mensaje: 'Hubo un error al editar el Equipos',
                        })
                    }

                    return resolve({
                        ok: true,
                        mensaje: 'Equipo editado',
                        equipoEditado: equipoEditado,
                    })
                }
            } catch (error) {
                console.error('Error al editar el Equipo:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Equipo',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise( async (resolve, reject) => {
            try {
                const equipoBuscado = await EquiposModel.findOne({ _id: id })

                if (!equipoBuscado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar el equipo porque no existe',
                    })
                }

                // Eliminamos el Equipo seleccionado
                const equipoEliminado = await EquiposModel.findByIdAndDelete(id)

                const categorias = await CategoriasModel.find().select(
                    '_id nombre tipo_de_robot premio equipos_participantes modalidad'
                )

                let elimino = false
                for (let o = 0; o < categorias.length; o++) {
                    elimino = false
                    for (let u = 0; u < categorias[o].equipos_participantes.length; u++) {
                        if (categorias[o].equipos_participantes[u] == equipoBuscado.nombre) {
                            categorias[o].equipos_participantes.splice(u, 1)
                            elimino = true
                        }
                    }

                    if (elimino) {
                        await CategoriasModel.updateOne({ _id: categorias[o]._id }, { $set: { equipos_participantes: categorias[o].equipos_participantes } })
                    }
                }

                return resolve ({
                    ok: true,
                    equipoEliminado,
                    mensaje: "Se ha eliminado existosamente el equipo"
                })
                
            } catch (error) {
                console.error('Error al eliminar el Equipo:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Equipo',
                })
            }
        })
    }

    eliminarCategoria(equipo, id) {
        return new Promise( async (resolve, reject) => {
            try {
                let existe = false
                if (!equipo.categoria) {
                    reject('Faltan propiedades escenciales: categoria')
                }

                const equipoBuscado = await EquiposModel.findOne({ _id: id })

                if (!equipoBuscado) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar la categoria del equipo porque no existe el equipo',
                    })
                }

                for (let a = 0; a < equipoBuscado.categorias_inscritas.length; a++) {
                    if (equipoBuscado.categorias_inscritas[a] == equipo.categoria) {
                        equipoBuscado.categorias_inscritas.splice(a, 1)
                        existe = true
                    }
                }

                if (existe == false) {
                    return reject('No esta registrada esa categoria en el equipo')
                }

                const categoriaEliminada = await EquiposModel.updateOne({ _id: id }, { $set: { categorias_inscritas: equipoBuscado.categorias_inscritas } })

                const categoriaBuscada = await CategoriasModel.findOne({ nombre: equipo.categoria })

                if (!categoriaBuscada) {
                    return reject({
                        ok: false,
                        mensaje: 'Hubo un error al eliminar la categoria del equipo porque no existe la categoria',
                    })
                }

                for (let o = 0; o < categoriaBuscada.equipos_participantes.length; o++) {
                    if (categoriaBuscada.equipos_participantes[o] == equipoBuscado.nombre) {
                        categoriaBuscada.equipos_participantes.splice(o, 1)
                    }
                }

                await CategoriasModel.updateOne({ nombre: equipo.categoria }, { $set: { equipos_participantes: categoriaBuscada.equipos_participantes } })

                return resolve ( {
                    ok: true,
                    categoriaEliminada
                })
            } catch (error) {
                console.error('Error al eliminar el Equipo de una Categoria:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Equipo de una Categoria',
                })
            }
        })
    }
}

const equiposC = new Equipo();
module.exports = equiposC;