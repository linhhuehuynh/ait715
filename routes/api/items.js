const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get All Items
//@access Public 

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST api/items
//@desc Create an item
//@access Private 

router.post('/', auth, upload.single('photo'), (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        photo: req.file.path
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete an Item
//@access Private 

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;