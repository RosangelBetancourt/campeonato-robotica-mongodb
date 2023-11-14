const { patrocinantes, modalidad } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

class Patrocinantes {

    agregar(patrocinante) {
        return new Promise ((resolve, reject) => {
            if (!patrocinante.nombre || !patrocinante.rif || !patrocinante.modalidad_patrocinada) {
                reject('Faltan propiedades escenciales: nombre, rif y modalidad_patrocinada')
            } else {
                let patrocinio = "no existe";

                for (let i = 0; i < modalidad.length; i++) {
                    const elemento = modalidad[i].nombre;
                    if( elemento == patrocinante.modalidad_patrocinada) {
                        patrocinio = patrocinante.modalidad_patrocinada
                        
                    }
                }

                if (patrocinio === "no existe") {
                    reject('No existe ninguna la modalidad que deseas patrocinar')
                } else {
                    const nuevoPatrocinante = {
                        id: uuidv4(),
                        nombre: patrocinante.nombre,
                        rif: patrocinante.rif,
                        modalidad_patrocinada: patrocinio
                    }
        
                    patrocinantes.push(nuevoPatrocinante);
                    resolve('Se ha agregado exitosamente el Patrocinante')
                }
            }
        })
    }

    listar(){
        return new Promise ((resolve, reject) => {
            const resultado = patrocinantes

            resolve(resultado);
        })
    }
}

const patrocinantesC = new Patrocinantes();
module.exports = patrocinantesC;