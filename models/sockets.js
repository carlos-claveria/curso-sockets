class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {

        this.io.on('connection', socket => {
            
            // mensaje para el servidor que llega desde un cliente
            socket.on('mensaje-to-server', data => {
                // mensaje para el cliente (acuse de recibo)
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            })
        })
    }
}

module.exports = Sockets;