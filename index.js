// this program tries to find the next prime fibonacci number.
// i.e. - given a input n, the `nxtPrmFib` function returns a number which is both prime and fibonacci and is greater than the input number.

// the program below is complete and works as detailed in the requirements.
// the task here is to:

// 1. rationalize and understand the code as best you can.
// 2. open a PR to improve the code as you see fit.

// Converting to an Angular app or typescript is not considered a necessity here.
// We're mostly interested in understanding how engineers can critique the code & suggest improvements.

var ispnum = function(num) {
  for(var i = 2; i < num; i++)
    if  (num % i === 0) return false;
  return num > 1;
};

const fibonacci = (num) => {
  if (num <= 1)return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

function nxtPrmFib(number) {
  let r = 0;
  let l = 1;
  while (true) {
    var fib = fibonacci(l);
    console.log('fib', fib, number);
    if (fib > number) {
      if (ispnum(fib)) {
        r = fib;
        break;
      } else {
        l = l + 1;
        console.warn('bumping to ', fib);
      }
    } else {
      l = l + 1;
      console.warn('bumping to', fib);
    }
  }
  console.warn('Next prime fib ', r);
}

nxtPrmFib(20);