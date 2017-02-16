var app = function(){

  var canvas = document.querySelector('#main-canvas');
  var context = canvas.getContext('2d');
// console.log(context);

// // context.fillStyle = "salmon";
// context.fillRect(10, 10, 50, 50);
// context.fillRect(100, 100, 50, 50);


// // context.strokeStyle = "dodgerblue"
// context.beginPath();
// context.moveTo(100, 100);
// context.lineTo(100, 200);
// context.stroke();


// context.beginPath();
// context.moveTo(200, 200);
// context.lineTo(200, 300);
// context.lineTo(100, 300);
// context.closePath();
// context.stroke();


// context.beginPath();
// context.arc(300, 150, 50, 360, Math.PI * 2, true);
// context.stroke();


// var img = document.createElement('img');
// img.src = "http://emojis.slackmojis.com/emojis/images/1457563042/312/doge.png";

// var drawDoge = function(){
//   context.drawImage(img, 200, 200, 90, 90);
// }

// img.onload = drawDoge;

// var changeColor = function(whichPicker){
//   context.fillStyle = this.value;
// }

// var colorPicker = document.querySelector('#input-color');
// colorPicker.onchange = changeColor;


var circle = document.querySelector('#circle');
var rectangle = document.querySelector('#rectangle');
var eraser = document.querySelector('#eraser');
var line = document.querySelector('#line');
var brush = document.querySelector('#brush');
var fillColorPicker = document.querySelector('#fill-color');
var strokeColorPicker = document.querySelector('#stroke-color');
var tool;
var fillColor = fillColorPicker.value;
var strokeColor = strokeColorPicker.value;


fillColorPicker.onchange = function(){
  fillColor = this.value;
}

strokeColorPicker.onchange = function(){
  strokeColor = this.value;
}

circle.onclick = function(event){
  tool = drawCircle;
  console.log('tool', tool)
};

canvas.onclick = function(event){
  tool(event.x, event.y, strokeColor, fillColor);
};


var drawCircle = function(x, y, strokeColor, fillColor){
  context.beginPath();
  context.arc(x, y, 50, 0, Math.PI *2, true);
  context.strokeStyle = strokeColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();
}

var drawRectangle = function(x, y, strokeColor, fillColor){
  context.fillStyle = fillColor;
  context.strokeStyle = strokeColor;
  context.fillRect(x, y, 50, 50);
  context.strokeRect(x, y, 50, 50);
}

rectangle.onclick = function(event){
  tool = drawRectangle;
}

brush.onclick = function(event){
  tool = drawPaint;
}

var drawPaint = function(){
  var isDrawing = true;
  context.lineJoin = "round"
  context.strokeStyle = "#000000"; 
  context.globalAlpha = "0.2"; 
  context.lineWidth = 30; 
  context.globalCompositeOperation = "source-over";
  // console.log(event)
  var lastPoint = {x: event.x, y: event.y};

  canvas.onmousedown = function(event){
    isDrawing = true;
    // console.log('event', event);
    x = event.x
    y = event.y
    lastPoint = {x, y};
    console.log(lastPoint)
  };

  canvas.onmousemove = function(event){
    if(isDrawing){
      var currentPoint = { x: event.clientX, y: event.clientY };

      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(currentPoint.x, currentPoint.y);
      context.closePath();
      context.stroke();

      lastPoint = currentPoint;
    }else{
      return;
    }
  }

  canvas.onmouseup = function() {
    isDrawing = false;
  }
}
}

window.onload = app;

//======================




