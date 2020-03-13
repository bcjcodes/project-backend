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

//@route    GET api/orders/:id
//@desc     Testing specific order route
//access       Public
//To check if a product has been ordered
router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const order = await Order.findById(req.params.id)
    res.json({ msg: 'Product has been ordered', data: order })
  } catch (err) {
    res.json({
      message: `Order with tracking number '${id}' has not been ordered, kindly visit the order page`
    })
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
    category: req.body.category,
    contact: req.body.contact
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

//@route      PUT api/orders/:id
//@desc       Updating orders
//@Public     access
router.patch('/:id', (req, res) => {
  const id = req.params.id
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        quantity: req.body.quantity,
        brand: req.body.brand,
        description: req.body.description,
        price: req.body.price,
        total: req.body.total,
        category: req.body.category,
        contact: req.body.contact
      }
    },
    { new: true, runValidators: true }
  )
    .then(order => res.json({ msg: 'Order Updated', data: order }))
    .catch(err =>
      // res.status(404).json({
      //   msg: `Order with the tracking number ${id} does not exist, visit the order page to make a purchase`
      // })
      console.log(err)
    )
})

//@route      DELETE api/orders/:id
//@desc       Deleting orders
//access      Public
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Order.findById(req.params.id)
    .then(order => {
      order.remove().then(() => res.json({ msg: 'Order Deleted', data: order }))
    })
    .catch(err =>
      res.status(404).json({
        msg: `Order with the tracking number ${id} does not exist, visit the order page to make a purchase`
      })
    )
})

module.exports = router
