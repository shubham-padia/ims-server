'use strict';

var express = require('express');
var router = express.Router();
var userImg = require('../../schemas/userImg');
module.exports = router;

//authentication
var authCheck = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ access: "unauthorized" });
};
//

router.get('/myImg', authCheck, function (req, res, next) {
    userImg.find({ 'userId': req.user.id }, function (err, imgList) {
        if (err) {
            return res.json({ success: false });
        }
        res.json(imgList);
    });
});

router.get('/userId/:userId', authCheck, function (req, res, next) {
    userImg.find({ 'userId': req.params.userId, $or: [{ 'privacy': 0 }, { 'privacy': 1 }] }, function (err, imgList) {
        if (err) {
            return res.json({ success: false });
        }
        res.json(imgList);
    });
});  