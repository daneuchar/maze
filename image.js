var getPixels = require("get-pixels");
var fs = require('fs');
var encoder = require('image-encode');
var red =[255,0,0,255];

var image = function() {
    var toPixels =  function toPixels(imagePath) {
        let promise = new Promise((resolve, reject) => { 
            getPixels(imagePath,function (err,pixels) {
                if(err){
                    reject(err);
                }
                resolve(pixels);
            });
        });
        
        return promise;
    }

    var mazeRender = function mazeRender(path,maze,col,row,filename){
        path.forEach(item=>{
            index = item[0] + (item[1]*col);
            maze[index] = red;  
        })

        pix = maze.flat(1);
        fs.writeFileSync(
        'output/'+filename,
        Buffer.from(encoder(pix, [row, col], filename.split('.')[1]))
        )
        
    }

    return {
        toPixels: toPixels,
        mazeRender: mazeRender
    }
}

module.exports = image();
