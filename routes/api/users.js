const express = require('express')
const router = express.Router()
const uuid = require('uuid')

//Load Order Model
const Order = require('../../models/Order')

//@route    GET api/orders/test
//@desc     Testing order route
//access       Public
router.get('/test', (req, res) => res.json({ msg: 'Test Worked!!' }))

module.exports = router
