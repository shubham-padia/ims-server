'use strict';

var express = require('express');
var router = express.Router();
var UserImg = require('../../schemas/userImg');
var path = require('path');
module.exports = router;

router.get('/getImg/:filename', function(req,res,next){

        UserImg.find({ 'filename': req.params.filename},function(err, img){
            
            if(img === undefined || img.length === 0 || err){
                return res.json({success: false});
            }

            var options = {
                root: __dirname + '/../../public/uploads/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };

            if(img[0].privacy === 0){
                console.log('public');
                   res.sendFile(req.params.filename, options, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(err.status).end();
                        }
                        else {
                            console.log('Sent:',req.params.filename);
                        }
                    });
            }
            else if (img[0].privacy === 1){
                console.log('restricted');
                if(!req.user){
                    return res.json({access: 'unauthorized'});
                } else {
                    res.sendFile(req.params.filename, options, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(err.status).end();
                        }
                        else {
                            console.log('Sent:',req.params.filename);
                        }
                    });
                }
            }
            else {
                console.log('private');
                console.log(img[0].userId);
                if(!req.user || req.user.id != img[0].userId){
                    return res.json({access: 'unauthorized'});
                } else {
                    res.sendFile(req.params.filename, options, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(err.status).end();
                        }
                        else {
                            console.log('Sent:',req.params.filename);
                        }
                    });
               }
            }
        });
});


