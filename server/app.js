const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000
let money = 1000000000000
let products = [
    { id: 1, name: 'Big Mac', stock: 200, price: 25000, img_url: 'https://neal.fun/spend/images/big-mac.jpg' },
    { id: 2, name: 'Nintendo Switch', stock: 54, price: 4000000, img_url: 'https://www.nintendo.com/content/dam/noa/en_US/hardware/switch/nintendo-switch-new-package/gallery/package_redblue.jpg' },
    { id: 3, name: 'Air Jordans', stock: 33, price: 5000000, img_url: 'https://neal.fun/spend/images/air-jordans.jpg' },
    { id: 4, name: 'I-Phone', stock: 69, price: 15000000, img_url: 'https://neal.fun/spend/images/smartphone.jpg' },
    { id: 5, name: 'Corsair HS-70', stock: 120, price: 1500000, img_url: 'https://images-na.ssl-images-amazon.com/images/I/61XjjJovijL._AC_SX522_.jpg' },
    { id: 6, name: 'Lamborghini Aventador', stock: 7, price: 6500000000, img_url: 'https://redfoxluxurycarhire.com/assets/img/upload/car_images/1497193132.webp' },
    { id: 7, name: 'Ryzen 5 3600', stock: 33, price: 3000000, img_url: 'https://cf.shopee.co.id/file/3e6cc27aeee5f0695360bcef4215f103' },
    { id: 8, name: 'hunian agung podomoro, besok naik harga', stock: 70, price: 4000000000, img_url: 'https://cdn-z.sindonews.net/dyn/620/content/2019/12/03/34/1464829/agung-podomoro-land-bidik-pasar-sumatera-utara-3Z2-thumb.jpg' },
    { id: 9, name: 'Free Food For Life. No Expiry Date', stock: 2, price: 900000000000, img_url: 'https://i0.wp.com/ingersollchamber.com/wp-content/uploads/2017/07/ticket-clipart-purge-clipart-ticket-85041.jpg?fit=2600%2C2737&ssl=1' }
]

io.on('connect', socket => {

    socket.emit('products', products)
    socket.emit('money', money)

    socket.on('new-data', (payload) => {
        products.forEach(product => {
            if (product.name == payload.name) {
                money -= payload.price
                product.stock--
            }
        });
        socket.broadcast.emit('products', products)
        socket.broadcast.emit('money', money)
    })

    socket.on('disconnect', () => {
        money = 1000000000000
        products = [
            { id: 1, name: 'Big Mac', stock: 200, price: 25000, img_url: 'https://neal.fun/spend/images/big-mac.jpg' },
            { id: 2, name: 'Nintendo Switch', stock: 54, price: 4000000, img_url: 'https://www.nintendo.com/content/dam/noa/en_US/hardware/switch/nintendo-switch-new-package/gallery/package_redblue.jpg' },
            { id: 3, name: 'Air Jordans', stock: 33, price: 5000000, img_url: 'https://neal.fun/spend/images/air-jordans.jpg' },
            { id: 4, name: 'I-Phone', stock: 69, price: 15000000, img_url: 'https://neal.fun/spend/images/smartphone.jpg' },
            { id: 5, name: 'Corsair HS-70', stock: 120, price: 1500000, img_url: 'https://images-na.ssl-images-amazon.com/images/I/61XjjJovijL._AC_SX522_.jpg' },
            { id: 6, name: 'Lamborghini Aventador', stock: 7, price: 6500000000, img_url: 'https://redfoxluxurycarhire.com/assets/img/upload/car_images/1497193132.webp' },
            { id: 7, name: 'Ryzen 5 3600', stock: 33, price: 3000000, img_url: 'https://cf.shopee.co.id/file/3e6cc27aeee5f0695360bcef4215f103' },
            { id: 8, name: 'hunian agung podomoro, besok naik harga', stock: 70, price: 4000000000, img_url: 'https://cdn-z.sindonews.net/dyn/620/content/2019/12/03/34/1464829/agung-podomoro-land-bidik-pasar-sumatera-utara-3Z2-thumb.jpg' },
            { id: 9, name: 'Free Food For Life. No Expiry Date', stock: 2, price: 900000000000, img_url: 'https://i0.wp.com/ingersollchamber.com/wp-content/uploads/2017/07/ticket-clipart-purge-clipart-ticket-85041.jpg?fit=2600%2C2737&ssl=1' }
        ]
    })
});

server.listen(port, () => {
    console.log(`server listening to port ${port}`)
});
