const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

let money = 5000000000
const products = [
    {
        id: 1,
        title: 'Air Jordan 1',
        price: 5000000,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1592860986140-d77ede8b7116?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 2,
        title: 'Air pods 2',
        price: 1800000,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 3,
        title: 'Iphone 11 pro max',
        price: 2400000,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1571654681830-ef991494a42a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 4,
        title: 'Rolex Watch',
        price: 300000000,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 5,
        title: 'Vespa',
        price: 49000000,
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1557073725-b890f79efd27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
]
io.on('connect', function (socket) {
    console.log('Socker.io client connected');
    socket.emit('init', products)
    socket.emit('init-money', money)

    socket.on('new-message', function (payload) {
        products.forEach(product => {
            if (product.id === payload.id) {
                if (product.price < money) {
                    if (product.stock > 0) {
                        product.stock--
                    }
                }
            }
        })
        console.log(payload);
        socket.broadcast.emit('new-message', products)
        socket.emit('new-message', products)
    })

    socket.on('new-money', function (payload) {
        products.forEach(product => {
            if (product.id === payload.id) {
                if (product.price < money) {
                    if (product.stock > 0) {
                        money = money - product.price
                    }
                }
            }
        })
        console.log(payload);
        socket.broadcast.emit('new-money', money)
        socket.emit('new-money', money)
    })
})

server.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
})