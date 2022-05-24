const houses = require('./db.json')

let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
        // console.log(houses)
    },
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address , price, imageURL} = req.body
        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        globalId++
        res.status(200).send(houses)

    },
    updateHouse: (req, res) => {
        let id = req.params.id;
        let type = req.body.type;

        let index = houses.findIndex((elem) => +elem.id === +id);

        if (houses[index].price >= 1000000 && type === "plus") {
            res.status(400).send("cannot set a rating above 5");
        } else if ((houses[index].price <= 0) & (type === "minus")) {
            res.status(400).send("cannot set a price below 0");
            return
        } else if (type === "plus") {
            houses[index].price+= 100000;
            if (houses[index].price >= 1000000){
                houses[index].price = 1000000
            }

            res.status(200).send(houses);
        } else if (type === "minus") {
            houses[index].price-= 10000;
            if (houses[index].price <= 0){
                houses[index].price = 0
            }
            res.status(200).send(houses);
        } else {
            res.sendStatus(400);
        }

    },
}