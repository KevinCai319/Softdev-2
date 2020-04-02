//Kevin Cai
//Team noname
//SoftDev2 pd9
//K14 -- Ask Circles
//2020-03-31

var xmlns = "http://www.w3.org/2000/svg"
var svg = document.getElementById('vimage'); //svg element
var clearbutton = document.getElementById("clear"); //clear button
var dvdbutton = document.getElementById("dvd"); //dvd button
var extrabutton = document.getElementById("extra");
var lx, ly;// Last x and y position used
var box = svg.getBoundingClientRect();
var width = box.width,
    height = box.height;// width and height of main drawing area
var needLine = false;// check if first circle
var moveToggle = false;
var extraToggle = false;
var frameID;
var RADIUS = 10;
var VELOCITY = 1;

var clear = function(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    needLine = false;
};

var moving = function(e){
  moveToggle = !moveToggle;
  if (moveToggle){
    requestAnimationFrame(dvd);
    window.cancelAnimationFrame(frameID);
  } else {
    window.cancelAnimationFrame(frameID);
  }
}

var toggleExtra = function(e){
  extraToggle = !extraToggle;
  moveToggle = false;
  moving();
}

var dvd = function(){
  var circles = document.getElementsByTagName("circle");
  for (c of circles) {
    var r = Number(c.getAttribute('r')),
        cx = Number(c.getAttribute('cx')),
        cy = Number(c.getAttribute('cy')),
        vx = Number(c.getAttribute('vx')),
        vy = Number(c.getAttribute('vy'));
      // console.log(vx);
    if ( (cx + vx) >= ( width - r) || ((cx + vx) <= r) ) {
      c.setAttribute("vx", vx*-1);
    }
    if ( (cy + vy) >= (height - r) || ((cy + vy) <= r) ) {
      c.setAttribute("vy", vy*-1);
    }
    c.setAttribute("cx", vx+cx);
    c.setAttribute("cy", vy+cy);
    if(extraToggle){
      c.setAttribute("fill", '#'+Math.floor(Math.random()*16777215).toString(16));
      c.setAttribute("stroke", '#'+Math.floor(Math.random()*16777215).toString(16));
    }
  }
  if (moveToggle){
    frameID = window.requestAnimationFrame(dvd);
  }
};

var circleClick = function(e){
  if ( this.getAttribute("fill") == "red" ) {
    this.setAttribute("fill", "green");
    e.stopPropagation();
    return;
  }
  if(this.getAttribute("fill") == "green"){
    svg.removeChild(this);
    handleClick(Math.random()*width,Math.random()*height);
    e.stopPropagation();
    this.remove();
  }
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
    var vx = (Math.random()*2*VELOCITY) - VELOCITY;
    var vy = Math.sign(Math.random())*Math.sqrt((VELOCITY*VELOCITY) - (vx * vx));
    circle.setAttribute("vx",vx);
    circle.setAttribute("vy",VELOCITY);
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
dvdbutton.addEventListener('click',moving);
extrabutton.addEventListener('click',toggleExtra);
svg.addEventListener('click',function(){handleClick(event.offsetX,event.offsetY)});
