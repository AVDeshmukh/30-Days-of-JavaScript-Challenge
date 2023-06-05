/*
Approach 1: Currying with Recursive Function Calls
*/
var curry = function(fn) {
    return function curried(...args) {
       if(args.length >= fn.length) {
          return fn(...args);
       }
 
       return (...nextArgs) => curried(...args, ...nextArgs);
    };
 };

 /*
Currying with the Built-in Bind Method
 */

 var curry = function (fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      }
  
      return curried.bind(this, ...args);
    };
  };