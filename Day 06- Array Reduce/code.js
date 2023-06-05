/*
Approach 1: For...of Loop
Javascript has simple syntax that allows you to loop over each element on an iterable object. Sets, Maps, and Strings are other examples of iterables.
*/

var reduce = function(arr, fn, initialVal) {
    let accumulator = initialVal;
    for (const element of arr) {
        accumulator = fn(accumulator, element);
    }
    return accumulator;
  };

/*
Approach 2: Array.forEach Loop
Javascript arrays have a built-in method for iterating over each element. The main reason it is often preferred over normal for loops is that it provides the actual value as the first argument to the callback (possibly saving a line of code).
*/

var reduce = function(arr, fn, initialVal) {
    let accumulator = initialVal;
    arr.forEach((element) => {
      accumulator = fn(accumulator, element);
    });
    return accumulator;
  };

/*
Approach 3: For...in Loop
For...in loops are more commonly used to iterate over the keys on an object. However, they can also be used to iterate over the indices of an array. This approach is notable because it respects sparse arrays by ignoring empty indices. For example, if you wrote let arr = Array(100); arr[1] = 10;, this approach would treat the array as if it only had one element.

*/

var reduce = function(arr, fn, initialVal) {
    let accumulator = initialVal;
    for (const index in arr) {
      accumulator = fn(accumulator, arr[index]);
    } 
    return accumulator;
  };
