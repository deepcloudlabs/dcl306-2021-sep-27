numbers = [4,8,15,16,23,42]
let counter = 0;
// higher-order function: filter/map/reduce
// functional programming's function: pure function -> no side-effect
numbers.filter(function(x){ counter++; return x%2 === 0; } )
       .map(function(u){ return u*u; })
       .reduce(function(acc,num){return acc+num;}, 0)

numbers.filter( x => x%2 === 0 )
       .map( u => u*u)
       .reduce( (acc,num) => acc+num , 0)

