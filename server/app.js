const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs')
const PORT = process.env.PORT || 3000

let money = 1000000000
let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

io.on('connect', function (socket) {
    console.log('Socker.io client connected');
    socket.emit('init', {
        products,
        money
    })

    socket.on('new-message', function (payload) {
        products.forEach(product => {
            if (product.id === payload.id) {
              if (product.price < money) {
                if (product.stock > 0) {
                    money = money - product.price
                    product.stock--     
                }
              }  
            }
          })
        console.log(payload);
        socket.broadcast.emit('init',{
            products,
            money
        })
        socket.emit('init',{
            products,
            money
        })
    })

    socket.on('disconnect', () => {
        money = 1000000000
        products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    })
})

server.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
})