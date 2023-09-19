// HTTP Methods

const PORT = 3002;
const express = require('express');
const server = express();
const dao = require('../groceryDao/grocerydao.js');
const bodyParser = require('body-parser');
const uuid = require('uuid')


server.use(bodyParser.json());

server.get('/', (req, res) => {
    const body = req.body;

    dao.getItem(body.grocery_item_id)
        .then((data) => {
            console.log(data);
            res.send(data.Item.name);
        })
        .catch((err) => {
            res.send({
                message: "Failed to get Item!"
            });
            console.error(err);
        })



});
function validateNewItem(req, res, next) {
    if (!req.body.name || !req.body.quantity || !req.body.price) {
        req.body.valid = false;
        next();
    } else {
        req.body.valid = true;
        next();
    }
}

server.post('/groceryitems', validateNewItem, (req, res) => {
    const body = req.body;
    if (req.body.valid) {
        dao.postItem(uuid.v4(), body.name, body.quantity, body.price)
            .then((data) => {
                res.send({
                    message: "Successfully Added Item!"
                })
            })
            .catch((err) => {
                res.send({
                    message: "Failed to Add Item!"
                });
                console.error(err);
            })
    } else {
        res.send({
            message: "Invalid Item properties"
        })
    }
})
server.put('/update', (req, res) => {
    const body = req.body;

    dao.putItem(body.grocery_item_id, body.newName)
        .then((data) => {
            res.send({
                message: "Successfully updated Item!"
            })
        })
        .catch((err) => {
            res.send({
                message: "Failed to update Item!"
            });
            console.error(err);
        })

});
server.delete('/delete', (req, res) => {
    const body = req.body;
    dao.deleteItem(body.grocery_item_id)
        .then((data) => {
            res.send({ message: 'item deleted successfully' });
        })
        .catch((err) => {
            res.send({
                message: 'failed to delete'
            });

            console.error(err);
        })
});
server.listen(PORT, () => {
    console.log(`server is listenign on port: ${PORT}`);
});




module.exports = server;