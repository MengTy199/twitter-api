const express = require('express')
const router = express.Router()
const { getTweetById , getAllTweets, createTweet,addImage} = require("../controllers/tweetController.js")
const {validateObjectId} = require("../middlewares/index.js")

const multer  = require('multer')
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
const upload = multer({ storage: storage })
router.post("/:id/image", validateObjectId, upload.single("image"), addImage)

router.get('/', getAllTweets );

router.get('/:id', getTweetById)

router.post('/', createTweet) 

module.exports = router
