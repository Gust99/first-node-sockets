var socket = io.connect('http://localhost:8081', { 'forceNew': true });

socket.on('mensajes', function (data) {
    console.log(data);
    render(data);
});

function render (data) {
    var html = data.map(function (elem, index) {
        return (`<div>
                    <p><b>${elem.autor}</b></p>
                    <p>${elem.texto}</p>
                    <hr>
                </div>`);
    }).join(" ");
    document.getElementById("mensajes").innerHTML = html;
}

function addMensaje (e) {
    var payload = {
        autor: document.getElementById('autor').value,
        texto: document.getElementById('mensaje').value
    };
    socket.emit('nuevo-mensaje', payload);
    return false;
}