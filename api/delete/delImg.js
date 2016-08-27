var express = require('express');
var router = express.Router();
var fs = require('fs');
module.exports = router;
var UserImg = require('../../schemas/userImg');

//authentication
var authCheck = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ access: "unauthorized" });
};
//

router.post('/:imgName', authCheck, function (req, res, next) {
    UserImg.findOne({filename: req.params.imgName},function(err, img){
        if(err){
            console.log(err);
            return res.json({success: false});
        }
        if(img == null || img == undefined){
            return res.json({fileExists: false});
        }
        if(req.user.id != img.userId){
            return res.json({access: 'unauthorized'});
        }
        imgPath = __dirname + '/../../public/uploads/' + req.params.imgName;
        fs.stat(imgPath,function(err, stats){
            if(err){
                console.log(err);
                return res.json({success: false});
            }
            console.log(stats);
            fs.unlink(imgPath,function(err){
                if(err){
                    return res.send('error deleting the file');
                }
                res.json({success: true});
            })
        })
    });
});