const router = require("express").Router();
const uploader = require("../middlewares/uploader")

// POST "/upload" => Get img from frontEnd and send it to cloudinary and url to frontend
router.post("/", uploader.single("imageUrl"), (req, res, next) => {

    if(req.file === undefined){
        res.status(400).json({errorMessage: "No Image or Invalid image format"})
        return;
    }

    res.json({imageUrl: req.file.path})

})

module.exports = router;