var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'server/public/uploads/' });
var router = express.Router();
module.exports = router;

router.post('/upload',upload.single('fileUpload'),function (req, res, next) {
    console.log(req.file);
    res.status(204).end();
});

