const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const fs = require('fs')
const cors = require('cors')

const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
let money = 1000000000000

app.use(cors())
app.get('/', (req, res) => {
    res.send(`welcome`)
})

io.on('connect', (socket) => {
    console.log('socket on client is online');
    socket.emit('fetchData', {data, money})
    socket.on('update', ({newMoney, id}) => {
        data.forEach(el => {
            if (el.id === id) {
                el.stock -= 1
                money -= el.price
            }
        })
        io.emit('fetchData', {data, money})
    })
})

server.listen(port, () => {
    console.log(`listening ...`);
})