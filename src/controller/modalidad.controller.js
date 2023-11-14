const { modalidad } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

class Modalidad {

    agregar(modal){
        return new Promise ((resolve, reject) => {
            if (!modal.nombre) {
                reject('Faltan propiedades escenciales: Codigo o Nombre')
            } else {
                let nulo = false

                for (let i = 0; i < modalidad.length; i++) {
                    if (modalidad[i].nombre == modal.nombre) {
                        nulo = true
                    }
                }

                if (nulo) {
                    reject('Ya existe una modalidad con ese nombre')
                }

                const nuevaModalidad = {
                    id: uuidv4(),
                    nombre: modal.nombre,
                    categorias: []
                }
    
                modalidad.push(nuevaModalidad);
                resolve('Se ha agregado exitosamente la cuenta')
            }
        })
    }

    listar(){
        
        return new Promise ((resolve, reject) => {
            const resultado = modalidad

            resolve(resultado);
        })
    }
}

const modalidadesC = new Modalidad();
module.exports = modalidadesC;