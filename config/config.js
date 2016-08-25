'use strict';

module.exports = {
    'port': 3000,
    'user': {
        'free':{
            'maxImgNo': 10,
            'maxImgSize': 1,
        },
        'eco':{
            'maxImgNo': 200,
            'maxImgSize': 3
        },
        'premium':{
            'maxImgNo': 500,
            'maxImgSize': 10
        },
        'super':{
            'maxImgNo': '',
            'maxImgSize': ''
        }
        
    }
}