const express = require('express')
const router = express.Router()
const Helper = require('./helper')
const uuid = require('uuid')

//Load Order Model
const Order = require('../../models/Order')

//@route    GET api/orders/
//@desc     Check for all available orders
//access       Public
router.get('/', async (req, res) => {
  try {
    const order = await Order.find()
    if (order.length < 1){
      res.status(404).json({ 
        status: 'error',
        error: 'No products were found',  
      })
      
    }else{
      
      res.status(200).json({
        status:'success',  
        data: {
          message: 'Available Products',
          order
        },
        image_link: "https://res.cloudinary.com/oluwamayowaf/image/upload/v1584127777/",
        image_small_view_format: "w_200,c_thumb,ar_4:4,g_face/" })
    
    }
    
  } catch (err) {
    res.json({ msg: 'No available orders' })
  }
})

//@route    GET api/orders/:id
//@desc     Testing specific order route
//access       Public
//To check if a product exists 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
try{
  Order.find({ _id: id }, (error, order) => {
    if (!error && order) {
      res.status(200).json({ 
        status: 'success',
        data:{
          message: 'Product has been created', 
          order,
        },
        image_link: "https://res.cloudinary.com/oluwamayowaf/image/upload/v1584127777/",
        image_small_view_format: "w_200,c_thumb,ar_4:4,g_face/"     
     })
    } else {
      res.status(404).json({ 
        status: 'error',
        error: `Product with tracking number '${id}' does not exist`,  
      })
  
  } 
 })
}catch (err) {
  res.status(500).json({
    status: 'error', 
    error: 'Something went wrong please try again',
    hint: err
  })
 }
})
 
//@route    POST api/orders
//@desc     Creating order route
//access       Public
//Create an order
router.post('/', async (req, res) => {

  if(!req.body.name || !req.body.quantity || !req.body.description
    || !req.body.price || !req.body.category) {
      res.status(400).json({ 
        status: 'error',
        data:{
          message: `The following fields are compulsory: name, quantity, description, price and category`, 
  
        }
    })
}
 try{
  if(req.files.image && req.files.image.size > 1){
    imageRes = await Helper.uploadToCloudinary(req.files.image)
    imageLink = `${imageRes.public_id}.${imageRes.format}`;
  }else{
    imageLink='SCA/noimage.jpg';

  }
  const newOrder = new Order({
    name: req.body.name,
    quantity: req.body.quantity,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    total: req.body.total,
    category: req.body.category,
    contact: req.body.contact,
    image: imageLink, 
  })

  const amountTotal = Number(newOrder.quantity) * Number(newOrder.price)
  newOrder.total = amountTotal

  newOrder
    .save()
    .then(order =>
      res.status(200).json({ 
      status: 'success',
      data:{
        message: 'Order Created Successfully', 
        order,
      },
      image_link: "https://res.cloudinary.com/oluwamayowaf/image/upload/v1584127777/",
      image_small_view_format: "w_200,c_thumb,ar_4:4,g_face/" })
    )
    .catch(err => 
      console.log(err)
      
    )
  }catch(error){
    res.status(500).json({
      status:'error',
      error:'Something went wrong please try again',
      hint: error
    })
    console.log(error)
  }
})

//@route      PUT api/orders/:id
//@desc       Updating orders
//@Public     access
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const orderOld = await Order.findById(req.params.id)
  let imageLink = orderOld.image;
  if(req.files.image && req.files.image.size > 1){
    imageRes = await Helper.uploadToCloudinary(req.files.image)
    imageLink = `${imageRes.public_id}.${imageRes.format}`;
  }
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name ? req.body.name : orderOld.name,
        quantity: req.body.quantity ? req.body.quantity : orderOld.quantity,
        brand: req.body.brand ? req.body.brand : orderOld.brand,
        description: req.body.description ? req.body.description : orderOld.description,
        price: req.body.price ? req.body.price : orderOld.price,
        total: req.body.total ? req.body.total : orderOld.total,
        category: req.body.category ? req.body.category : orderOld.category,
        contact: req.body.contact ? req.body.contact : orderOld.contact,
        image: imageLink
      }
    },
    { new: true, runValidators: true }
  )
    .then((order) => {
        res.status(201).json({ 
          status: 'success',
          data:{
            message: 'Product Updated Successfully', 
            order
          },
          image_link: "https://res.cloudinary.com/oluwamayowaf/image/upload/v1584127777/",
          image_small_view_format: "w_200,c_thumb,ar_4:4,g_face/"
         
        })
    })
    .catch((err)=>{
      res.status(404).json({
        status: 'error',
        error: `Order with the tracking number ${id} does not exist, visit the order page to make a purchase`,
        hint: err
       })
      console.log(err)
    }
     
    )
})

//@route      DELETE api/orders/:id
//@desc       Deleting orders
//access      Public
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Order.findById(req.params.id)
    .then(order => {
      order.remove().then(() => res.status(201).json({ 
        status: 'success',
        data: { 
          message: 'Order Deleted',
          order } 
         }))
    })
    .catch(err =>
      res.status(404).json({
        status: 'error',
        error: `Order with the tracking number ${id} does not exist, visit the order page to make a purchase`
      })
    )
})

module.exports = router
