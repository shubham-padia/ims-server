'use strict';
var express = require('express');
var userImg = require('../../schemas/userImg');
var mongoose = require('mongoose');
var crypto = require('crypto');
var mime = require('mime');

//multer
var multer  = require('multer');
var multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ 
    storage: multerStorage,
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

        var newUserImg = userImg();
        newUserImg.userId = req.user.id;
        newUserImg.filename = req.file.filename;
        newUserImg.desc = req.body.desc;
        newUserImg.path = req.file.path;
        newUserImg.size = req.file.size;
        newUserImg.originalname = req.file.originalname;

        newUserImg.save(function(err){
            if(err){
                return err;
            }
            return console.log('filesaved');
        });

        res.json(req.file);
    });
});
    


