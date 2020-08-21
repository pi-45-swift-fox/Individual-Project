const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const Controller = require('./controller/product-controller')
const cors = require ('cors')

app.use(cors())
app.get('/products',Controller.read)

io.on('connection', socket => { 
    console.log('socket io connected') 
    socket.emit('init', {content: 'connected to server'})
    socket.on('clientPurchase', function(payload){
        console.log(payload)
        socket.broadcast.emit('coba1', payload)
    })
});

server.listen(3000,()=>{
    console.log('listening to server')
});