const { equipos, categorias } = require('../data/data');
const EquiposModel = require('../models/equipos');
const { v4: uuidv4 } = require('uuid');

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
        return new Promise((resolve, reject) => {
            const resultado = [];

            for (let i = 0; i < categorias.length; i++) {
                const equiposInscritos = categorias[i].equipos_participantes;

                resultado.push({
                    categoria: categorias[i].nombre,
                    equiposInscritos: equiposInscritos
                })
            }

            resolve(resultado);
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
        return new Promise((resolve, reject) => {

            let nombre_equipo = ''

            for (let i = 0; i < equipos.length; i++) {
                if (id === equipos[i].id) {
                    nombre_equipo = equipos[i].nombre
                    equipos.splice(i, 1)

                    for (let o = 0; o < categorias.length; o++) {
                        for (let u = 0; u < categorias[o].equipos_participantes.length; u++) {
                            if (categorias[o].equipos_participantes[u] == nombre_equipo) {
                                categorias[o].equipos_participantes.splice(u, 1)
                            }
                        }
                    }
                    resolve('Se ha eliminado exitosamente el equipo')
                }
            }

            reject('No existe un equipo con el id indicado para eliminar')
        })
    }

    eliminarCategoria(equipo, id) {
        return new Promise((resolve, reject) => {
            let nombre_categoria = ''
            let nombre_equipo = ''

            for (let i = 0; i < equipos.length; i++) {
                if (id === equipos[i].id) {
                    nombre_equipo = equipos[i].nombre

                    for (let a = 0; a < equipos[i].categorias_inscritas.length; a++) {
                        if (equipos[i].categorias_inscritas[a] == equipo.categoria) {
                            nombre_categoria = equipos[i].categorias_inscritas[a]
                            equipos[i].categorias_inscritas.splice(a, 1)
                        }
                    }

                    if (nombre_categoria == '') {
                        reject('No se encontro ninguna categoria registrada en el equipo con ese nombre')
                    } else {

                        for (let e = 0; e < categorias.length; e++) {
                            if (categorias[e].nombre == nombre_categoria) {

                                for (let o = 0; o < categorias[e].equipos_participantes.length; o++) {
                                    if (categorias[e].equipos_participantes[o] == nombre_equipo) {
                                        categorias[e].equipos_participantes.splice(o, 1)
                                    }
                                }
                            }
                        }

                        resolve('Se ha eliminado exitosamente el equipo')
                    }

                }
            }

            reject('No existe un equipo con el id indicado para eliminar')
        })
    }
}

const equiposC = new Equipo();
module.exports = equiposC;