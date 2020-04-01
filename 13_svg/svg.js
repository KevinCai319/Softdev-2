//Kevin Cai & Winston Peng
//Team turbo-guacamole
//SoftDev2 pd9
//K13 -- Ask Circles
//2020-03-30

var xmlns = "http://www.w3.org/2000/svg"
var svg = document.getElementById('vimage'); //svg element
var clearbutton = document.getElementById("clear"); //clear button
var lx, ly;// Last x and y position used
var needLine = false;
var RADIUS = 10;

var clear = function(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    needLine = false;
};

var circleClick = function(e){
  if ( this.getAttribute("fill") == "red" ) {
    this.setAttribute("fill", "green");
    e.stopPropagation();
    return;
  }
  svg.removeChild(this);
  var box = svg.getBoundingClientRect();
  handleClick(Math.random()*box.width,Math.random()*box.height);
  e.stopPropagation();
  this.remove();
}
var line = function(x1,y1,x2,y2){
    var line = document.createElementNS(xmlns,"line");
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x2);
    line.setAttribute("y2",y2);
    line.setAttribute("stroke","blue");
    svg.appendChild(line);
};

var circle = function(x,y){
    var circle = document.createElementNS(xmlns,"circle");
    circle.setAttribute("cx",x);
    circle.setAttribute("cy",y);
    circle.setAttribute("r",RADIUS);
    circle.setAttribute("fill", "red");
    circle.addEventListener('click',circleClick);
    svg.appendChild(circle);
};

var handleClick = function(x,y){
  if (needLine){
    var pre = svg.removeChild(svg.lastChild);
    line(lx,ly,x,y);
    svg.appendChild(pre);
  }
  circle(x,y);
  lx = x;
  ly = y;
  needLine = true;
};



clearbutton.addEventListener('click', clear);
svg.addEventListener('click',function(){handleClick(event.offsetX,event.offsetY)});
