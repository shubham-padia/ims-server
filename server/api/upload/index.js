var express = require('express');
var multer  = require('multer');
var upload = multer({ 
    dest: 'server/public/uploads/',
    limits: {
        fileSize: 1024 * 3072
    },
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {
        console.log('uploading the specified file');
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            console.log("enter a valid image file");
            return false;
        }
    }});

var router = express.Router();
module.exports = router;

router.post('/upload',function (req, res) {
    upload.single('fileUpload')(req, res, function (err) {
        if(err){
            return res.end('{"status": "fail"}');
        }
        res.end(req.file);
    });
    
});

