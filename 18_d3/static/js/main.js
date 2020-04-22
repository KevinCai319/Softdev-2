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

loadPlot = ()=>{
  console.log('yo');
  console.log(loadData('demo','/static/csv/2019-2020.csv',d3.csv));
};

showPlot = ()=>{
  console.log('hi');
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
