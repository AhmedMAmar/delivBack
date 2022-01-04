const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurants')

//getting all orders
router.get('/', async (req, res) => {
    try{
        const restaurants = await Restaurant.find()
        res.json(restaurants)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id', getRestaurant ,  (req, res) => {
    res.json(res.restaurant)
})

//creating one
router.post('/',  async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        image: req.body.image,
        
    })

        try {
            const newRestaurant = await restaurant.save()
            res.status(201).json(newRestaurant)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
})

async function getRestaurant(req, res, next) {
    let restaurant
    try {
        restaurant = await Restaurant.findById(req.params.id)
        if (restaurant == null) {
            return res.status(404).json({ message: 'cannot find Restaurant' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.restaurant = restaurant
    next()
}