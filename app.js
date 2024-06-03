require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./database/connect')
const cartRoutes = require('./routes/cart')
const productsRoute = require('./routes/products')

//require and use security packages//
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const xss = require('xss-advanced')

app.set('trust proxy', 1)
// app.use(rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max:100
// }))
app.use(cors())
app.use(helmet())
app.use(xss())


//routes
app.use(express.json())
app.use('/audiophile',cartRoutes)
app.use('/audiophile', productsRoute)

//server start up linked database connection with below

const port = process.env.PORT || 4000

const start = async ()=>{
    try{
        await connectDB(process.env.connectString)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    }

    catch (err){
        console.log(err)
    }
}
start()

module.exports = app
