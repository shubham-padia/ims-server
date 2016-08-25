'use strict';

var express =  require('express');
var router = express.Router();
var userImg = require('../../schemas/userImg');
module.exports = router;

//authentication
var authCheck = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
    res.json({access: "unauthorized"});    
};
//


router.get('/userId',authCheck,function(req, res, next){
    userImg.find({ 'userId': req.user.id}, function(err, imgList){
        if(err){
            return res.json({success: 404 });
        }
        console.log(req.params.id);
        res.json(imgList);
    })
});
