// Approach 1: Closure
// We can declare a variable currentCount and set it equal to init.
// Then return an object with the three functions
// where we increment, decrement, and reset the currentCount.

var createCounter = function(init) {
    let currentCount = init;
    return {
      increment: function() {
         currentCount += 1;
         return currentCount;
      },
      decrement: function() {
         currentCount -= 1;
         return currentCount;
      },
      reset: function() {
         currentCount = init;
         return currentCount;
      },
    }
  };
/*
Approach 2: Closure with Shortened Syntax
We can take the concept from Approach 1 and shorten the syntax in several ways.

We can replace += 1 and -= 1 with Prefix Increment/Decrement syntax. What this syntax allows you to do is increment or decrement a number and then return it.
Combine currentCount = init and return currentCount into a single line of code. In JavaScript, assigning a value to a variable also returns that value.
Switch from function syntax to arrow syntax when defining the functions.

*/
var createCounter = function(init) {
    let currentCount = init;
    return {
      increment: () => ++currentCount,
      decrement: () => --currentCount,
      reset: () => (currentCount = init),
    }
  };

/*
Approach 3: Closure with Separately Created Functions
You can declare functions with the appropriate names and then return them. What this approach highlights is syntactic sugar for creating objects. When the name of the value is the same name as the key, you can omit the value. For example, you could shorten let obj = { value: value }; to let obj = { value };
*/
var createCounter = function(init) {
  let currentCount = init;

  function increment() {
    return ++currentCount;
  }

  function decrement() {
      return --currentCount;
  }

  function reset() {
      return (currentCount = init);
  }

  return { increment, decrement, reset };
};
/*
Approach 4: Class
We can define a Counter class with the appropriate methods and then return a new instance of this class.

*/ 
class Counter {
    constructor(init) {
      this.init = init;
      this.currentCount = init;
    }
  
    increment() {
      this.currentCount += 1;
      return this.currentCount;
    }
  
    decrement() {
      this.currentCount -= 1;
      return this.currentCount;
    }
  
    reset() {
      this.currentCount = this.init;
      return this.currentCount;
    }
  }
  
  
  var createCounter = function(init) {
    return new Counter(init);
  };

/*
Approach 5: Closure with Proxy
Rather than returning a normal object, we can return a Proxy which emulates the behavior of an object with methods. We can do this by listening to all property access (get) events and if the requested key matches the name of a method, perform the appropriate logic.

Note that this solution is primarily for demonstration purposes. Proxies are a very powerful tool and their use should be reserved for situations that absolutely require them.
*/
var createCounter = function(init) {
    let currentCount = init;
    return new Proxy({}, {
      get: (target, key) => {
        switch(key) {
          case "increment":
            return () => ++currentCount;
          case "decrement":
            return () => --currentCount;
          case "reset":
            return () => (currentCount = init);
          default:
            throw Error("Unexpected Method")
        }
      },
    });
  };