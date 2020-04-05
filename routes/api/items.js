const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary');
const config = require('config')

//Multer configuration
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i)) {
        cb(new Error('Only image files are accepted!'), false);
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


//Cloudinary Configuration
cloudinary.config({
    cloud_name: 'mycloud88',
    api_key: config.get('CLOUDINARY_API_KEY'),
    api_secret: config.get('CLOUDINARY_API_SECRET')
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
    cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            res.json(err.message);
        }
        req.body.photo = result.secure_url;

        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            photo: result.secure_url
        });

        newItem.save().then(item => res.json(item));
    })
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