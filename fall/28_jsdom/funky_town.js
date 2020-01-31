// By Kevin Cai and Kenneth Chin
// SoftDev1 pd9
// K28 -- jsdom
// 2019-12-11
var fact = function(n){
  return (n < 2)? n : n * fact(n-1);
};

var write = function(s){
  document.getElementById("output").innerHTML = s;
};

var fibonacci = function(n){
  if(n == 0)return 0;
  if(n == 1)return 1;
  return(fibonacci(n-1)+fibonacci(n-2));
};

var gcd = function(a,b){
  a = Math.abs(a);
  b = Math.abs(b);
  while(b) {
    var tmp = b;
    b = a % b;
    a = tmp;
  }
  return a;
};

pd1 = ["Elon", "Einstein", "Nikola", "Thomas", "Snoop Dogg"];
var randomStudent = function(){
  len = pd1.length;
  x = Math.random();
  return pd1[Math.floor(len * x)];
};
document.getElementById("fact").addEventListener("click", function() {write(fact(6))});
document.getElementById("fib").addEventListener("click", function() {write(fibonacci(6))});
document.getElementById("gcd").addEventListener("click", function() {write(gcd(14,21))});
document.getElementById("rand").addEventListener("click", function() {write(randomStudent())});
