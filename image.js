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
        console.log(row);
        path.forEach(item=>{
            index = item[0] + (item[1]*col);
            maze[index] = red;  
        })

        pix = maze.flat(1);
        fs.writeFileSync(
        'output/'+filename+'.png',
        Buffer.from(encoder(pix, [row, col], 'png'))
        )
        
    }

    return {
        toPixels: toPixels,
        mazeRender: mazeRender
    }
}

module.exports = image();
