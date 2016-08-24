var express = require('express');

//multer
var multer  = require('multer');
var upload = multer({ 
    dest: 'server/public/uploads/',
    limits: {
        fileSize: 1024 * 3072
    },
    fileFilter: function fileFilter (req,file, cb) {
    if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            console.log("enter a valid image file");
            req.mimeTypeError = 'mimeTypeError';
            return cb(null, false, new Error('mimeTypeError'));
        }
    return cb(null, true);
    }
});

//
var router = express.Router();
module.exports = router;
//

//authentication
var authCheck = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
    res.json({access: "unauthorized"});    
};
//

//
router.post('/upload',authCheck, function (req, res) {
    upload.single('fileUpload')(req, res, function (err) {
        if(err || req.mimeTypeError){
            return res.json({success: false});
        }
        res.json(req.file);
    });
});
    


