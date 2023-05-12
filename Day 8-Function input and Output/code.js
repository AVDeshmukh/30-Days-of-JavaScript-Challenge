/*
Approach 1: Rest Syntax
We can declare a boolean which tracks whether the function has been called or not. Then we can use rest and spread syntax to pass the arguments if it has not been called yet.


*/

var once = function(fn) {
    let hasBeenCalled = false;
    return function(...args){
      if (hasBeenCalled) {
        return undefined;
      } else {
        hasBeenCalled = true;
        return fn(...args);
      }
    }
  };

/*
Approach 2: Implicitly Return Undefined
If you don't return any value from a function, it will implicitly return undefined. We can use this fact to shorten the code slightly.
*/

var once = function(fn) {
    let hasBeenCalled = false;
    return function(...args){
      if (!hasBeenCalled) {
        hasBeenCalled = true;
        return fn(...args);
      }
    }
  };

/*
Approach 3: Bind Function to a Context
JavaScript functions are sometimes bound to a this context. The most technically correct way to implement a higher-order function is to ensure the provided function is bound to the same context as the returned function.
*/

var once = function(fn) {
    let hasBeenCalled = false;
    return function(...args){
      if (!hasBeenCalled) {
        hasBeenCalled = true;
        return fn.apply(this, args);
      }
    }
  };