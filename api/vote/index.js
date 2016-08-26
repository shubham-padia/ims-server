'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;
var Vote = require('../../schemas/vote');
var UserImg = require('../../schemas/userImg');


//authentication
var authCheck = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ access: "unauthorized" });
};
//

router.post('/upvote/:imgName', authCheck, function (req, res, next) {
    UserImg.findOne({ filename: req.params.imgName }, function (err, img) {
        if (img.privacy != 0 && img.privacy != 1) {
            res.status(401).send('Voting system is disabled for private images');
        } else {
            Vote.find({ userId: req.user.id, imgName: req.params.imgName }, function (err, upv) {
                if (err) {
                    return res.json({ success: false });
                }
                if (upv.length === 0) {
                    var newVote = Vote();
                    newVote.imgName = req.params.imgName;
                    newVote.userId = req.user.id;
                    newVote.vote = 1;

                    newVote.save(function (err) {
                        if (err) {
                            return res.json({ success: false });
                        }
                        res.json({ success: true });
                    });
                } else {
                    var newVote = upv[0];
                    newVote.vote = 1;

                    newVote.save(function (err) {
                        if (err) {
                            return res.json({ success: false });
                        }
                        res.json({ success: true });
                    })
                };
            });
        }
    });
});

//downvote
router.post('/downvote/:imgName', authCheck, function (req, res, next) {
    UserImg.findOne({ filename: req.params.imgName }, function (err, img) {
        if (img.privacy != 0 && img.privacy != 1) {
            res.status(401).send('Voting system is disabled for private images');
        } else {
            Vote.find({ userId: req.user.id, imgName: req.params.imgName }, function (err, upv) {
                if (err) {
                    return res.json({ success: false });
                }
                if (upv.length === 0) {
                    var newVote = Vote();
                    newVote.imgName = req.params.imgName;
                    newVote.userId = req.user.id;
                    newVote.vote = -1;

                    newVote.save(function (err) {
                        if (err) {
                            return res.json({ success: false });
                        }
                        res.json({ success: true });
                    });
                } else {
                    var newVote = upv[0];
                    newVote.vote = -1;
                    newVote.save(function (err) {
                        if (err) {
                            return res.json({ success: false });
                        }
                        res.json({ success: true });
                    })
                };
            })
        };
    })
});
