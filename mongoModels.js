const mongoose = require('mongoose')

const schema = {
    id: Number,
    name: String,
    email: String,
    pass: String
}

const mongoModel = mongoose.model('nicho', schema);

const counterSchema = {
    id: Number
}

const mongoCounterModel = mongoose.model('counter', counterSchema);

module.exports = { schema, counterSchema, mongoCounterModel, mongoModel }