//Kevin Cai & Winston Peng
//Team turbo-guacamole
//SoftDev2 pd9
//K12 -- Connect the Dots
//2020-03-30

var xmlns = "http://www.w3.org/2000/svg"
var svg = document.getElementById('vimage'); //svg element
var clearbutton = document.getElementById("clear"); //clear button
var lx, ly;// Last x and y position used
var needLine = false;


var clear = function(e){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    needLine = false;
};

var drawLine = function(x,y){
    var line = document.createElementNS(xmlns,"line");
    line.setAttribute("x1",lx);
    line.setAttribute("y1",ly);
    line.setAttribute("x2",x);
    line.setAttribute("y2",y);
    line.setAttribute("stroke","blue");
    svg.appendChild(line);
};

var drawCircle = function(){
    var circle = document.createElementNS(xmlns,"circle");
    var x = event.offsetX;
    var y = event.offsetY;
    circle.setAttribute("cx",x);
    circle.setAttribute("cy",y);
    circle.setAttribute ("r",5);
    svg.appendChild(circle);
    if (needLine){
	     drawLine(x,y);
    }
    lx = x;
    ly = y;
    needLine = true;
};



clearbutton.addEventListener('click', clear);
svg.addEventListener('click',function(){drawCircle()});
