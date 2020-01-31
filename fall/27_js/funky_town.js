var fact = function(n){
  if(n < 2){
      return n;
  }
  return n * fact(n-1);
};

var fibonacci = function(n){
  a = 1;
  curr = 1;
  tmp = curr;
  iter = 2;
  while(iter < n){
    curr = a + curr;
    a = tmp;
    tmp = curr;
    iter++;
  }
  return curr;
};

var gcd = function(a,b){
  iter = Math.min(a,b);
  while(iter > 0){
    if(((a % iter) == 0) && ((b % iter) == 0)){
      return iter;
    }
    iter -= 1;
  }
  return 1;
};

pd1 = ["Elon", "Einstein", "Nikola", "Thomas", "Snoop Dogg"];
var randomStudent = function(){
  len = pd1.length;
  x = Math.random();
  return pd1[Math.floor(len * x)];
};
