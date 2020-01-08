var white = [255,255,255,255];

var pathFinding = require('pathfinding');

var maze = function(){
    var pixelArray = function pixelArray(array, size) {
        let resultArray = [];
        let splitSize = array.length/size;
        start = 0, end = size;
        for(i=0; i<splitSize; i++) {
          resultArray.push(array.slice(start,end));
          start = end;
          end=end+size;
        }
      return resultArray;
    }

    var mazeArray = function mazeArray(pixels,col){
        let mazeArray = []
        for(let i = 0; i<pixels.length; i++){
             mazeArray[i] = pixels[i] ==''+white?0:1;        
        }
        let maze = pixelArray(mazeArray,col);
        return maze;
    }

    var entryExitPoint = function entryExitPoint(maze){
        var startx,endx;
        startx = maze[0].indexOf(0);
        endx = maze[maze.length-1].indexOf(0);
        return {startx,endx};
    }

    var pathFinder = function pathFinder(maze){
        var points = entryExitPoint(maze);
        var grid = new pathFinding.Grid(maze);
        var finder = new pathFinding.AStarFinder();
        var path = finder.findPath(points.startx,0,points.endx,(maze.length-1),grid);
        return path;
    }

    


    return{
        pixelArray:pixelArray,
        mazeArray: mazeArray,
        pathFinder: pathFinder

    }
}

module.exports=maze();