const { v4: uuidv4 } = require('uuid');


const modalidad = [{
    id: uuidv4(),
    nombre: "Carros Autonomos",
    categorias: ["Auto seguidor de línea"]
}];

const categorias = [{
    id: uuidv4(),
    nombre: "Auto seguidor de línea",
    tipo_de_robot: "Auto autónomo que pueda seguir líneas negras",
    premio: "$250",
    equipos_participantes: ["Los invencibles"],
    modalidad: "Carros Autónomos"
}];

const equipos = [{
    id: uuidv4(),
    nombre: "Los invencibles",
    miembros: ["Juan", "Lupita", "Fabricio"],
    categorias_inscritas: ["Auto seguidor de línea"]
}];

const patrocinantes = [{
    id: uuidv4(),
    nombre: "HHR repuestos",
    rif: "j-40512546",
    modalidad_patrocinada: "Carros Autonomos"
}]

module.exports = {
    modalidad,
    categorias,
    equipos,
    patrocinantes
}