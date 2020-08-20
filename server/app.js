const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

let money = 1000000000
const products = [
    {
        id: 1,
        title: 'Big Mac',
        price: 15000,
        stock: 56,
        image_url: 'https://images.unsplash.com/photo-1548946522-4a313e8972a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 2,
        title: 'Book',
        price: 50000,
        stock: 232,
        image_url: 'https://images.unsplash.com/photo-1565116175827-64847f972a3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 3,
        title: 'Video Game',
        price: 4000000,
        stock: 11,
        image_url: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 4,
        title: 'Movie Ticket',
        price: 35000,
        stock: 183,
        image_url: 'https://neal.fun/spend/images/movie-ticket.jpg'
    },
    {
        id: 5,
        title: 'JBL Audio Speaker',
        price: 2500000,
        stock: 80,
        image_url: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 6,
        title: 'Air Jordan',
        price: 5000000,
        stock: 5,
        image_url: 'https://images.unsplash.com/photo-1592860986140-d77ede8b7116?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 7,
        title: 'Air Jordan',
        price: 1800000,
        stock: 52,
        image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 8,
        title: 'Iphone 11 pro max',
        price: 18000000,
        stock: 35,
        image_url: 'https://images.unsplash.com/photo-1571654681830-ef991494a42a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 9,
        title: 'Rolex Watch',
        price: 99000000,
        stock: 35,
        image_url: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 10,
        title: 'Tesla Model 3',
        price: 2800000000,
        stock: 22,
        image_url: 'https://images.unsplash.com/photo-1565789655460-5ba30acce4be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 11,
        title: 'Apache Helicopter',
        price: 8000000000,
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1572355967233-560197307e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 12,
        title: 'Ferrari Advantage',
        price: 12000000000,
        stock: 4,
        image_url: 'https://images.unsplash.com/photo-1544218159-804cc66c696a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 13,
        title: 'Vespa',
        price: 49000000,
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1557073725-b890f79efd27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    },
    {
        id: 14,
        title: 'Seblak Bandung',
        price: 7000,
        stock: 100,
        image_url: 'https://sweetrip.id/wp-content/uploads/2020/07/dobeldough_106790123_204935690793086_6164640464645857646_n.jpg'
    },
    {
        id: 15,
        title: 'Nikon Camera',
        price: 5000000,
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
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
        socket.broadcast.emit('new-message',products)
        socket.emit('new-message',products)
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
        socket.broadcast.emit('new-money',money)
        socket.emit('new-money',money)
    })
})

server.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
})