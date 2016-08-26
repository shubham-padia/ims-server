'use strict';

var express = require('express');
var router = express.Router();
var UserImg = require('../../schemas/userImg');
module.exports = router;

//authentication
var authCheck = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ access: "unauthorized" });
};
//

router.post('/:imgName', authCheck, function (req, res) {
    UserImg.findOne({ filename: req.params.imgName, userId: req.user.id }, function (err, img) {
        if (err) {
            return res.json({ success: false });
        }
        if (img == null || img == undefined) {
            return res.json({ access: 'unauthorized' });
        }
        
        if (req.body.desc != null && req.body.desc != undefined) {
            img.desc = req.body.desc;
        };
        if (req.body.name != null && req.body.name != undefined) {
            img.originalname = req.body.name;
        };
        if (req.body.privacy != null && req.body.privacy != undefined) {
            img.privacy = req.body.privacy;
        };

        img.save(function (err) {
            if (err) {
                return res.json({ success: false });
            }
            res.json({ success: true });
        })
    });
});
