const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({}, {strict:false})

module.exports=mongoose.model('Products', productSchema)