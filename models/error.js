const mongoose = require("mongoose")

const Schema = mongoose.Schema

const errorSchema = new Schema({
    message: { type: String, required: true },
})

const errorModel = mongoose.model("errors", errorSchema)

module.exports = { errorModel, errorSchema }