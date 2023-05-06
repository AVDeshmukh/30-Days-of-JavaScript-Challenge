// Approach 1: Increment Then Return

var createCounter = function(n) {
    let currentCount = n - 1;
    return function() {
      currentCount += 1;
      return currentCount;      
    };
  };

// Approach 2: Postfix Increment Syntax

var createCounter = function(n) {
    return function() {
      return n++;      
    };
  };

//Approach 3: Prefix Decrement and Increment Syntax

var createCounter = function(n) {
    --n;
    return function() {
      return ++n;      
    };
  };
//Approach 4: Postfix Increment Syntax With Arrow Function

var createCounter = function(n) {
    return () => n++;
  };