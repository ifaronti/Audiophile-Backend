const Product = require('../models/products')

const getProducts = async(req, res)=>{
    const {slug, category} = req.query
    const searchObj = {}

    if(slug){
        searchObj.slug = slug
    }

    if(category){
        searchObj.category = category
    }

    const products = await Product.find(searchObj)

    if(!products){
        res.status(404).json({success:false, msg:`can't find item with provided query values`})
    }

    res.status(200).json({products})
}

const getProduct = async(req, res)=>{
    const {id} = req.params
    const product = await Product.findById({_id:id})

    if(!product){
        return res.status(404).json({success:false, msg:`No item with id ${id} in my precious dabatase`})
    }

    res.status(200).json(product)
}


module.exports = {getProduct, getProducts}