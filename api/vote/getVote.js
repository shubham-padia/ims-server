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

router.get('/:imgName', authCheck, function (req, res) {
    UserImg.findOne({ filename: req.params.imgName }, function (err, img) {
        if (img.privacy != 0 && img.privacy != 1) {
            res.status(401).send('Voting system is disabled for private images');
        } else {
            Vote.find({ imgName: req.params.imgName }, function (err, imgVote) {
                var voteCount = 0;
                imgVote.forEach(function (imgInfo) {
                    voteCount += imgInfo.vote;
                })
                res.json({ totalVote: voteCount });
            })
        };
    })
});
