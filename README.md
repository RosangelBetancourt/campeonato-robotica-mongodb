# campeonato-robotica-mongodb

Para que el programa funcione debemos hacer los siguientes pasos:

1) Descargar el proyecto y descomprimirlo.
2) Usar el comando para instalar los paquetes "npm install".
3) Luego debemos crear el archivo ".env" con las siguientes variables:

MONGODB_HOST = '127.0.0.1:27017'
MONGODB_DATABASE = 'campeonato_robotica'
PORT = 3000
SECRET = 'clave_secreta'

4) Debemos tener instalada la base de datos MongoDB y tener creada la base de datos  "campeonato_robotica".
5) Usar el comando "npx nodemon" o "npm start".
6) Luego el servidor debe funcionar correctamente y debes utilizar los siguientes endpoints:

- http://localhost:3000/equipos (GET)
- http://localhost:3000/equipos/agregar (POST)
- http://localhost:3000/equipos/eliminar/:id (DELETE)
- http://localhost:3000/equipos/editar/:id (PUT)
- http://localhost:3000/equipos/anular/:id (DELETE)
- http://localhost:3000/equipos/porCategoria (GET)
- http://localhost:3000/equipos/agregar/categoria/:id (Nueva Funcionalidad) (POST)

- http://localhost:3000/modalidad (GET)
- http://localhost:3000/modalidad/agregar (POST)
 
- http://localhost:3000/categorias (GET)
- http://localhost:3000/categorias/agregar (POST)
- http://localhost:3000/categorias/editar (PUT)
- http://localhost:3000/categorias/eliminar (DELETE)

- http://localhost:3000/patrocinante (GET)
- http://localhost:3000/patrocinante/agregar (POST)
- http://localhost:3000/patrocinante/editar/:id (Nueva Funcionalidad) (PUT)
- http://localhost:3000/patrocinante/eliminar/:id (Nueva Funcionalidad) (DELETE)
