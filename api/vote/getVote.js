var express = require('express');
var router = express.Router();
module.exports = router;
var Vote = require('../../schemas/vote');

//authentication
var authCheck = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
    res.json({access: "unauthorized"});    
};
//

router.get('/:imgName',authCheck,function(req,res){
    Vote.find({ imgName: req.params.imgName },function(err, imgVote){
        var voteCount = 0;
        imgVote.forEach(function(imgInfo){
            console.log(imgInfo.vote);
            voteCount += imgInfo.vote;
        })
        res.json({totalVote: voteCount});
    });
});
