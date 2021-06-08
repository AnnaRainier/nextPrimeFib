// this program tries to find the next prime fibonacci number.
// i.e. - given a input n, the `nxtPrmFib` function returns a number which is both prime and fibonacci and is greater than the input number.

// the program below is complete and works as detailed in the requirements.
// the task here is to:

// 1. rationalize and understand the code as best you can.
// 2. open a PR to improve the code as you see fit.

// Converting to an Angular app or typescript is not considered a necessity here.
// We're mostly interested in understanding how engineers can critique the code & suggest improvements.

const enqueueMicrotask = (fn, args) => {
  return Promise.resolve().then(() => fn(args));
}; // this function is needed to unload the main thread (execute code when the stack gets empty)

const fibonacci = (num) => {
  if (num === 0) return 0; // condition of fibonacci function needed to be changed, as fibonacci sequence starts from 0
  if (num <= 2) return 1; // the previous condition of fibonacci function returned incorrect result, for example for 2 it would return 2 instead of 1
  return fibonacci(num - 1) + fibonacci(num - 2);
};

const ispnum = function(num) {
  for(let i = 2; i < num; i++) // var was replaced to let, because let is block scoped, while var if function scoped and might be accidentally changed outside of the loop
    if  (num % i === 0) return false;
  return num > 1;
};

const memoFn = (callbackFn) => { // this function is needed to wrap functions that might require memoization due to frequent calls
  const memo = {}; // memo object stores previous execution results via closure
  return (...args) => {
    if (memo[args]) {
      return memo[args]
    }

    memo[args] = callbackFn(args)
    return memo[args]
  }
}

const memoFib = memoFn(fibonacci); // wrapping fibonacci function in memoFn in order to have memoization of previous execution results
const memoIsPNum = memoFn(ispnum); // wrapping ispnum function in memoFn in order to have memoization of previous execution results


async function nxtPrmFib(number) { // we're making nxtPrmFib async in order to work with results of enqueueMicrotask calls conveniently (as enqueueMicrotask returns a promise)
  let result = 0; // renamed the variable for more readability
  let nextNum = 1; // renamed the variable for more readability

  while (true) {
    const fib = await enqueueMicrotask(memoFib, nextNum); // calculate fibonacci number after the stack gets empty, to improve performance
    // also calling the function wrapped in memoFn to make sequential calculations faster

    if (fib > number && await enqueueMicrotask(memoIsPNum, fib)) { // conditions that fib is greater than number and fib is prime can be combined together to decrease nested if else statements
      // the check for primary number won't start if fib is less or equal to number
      result = fib;
      break;
    } else {
      nextNum = nextNum + 1;
      console.warn('bumping to ', fib);
    }
  }
  console.warn('Next prime fib ', result);
  return result; // the return statement is desirable in order to have the ability to retrieve the result of the computation outside of the function
}

nxtPrmFib(20);