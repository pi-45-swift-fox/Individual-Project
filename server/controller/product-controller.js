const fs =require('fs')

class Controller {
    static read (req,res) {
        const product=JSON.parse(fs.readFileSync('./db.json','utf-8'))
        res.status(200).json(product.products)
    }
}
module.exports = Controller