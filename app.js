#!/usr/bin/env node

var white = [255,255,255,255];
var red =[255,0,0,255];

var PF = require('pathfinding');
var image = require('./image');
const performance = require('perf_hooks').performance;

var filename = '4k';
function chunk(array, size) {
    let resultArray = [];
    console.log(array.length);
    let chunkSize = array.length/size;
    console.log(chunkSize);
    var t0 = performance.now();
    start = 0, end = size;
    for(i=0; i<chunkSize; i++) {
      //resultArray.push(array.splice(0, size)); 
      resultArray.push(array.slice(start,end));
      start = end;
      end=end+size;
      // console.log(i)
    }
    var t1 =performance.now();
    console.log("performance time"+(t1-t0));

  return resultArray;
}

  rawData = image.imageToPixels('input/maze400.png')
  console.log(rawData);
  // data= chunk(rawData,4);
  // createMaze(data,pixels.shape[0],pixels.shape[1]);

/*
    generate row 
    [ 0,0,0,1,0,0,0,0,0,0]

*/
function createMaze(data,row,col){
  //console.log('column size'+col);
  //console.log(data.length);
    var maze = []
   for(let i = 0; i<data.length; i++){
        maze[i] = data[i] ==''+white?0:1;        
   }
  // console.log(maze);
   var matrix = chunk(maze,col);
   console.log(JSON.stringify(matrix));

   var points = getEntryExitPoint(matrix);
   console.log('points '+ points.startx + ' ' + points.endx);
   var grid = new PF.Grid(matrix);
   var finder = new PF.AStarFinder();
    var path = finder.findPath(points.startx,0,points.endx,row-1,grid);
console.log(path);


    path.forEach(item=>{
     index = item[0] + (item[1]*col)
      data[index] = red;  
    })
    // convert  2darray to 1d array 
   // pix = [].concat(...data);
   pix = data.flat(1);
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




