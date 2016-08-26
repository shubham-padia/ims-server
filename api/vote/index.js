'use strict';

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

router.post('/upvote/:imgName',authCheck,function(req, res , next){
   Vote.find({userId : req.user.id, imgName : req.params.imgName},function(err,upv){
       if(err){
           return res.json({success: false});
       }
       if(upv.length === 0){
            var newVote = Vote();
            newVote.imgName = req.params.imgName;
            newVote.userId = req.user.id;
            newVote.vote = 1;

            newVote.save(function(err){
                if(err){
                    return res.json({success: false});
                }
                res.json({success: true});
            });
       } else {
            upv[0].vote = 1;

            upv[0].save(function(err){
                if(err){
                    return res.json({success: false});
                }
                res.json({success: true});
            })
      };
    });
});

//downvote
router.post('/downvote/:imgName',authCheck,function(req, res , next){
   Vote.find({userId : req.user.id, imgName : req.params.imgName},function(err,upv){
       if(err){
           return res.json({success: false});
       }
       if(upv.length === 0){
            var newVote = Vote();
            newVote.imgName = req.params.imgName;
            newVote.userId = req.user.id;
            newVote.vote = -1;

            newVote.save(function(err){
                if(err){
                    return res.json({success: false});
                }
                res.json({success: true});
            });
       } else {
            upv[0].vote = -1;

            upv[0].save(function(err){
                if(err){
                    return res.json({success: false});
                }
                res.json({success: true});
            })
      };
    });
});