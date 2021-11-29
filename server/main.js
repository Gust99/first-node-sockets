var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
    id: 1,
    texto: "Mensaje",
    autor: "Server"
}];

app.use(express.static('client'));

app.get('/hello', function (req, res) {
    res.status(200).send('Hello world');
});

io.on('connection', function (socket) {
    console.log('Nueva conexion con socket');
    socket.emit('mensajes', mensajes);
    socket.on('nuevo-mensaje', function (data) {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });
});

server.listen(8081, function () {
    console.log('Corriendo');
});