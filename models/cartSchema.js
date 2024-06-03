const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = new Schema(
        {
            name:String,
            quantity:Number,
            price:Number,
            slug:String,
        }
    
)

const listSchema = new Schema({
    items:[cartSchema],
    createdBy:String
}, {strict:true})

module.exports = mongoose.model('Cart', listSchema)
//ABOVE CAN BE WRITTEN LIKE BELOW
/*
cartSchema = new Schema({
    items:[
        {
            name:String,
            quantity:Number,
            slug:String,
            Price:Number,
            id:String
        }
    ]
  })

  module.exports = mongoose.model('Cart', cartSchema)

  */