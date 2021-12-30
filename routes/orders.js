const express = require('express')
const router = express.Router()
const Order = require('../models/orders')

//getting all orders
router.get('/', async (req, res) => {
    try{
        const orders = await Order.find()
        res.json(orders)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one 
router.get('/:id', getOrder ,  (req, res) => {
    res.json(res.order)
})
//creating one
router.post('/',  async (req, res) => {
    const order = new Order({
        nameClient: req.body.nameClient,
        nameOrder: req.body.nameOrder,
        priceOrder: req.body.priceOrder
    })

        try {
            const newOrder = await order.save()
            res.status(201).json(newOrder)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
})
//Updating one
router.patch('/:id', getOrder ,async (req, res) => {
    if (req.body.nameClient != null) {
        res.order.nameClient = req.body.nameClient
    }
    if (req.body.nameOrder != null) {
        res.order.nameOrder = req.body.nameOrder
    }
    if (req.body.priceOrder != null) {
        res.order.priceOrder = req.body.priceOrder
    }

    try {
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Deleting one
router.get('/:id', getOrder , async (req, res) => {
    try {
        await res.order.remove()
        res.json({ message: 'Order Deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id)
        if (order == null) {
            return res.status(404).json({ message: 'cannot find Order' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.order = order
    next()
}

module.exports = router