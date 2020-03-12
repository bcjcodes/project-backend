const express = require('express')
const router = express.Router()
const uuid = require('uuid')

//Load Order Model
const Order = require('../../models/Order')

//@route    GET api/orders/
//@desc     Check for all available orders
//access       Public
router.get('/', async (req, res) => {
  try {
    const order = await Order.find()
    res.json({ msg: 'Available Orders', data: order })
  } catch (err) {
    res.json({ msg: 'No available orders' })
  }
})

//@route    GET api/orders/:_id
//@desc     Testing specific order route
//access       Public
//To check if a product has been ordered
router.get('/:_id', async (req, res) => {
  try {
    const order = await Order.findById(req.params._id)
    res.json({ msg: 'Product has been ordered', data: order })
  } catch (err) {
    res.json({ message: 'Product not ordered, kindly visit the order page' })
  }
})

//@route    POST api/orders
//@desc     Creating order route
//access       Public
//Create an order
router.post('/', (req, res) => {
  const newOrder = new Order({
    name: req.body.name,
    quantity: req.body.quantity,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    total: req.body.total,
    category: req.body.category
  })

  const amountTotal = Number(newOrder.quantity) * Number(newOrder.price)
  newOrder.total = amountTotal

  newOrder
    .save()
    .then(order =>
      res.status(200).json({ msg: 'Order Created Successfully', data: order })
    )
    .catch(err => console.log(err))
})

module.exports = router
