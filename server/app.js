const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')
const PORT = process.env.PORT || 3000
let money = 1000000000000
let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

io.on('connect', (socket)=>{

    console.log('Socket.io client connected');
    socket.emit('products', {
        products,
        money
    })

    socket.on('newUpdate', (payload) => {
        products.forEach(el => {
            if(el.id == payload.id) {
                money -= payload.price
                el.stock--
            }
        });

        socket.broadcast.emit('products', {
            products,
            money
        })
    })

    socket.on('disconnect', () => {
        money = 1000000000000
        products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    });
})

server.listen(PORT, () => {
    console.log('Listen at Port:', PORT);
})