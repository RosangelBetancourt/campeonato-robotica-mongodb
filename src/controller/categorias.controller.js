const { categorias, modalidad, equipos } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

class Categoria {

    agregar(categoria) {
        return new Promise((resolve, reject) => {
            if (!categoria.nombre || !categoria.tipo_de_robot || !categoria.premio || !categoria.modalidad) {
                reject('Faltan propiedades escenciales: nombre, tipo_de_robot, premio y modalidad')
            } else {
                let repetido = false

                for (let i = 0; i < categorias.length; i++) {
                    if (categorias[i].nombre == categoria.nombre) {
                        repetido = true
                    }
                }

                if (repetido) {
                    reject('Ya existe una categoria con ese nombre debe cambiarla')
                } else {
                    let nulo = true

                    for (let i = 0; i < modalidad.length; i++) {
                        if (modalidad[i].nombre == categoria.modalidad) {
                            nulo = false
                            modalidad[i].categorias.push(categoria.nombre)
                        }
                    }

                    if (nulo) {
                        reject('La modalidad a la que quieres agrega la categoria no existe')
                    } else {
                        const nuevaCategoria = {
                            id: uuidv4(),
                            nombre: categoria.nombre,
                            tipo_de_robot: categoria.tipo_de_robot,
                            premio: categoria.premio,
                            equipos_participantes: [],
                            modalidad: categoria.modalidad,
                        }

                        categorias.push(nuevaCategoria);
                        resolve('Se ha agregado exitosamente la Factura')
                    }
                }
            }
        })
    }

    listar() {
        return new Promise((resolve, reject) => {
            const resultado = categorias

            resolve(resultado);
        })
    }

    editar(categoria, id){
        return new Promise ((resolve, reject) => {
            if (!categoria.premio || !categoria.tipo_de_robot) {
                reject('Faltan propiedades escenciales: premio y tipo_de_robot')
            } else {
                for (let i = 0; i < categorias.length; i++) {
                    if (id === categorias[i].id) {
                        categorias[i].premio = categoria.premio;
                        categorias[i].tipo_de_robot = categoria.tipo_de_robot
    
                        resolve('Se ha editado exitosamente la categoria')
                    }
                }
    
                reject('No existe la categoria con el id indicado para editar')
            }
        })
    }

    eliminar(id) {
        return new Promise ((resolve, reject) => {

            let nombre_categoria = ''

            for (let i = 0; i < categorias.length; i++) {
                if (id === categorias[i].id) {
                    nombre_categoria = categorias[i].nombre
                    categorias.splice(i, 1)

                    for (let o = 0; o < modalidad.length; o++) {
                        for (let u = 0; u < modalidad[o].categorias.length; u++) {
                            if (modalidad[o].categorias[u] == nombre_categoria) {
                                modalidad[o].categorias.splice(u, 1)
                            }
                        }
                    }

                    for (let a = 0; a < equipos.length; a++) {
                        for (let e = 0; e < equipos[a].categorias_inscritas.length; e++) {
                            if (equipos[a].categorias_inscritas[e] == nombre_categoria) {
                                equipos[a].categorias_inscritas.splice(e, 1)
                            }
                        }                        
                    }
                    resolve('Se ha eliminado exitosamente la categoria')
                }
            }

            reject('No existe una categoria con el id indicado para eliminar')
        })
    }
}

const categoriasC = new Categoria();
module.exports = categoriasC;