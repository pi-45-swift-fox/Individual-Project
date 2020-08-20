const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
let money = 1000000000000

io.on('connect', (socket)=>{
    console.log('Socket.io client connected BROH')
    socket.emit('fetchData', {data, money})

    socket.on('update', ({newMoney, id}) => {
        data.forEach(el => {
            if(el.id == id){
                el.stock -=1
                money -= el.price
            }
        });
        io.emit('fetchData', {data, money})
    })
})

server.listen(3000, ()=>{
    console.log(`listening on port 3000`)
})