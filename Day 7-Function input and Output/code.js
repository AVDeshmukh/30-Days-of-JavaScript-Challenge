/*
In order to solve this problem, we can iterate over the array of functions backwards and successively apply each function to the input value. We'll start with the input value x and apply the last function in the array to it. We'll then use the result as the input for the previous function and continue the process until we reach the first function in the array. After applying all the functions, we'll return the final result.
*/
var compose = function (functions) {
    return function (x) {
      if (functions.length === 0) return x;
      let input = x;
  
      for (const func of functions.reverse()) {
        input = func(input);
      }
  
      return input;
    };
  };

/*
  using for of loop

*/
var compose = function (functions) {
  return function (x) {
    if (functions.length === 0) return x;
    let input = x;

    for (const func of functions.reverse()) {
      input = func(input);
    }

    return input;
  };
};

