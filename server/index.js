const express = require('express')

const cors = require('cors')

const app = express()

const controllerFile = require('./controller')

app.use(express.json())
app.use(cors())



app.get('/api/houses', controllerFile.getHouses)
app.post('/api/houses', controllerFile.createHouse)
app.delete('/api/houses/:id', controllerFile.deleteHouse)
app.put('/api/houses/:id', controllerFile.updateHouse)


app.listen(4004, () => console.log('running on 4004'))