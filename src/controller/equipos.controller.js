const { equipos, categorias } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

class Equipo {

    agregar(equipo) {
        return new Promise((resolve, reject) => {
            if (!equipo.nombre || !equipo.miembros || !equipo.categorias_inscritas) {
                reject('Faltan propiedades escenciales: nombre, miembros y categorias_inscritas')
            } else {
                let nulo = false

                for (let i = 0; i < equipos.length; i++) {
                    if (equipos[i].nombre == equipo.nombre) {
                        nulo = true
                    }
                }

                if (nulo) {
                    reject('Ya existe un equipo con ese nombre')
                } else {
                    let existe = false

                    for (let i = 0; i < equipo.categorias_inscritas.length; i++) {
                        const categoria = equipo.categorias_inscritas[i];
                        existe = false

                        for (let e = 0; e < categorias.length; e++) {
                            const elemento = categorias[e].nombre;

                            if (categoria == elemento) {
                                existe = true
                            }
                        }
                    }

                    console.log(existe)

                    if (existe === false) {
                        reject('La categoria a la que el equipo participante se quiere inscribir no existe')
                    } else {
                        const nuevoEquipo = {
                            id: uuidv4(),
                            nombre: equipo.nombre,
                            miembros: equipo.miembros,
                            categorias_inscritas: equipo.categorias_inscritas
                        }

                        for (let i = 0; i < equipo.categorias_inscritas.length; i++) {
                            const categoria = equipo.categorias_inscritas[i];

                            for (let e = 0; e < categorias.length; e++) {
                                const elemento = categorias[e].nombre;

                                if (categoria == elemento) {
                                    categorias[e].equipos_participantes.push(equipo.nombre)
                                }
                            }
                        }

                        equipos.push(nuevoEquipo);
                        resolve('Se ha agregado exitosamente el equipo participante')
                    }
                }

            }
        })
    }

    listar() {
        return new Promise((resolve, reject) => {
            const resultado = equipos

            resolve(resultado);
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

    editar(equipo, id){
        return new Promise ((resolve, reject) => {
            if (!equipo.miembros) {
                reject('Faltan propiedades escenciales: miembros')
            } else {
                for (let i = 0; i < equipos.length; i++) {
                    if (id === equipos[i].id) {
                        equipos[i].miembros = equipo.miembros
    
                        resolve('Se ha editado exitosamente el equipo')
                    }
                }
    
                reject('No existe el equipo con el id indicado para editar')
            }
        })
    }

    eliminar(id) {
        return new Promise ((resolve, reject) => {

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

    eliminar(equipo, id) {
        return new Promise ((resolve, reject) => {
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