#!/usr/bin/env node


var PF = require('pathfinding');
var image = require('./image');
var maze = require('./maze');
const performance = require('perf_hooks').performance;

var filename = '4k';


async function start() {
  try {
    let rawPixels = await image.toPixels('input/maze400.png');
    col = rawPixels.shape[1];
    row = rawPixels.shape[0];
    pixels = maze.pixelArray(Array.from(rawPixels.data),4);
    let mazeArray = maze.mazeArray(pixels,col);
    let mazePath = maze.pathFinder(mazeArray);
    image.mazeRender(mazePath,pixels,row,col,'123');
    
  } catch (e) {
    console.log("error : "+e)
  }
}


  
  // 
  // createMaze(data,pixels.shape[0],pixels.shape[1]);

/*
    generate row 
    [ 0,0,0,1,0,0,0,0,0,0]

*/
function createMaze(data,row,col){



   
    // convert  2darray to 1d array 
   // pix = [].concat(...data);
   

}

//entry and exit points should not be on the same row and on any columns
function getEntryExitPoint(maze){
  var startx,endx;

  startx = maze[0].indexOf(0);
  endx = maze[maze.length-1].indexOf(0);
  return {startx,endx};
}

start();