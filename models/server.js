// Servidor de Express
const express = require('express');
// Servidor de sockets
const http = require('http');
// 
const socketio = require('socket.io');

const path = require('path');
const cors = require('cors');


const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer(this.app);

        // configuración de sockets
        this.io = socketio(this.server,{
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
                }
            }
        );

    }

    socketsConfig() {
        new Sockets( this.io );
    } 

    execute() {
        // Inicializar middelwares
        this.middlewares();

        // Incializar sockets
        this.socketsConfig();

        // Iniciar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto : ',this.port);
        });
    }

    middlewares() {
        // Desplegar el directorio público 
        this.app.use(express.static(path.resolve(__dirname,'../public')));

        // CORS
        this.app.use( cors() );
    }

}

module.exports = Server;