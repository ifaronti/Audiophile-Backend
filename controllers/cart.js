const Item = require('../models/cartSchema')

const getCart = async (req, res)=>{
    const {createdBy} = req.query
    const items = await Item.find({createdBy:createdBy})
    res.status(200).json(items)
}
const getCartByid = async (req, res)=>{
    const {id} = req.params
    const items = await Item.find({_id:id})
    res.status(200).json(items[0])
}

const updateCart = async (req, res)=>{
    const {name, quantity} = req.body
    const item = await Item.updateOne({_id:req.params.id, "items.name":name }, {"$set":{"items.$.quantity":quantity}}, {new:true})

    if(!name || !quantity){
        return res.status(404).json({success:false, msg:`No item with id ${name} in cart`})
    }
    res.status(201).json(item)
}

const putToCart = async(req, res)=>{
    const {id} = req.params
    const add = await Item.findOneAndUpdate({_id:id},{"$push":{"items":req.body}}, {new:true})
    if(!add){
      return res.status(402).json({success:false, msg:`No Item in cart with id ${id}`})
    }
    res.status(201).json(add)
}

const deleteItem = async (req, res)=>{
    const {id} = req.params
    await Item.updateOne({_id:id}, {"$pull":{"items":req.body}})
    
    res.status(203).json({success:true, msg:'Item deleted from cart'})
}
const deleteAll = async (req, res)=>{
    const {id} = req.query
    await Item.findByIdAndDelete({_id:id})

    res.status(203).json({success:true, msg:'Cart items in it successfully deleted'})
}
const postCart = async (req, res)=>{
    const {createdBy} = req.query
    const item = await Item.create({items:[{...req.body}], createdBy:createdBy})
    
    res.status(202).json({success:true, msg:'Item added to cart collection', id:item._id})
}

module.exports = {getCart, updateCart, getCartByid, 
                  deleteAll, putToCart, deleteItem, 
                  postCart
                 }