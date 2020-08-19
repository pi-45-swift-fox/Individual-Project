const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const game = require('./game');

io.on('connection', socket => {
    socket.emit('init', { msg: 'Hello' });
    socket.emit('game', game);
    socket.on('buy', id => {
        const product = game.products.filter((e, i) => e.id === id);
        if (product[0].stock) {
            if (game.money > product[0].price) {
                game.money -= product[0].price;
                game.products[product[0].id-1].stock--;
                socket.emit('game', game);
            } else {
                socket.emit('fail', 'money');
            }
        } else {
            socket.emit('fail', 'stock');
        }
    });
});

server.listen(3000, () => {
    console.log('Running: ' + 3000);
});