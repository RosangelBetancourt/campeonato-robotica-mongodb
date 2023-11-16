# campeonato-robotica-mongodb

Para que el programa funcione debemos hacer los siguientes pasos:

1) Descargar el proyecto y descomprimirlo.
2) Usar el comando para instalar los paquetes "npm install".
3) Luego debemos crear el archivo ".env" con las siguientes variables:

MONGODB_HOST = '127.0.0.1:27017'
MONGODB_DATABASE = 'campeonato_robotica'
PORT = 3060

4) Debemos tener instalada la base de datos MongoDB y tener creada la base de datos  "campeonato_robotica".
5) Usar el comando "npx nodemon" o "npm start".
6) Luego el servidor debe funcionar correctamente y debes utilizar los siguientes endpoints:

- http://localhost:3000/equipos
- http://localhost:3000/equipos/agregar
- http://localhost:3000/equipos/eliminar/:id
- http://localhost:3000/equipos/editar/:id
- http://localhost:3000/equipos/anular/:id
- http://localhost:3000/equipos/porCategoria
- http://localhost:3000/equiposagregar/categoria/:id

- http://localhost:3000/modalidad
- http://localhost:3000/modalidad/agregar

- http://localhost:3000/categorias
- http://localhost:3000/categorias/agregar
- http://localhost:3000/categorias/editar
- http://localhost:3000/categorias/eliminar

- http://localhost:3000/patrocinantes
- http://localhost:3000/patrocinantes/agregar
- http://localhost:3000/patrocinantes/editar/:id
- http://localhost:3000/patrocinantes/eliminar/:id
