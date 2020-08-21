const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')
const port = process.env.PORT || 3000

let item = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
let balance = 1000000000

io.on('connect', (socket) => {
    console.log('connect Socket')
    socket.emit('fetchData', {item, balance})
    
    socket.on('buyItem', payload => {
        balance -= payload.price
        item.forEach(e => {
            if(e.id === payload.id) {
                e.stock--
            }
        });
        socket.broadcast.emit('fetchData', {item, balance})
    })


})

server.listen(port, () => {
    console.log('server running');
})