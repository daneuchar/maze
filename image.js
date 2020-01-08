var getPixels = require("get-pixels");
var fs = require('fs');
var encoder = require('image-encode');

var image = function() {

    var imageToPixels = async function (imagePath) {
        getPixels(imagePath,function (err,pixels){
            if(err){
                throw err;
            }
            console.log('...');
            rawData = Array.from(pixels.data);
            return rawData;
        });
        
    }

    return {
        imageToPixels: imageToPixels
    }
}

module.exports = image();
