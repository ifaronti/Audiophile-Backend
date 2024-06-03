const express = require('express')
const app = express()
const Product = require('./models/products')
require('dotenv').config()
const connectDB = require('./database/connect')
const data = require('./data.json')

const port = process.env.PORT || 5000

const populate = async()=>{
    await connectDB(process.env.connectString)
    await Product.create(data)
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`)
    })
}

/* Only uncomment populate() if you want to load new data and
   either changed the data variable's location or 
   deleted the products collection in audiophile's database.
   Otherwise, there's be duplicate documents in the collection.
*/

// populate()