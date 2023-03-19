const express = require('express');
const mongoose = require('mongoose');
const models = require('./mongoModels');
const app = express();

const HTTPS_PORT: Number = 8080;
const STATUS_OK = 200

interface User{
    lat: Number,
    email: String,
    pass: String
};

app.use(express.json());
app.set('view engine', 'hbs');

app.get('/', (req, res, err) => {
    res.render('index');
})

app.get('/find', (req, res, err) => {
    res.render('find');
})


mongoose.connect('mongodb://localhost:50000/myproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.post('/users/', async (req, res) => {

    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;

    const newId = (await models.mongoCounterModel.find({})).length == 0 ? 0 : (await models.mongoCounterModel.find({})).length
    console.log(newId)

    const data = new models.mongoModel({
        id: newId,
        name: name,
        email: email,
        pass: pass
    })

    console.log(data)

    data.save();

    const counterData = new models.mongoCounterModel({
        id: newId
    })

    counterData.save();

    res.send('ok').status(STATUS_OK);
})

app.get('/users/', async(req, res) => {

    
    console.log('FIND ALL')

    const userData = await models.mongoModel.find({ })
    console.log(userData)
    res.send(userData).status(STATUS_OK);

})

app.get('/users/:name', async(req, res) => {
    const name = req.params.name
    const email = req.query.email
    
    console.log('finding: ', name)
    console.log(email)

    if(email == undefined) {
        const userData = await models.mongoModel.find({ name: name })
        console.log(userData)
        res.send(userData).status(STATUS_OK);
    }

    else{
        const userData = await models.mongoModel.find({ email: email})
        console.log(userData)
        res.send(userData).status(STATUS_OK);
    }

})

app.get('/users/:name/:email', async(req, res) => {
    
    const name = req.params.name
    const email = req.params.email

    console.log('finding: ', name + ' ' + email)

    const userData = await models.mongoModel.find({ name: name, email: email})
    console.log(userData)
    res.send(userData).status(STATUS_OK);

})

app.listen(HTTPS_PORT, (req, res, err) => {
    if (err) {
        console.error(err);
    }
    console.log('listening on port: ' + HTTPS_PORT);
})