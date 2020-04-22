var schoolData = [];
var schoolID = 1;
const d3Load = (type,fp,key) => {
  type(fp)
    .then((data) => {
      localStorage.setItem(key, JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};
const loadData = (key, fp, ext) => {
    //Attempts to get stuff from local storage.
    const rawData = JSON.parse(localStorage.getItem(key));
    //If it doesn't exist then it just goes for the files and puts them there.
    if (!rawData) {
        console.log('moving to localStorage...');
        d3Load(ext,fp,key);
    }
    return rawData;
};

var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
// Initialise a X axis:
var x = d3.scaleLinear().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis");

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
   .attr("class","myYaxis");

loadPlot = ()=>{
  console.log('yo');
  schoolData = [];
  let dir = '';
  for(i = 2015;i < 2020; i++){
    dir = '/static/csv/'+i.toString()+'-'+(i+1).toString()+'.csv';
    console.log(dir);
    schoolData.push(loadData('year'+i.toString(),dir,d3.csv));
  }
};

showPlot = ()=>{
  let tmp = []
  let max = 5;
  let num = 0;
  let name = schoolData[0][schoolID]["Feeder School Name"];
  for(let i = 0; i < schoolData.length; i++){
      num = schoolData[i][schoolID]["Count of Offers"];
      console.log(num);
      console.log(schoolData[i][schoolID]);
      if(num === "0-5"){
        num = 0;
      }else{
        num = parseInt(num);
      }
      tmp.push({year:(i+2015), accept:num});
      max = Math.max(max, num);
  }
  if(max == 5){
    schoolID += 1;
    showPlot();
    return;
  }
  console.log(name);
  x.domain([2015,2015+schoolData.length]);
  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis);
  // console.log(tmp);
  // create the Y axis
  y.domain([0, max+4]);
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis);
    var u = svg.selectAll(".lineTest")
    .data([tmp], function(d){ return d.accept });
  // Updata the line
  u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line().x(function(d) { return x(d.year); }).y(function(d) { return y(d.accept); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
  schoolID += 1;
};


var toggles = new Map([
    ['setup', false],
    ['running', false]
]);
Toggle = (command,toggle, additional = true) => {
    event.preventDefault();
    if(additional){
        toggles.set(toggle,true);
        command();
    }
};
document.getElementById("renderButton").addEventListener("click", ()=>Toggle(showPlot,'running',toggles.get('setup')));
document.getElementById("startButton").addEventListener("click", ()=>Toggle(loadPlot,'setup'));
