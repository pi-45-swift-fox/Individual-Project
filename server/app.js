const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(cors())

let money;
let items;

io.on('connection', socket => {
  console.log('User Connected');
  socket.on('test', payload => {
    if (!money && !items)
    {
      money = payload.money;
      items = payload.items;
    }
    io.emit('get-data', {money, items})
  })

  socket.on('buy-item', payload => {
    money = payload.money;
    items = payload.items;
    io.emit('get-data', {money, items})
  })
});

server.listen(port, () => console.log('lisinteng at port', port));
