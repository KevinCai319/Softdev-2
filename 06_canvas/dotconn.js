/*
Kevin Cai and Kazi Jamal -- Team Koding Kings
SoftDev1 pd9
K06 -- Dot Dot Dot
2020-02-11
*/

// retrieve node in DOM via ID
const canvas = document.getElementById('playground');

// instantiate a CanvasRenderingContext2D object
const ctx = canvas.getContext('2d');

ldx = -1;
ldy = -1;

// draws box or dot when canvas clicked
var draw = function(e) {
    // the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node
    mouseX = e.offsetX;
    // the offset in the Y coordinate of the mouse pointer between that event and the padding edge of the target node
    mouseY = e.offsetY;
    drawDot(mouseX, mouseY);
    if(ldx != -1){
    	line(ldx,ldy,mouseX,mouseY);
    }
    ldx = mouseX;
    ldy = mouseY;
};

var line = function(x0,y0,x1,y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
// draws a dot with center at mouse location
var drawDot = function(x,y) {
    console.log("drawing dot");
    var radius = 20;
    // starts a new path by emptying the list of sub-paths
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

// clears the canvas
var clearCanvas = function() {
    console.log("clearing canvas");
    ldx = -1;
    ldy = -1;
    ctx.clearRect(0,0, canvas.width, canvas.height);
};


// sets event listener for canvas click
canvas.addEventListener('click', draw);

// sets event listeners for clear
var clearBtn = document.getElementById("clear");
clearBtn.addEventListener('click', clearCanvas);

