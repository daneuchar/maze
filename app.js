#!/usr/bin/env node

var white = [255,255,255,255];
var red =[255,0,0,255];

var getPixels = require("get-pixels");
var PF = require('pathfinding');
var encode = require('image-encode');
var fs = require('fs');

var filename = 'maze400';
function chunk(array, size) {
    let resultArray = [];
    console.log(array.length);
    let chunkSize = array.length/size;
    console.log(chunkSize);
    for(i=0; i<chunkSize; i++) {
      resultArray.push(array.splice(0, size));
      // console.log(i)
    }
  return resultArray;
}




getPixels(filename+'.png',function (err,pixels){
    if(err){
        throw err;
    }
    rawData = Array.from(pixels.data);
    console.log(pixels);

    data= chunk(rawData,4);

    createMaze(data,pixels.shape[0],pixels.shape[1]);
});

/*
    generate row 
    [ 0,0,0,1,0,0,0,0,0,0]

*/
function createMaze(data,row,col){
    var maze = []
   for(let i = 0; i<data.length; i++){
        maze[i] = data[i] ==''+white?0:1;        
   }
   var matrix = chunk(maze,col);

   var points = getEntryExitPoint(matrix);
   var grid = new PF.Grid(matrix);
   var finder = new PF.AStarFinder();
   var path = finder.findPath(points.startx,0,points.endx,row-1,grid);



   path.forEach(item=>{
    index = item[0] + (item[1]*col)
     data[index] = red;
    
   })
   pix = [].concat(...data);
   fs.writeFileSync(
    filename+'out.png',
    Buffer.from(encode(pix, [row, col], 'png'))
)

}

//entry and exit points should not be on the same row and on any columns
function getEntryExitPoint(maze){
  var startx,endx;

  startx = maze[0].indexOf(0);
  endx = maze[maze.length-1].indexOf(0);
  return {startx,endx};
}




