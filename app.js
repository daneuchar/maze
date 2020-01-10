#!/usr/bin/env node
var image = require('./image');
var maze = require('./maze');
const express = require('express')
const fileUpload = require('express-fileupload');
var path = require('path');
const app = express()
const port = 3000

app.use(fileUpload());
app.use("/output", express.static(path.join(__dirname, 'output')));
async function start(filename) {
  try {
    let rawPixels = await image.toPixels('input/'+filename);
    col = rawPixels.shape[1];
    row = rawPixels.shape[0];
    pixels = maze.pixelArray(Array.from(rawPixels.data),4);
    let mazeArray = maze.mazeArray(pixels,col);
    let mazePath = maze.pathFinder(mazeArray);
    image.mazeRender(mazePath,pixels,row,col,filename);
    
  } catch (e) {
    console.log("error : "+e)
  }
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let mazefile = req.files.mazefile;
  var file = (mazefile.name).split('.');
  var filename=file[0]+'_'+Date.now()+'.'+file[1];
  mazefile.mv('input/'+filename, function(err) {
    if (err)
      return res.status(500).send(err);
    start(filename);
    res.send("<img src='output/"+filename+"' style='width:50%'/>");

  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
