const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config')

//Item Model
const RequestItem = require('../../models/RequestItem');


//@route GET api/items
//@desc Get All Items
//@access Public 

router.get('/', (req, res) => {
    RequestItem.find()
        .sort({ date: -1 })
        .then(requestitems => res.json(requestitems))
});


//@route POST api/items
//@desc Create an item
//@access Private 

router.post('/', auth, (req, res) => {
    const newItem = new RequestItem({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    });

    newItem.save().then(requestitem => res.json(requestitem));
});

module.exports = router;