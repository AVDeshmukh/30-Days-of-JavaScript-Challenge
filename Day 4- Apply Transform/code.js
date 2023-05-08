/*
Approach 1: Write Values onto Initially Empty Array
In JavaScript, you can read and write to indices that aren't in the range [0, arr.length). Just like with normal objects, accessing an index that doesn't exist returns undefined. Writing to an index that doesn't exist is generally discouraged because, besides being confusing, it can result in slow and unpredictable performance.
*/

var map = function(arr, fn) {
    const newArr = [];
    for (let i = 0; i < arr.length; ++i) {
        newArr[i] = fn(arr[i], i);
    }
    return newArr;
};

/*
Approach 2: For...in Loop
For...in loops are more commonly used to iterate over the keys on an object. However, they can also be used to iterate over the indices of an array. This approach is notable because it respects sparse arrays. For example, if you wrote let arr = Array(100); arr[1] = 10;, this approach would only transform the single element.
This approach takes ~1000ms for 5M elements. An interesting thing to note is that this is the most similar to how the built-in Array.map works. Because Array.map needs to handle sparse arrays, it is usually several times slower than an optimal custom implementation that assumes arrays aren't sparse.
*/

var map = function(arr, fn) {
    const newArr = new Array(arr.length);
    for (const i in arr) {
        newArr[i] = fn(arr[i], Number(i));
    }
    return newArr;
};

/*
Approach 3: Push Values onto Array
JavaScript arrays are confusingly named because traditionally arrays have a fixed sized. However in JavaScript arrays can have elements appended with an average O(1)O(1)O(1) time. You can build up a transformed array by appending each element to the end one-by-one.
*/

var map = function(arr, fn) {
    const newArr = [];
    for (let i = 0; i < arr.length; ++i) {
        newArr.push(fn(arr[i], i));
    }
    return newArr;
};

/*
Approach 4: Preallocate Memory
You can create an empty array with some length using the new Array(len) constructor. Note that the memory is allocated but the array doesn't actually contain any elements.

This technique is more performant than appending elements to the end of the array. This is because whenever you push a value to an array, the array may not have enough memory allocated to it and it will need to be resized. This is an expensive operation. Initializing the memory upfront can result in much better performance.
 */

var map = function(arr, fn) {
    const newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        newArr[i] = fn(arr[i], i);
    }
    return newArr;
};

/*
Approach 5: 32 Bit Integer Array
JavaScript allows you to use typed arrays. These aren't like normal JavaScript arrays because they only allow specific data types and their size cannot be altered.

These are a useful tool when you want to store lots of data in a memory efficient way. Traditional arrays can take up significant amounts of memory because they are not fixed size and can store arbitrary data.
*/

var map = function(arr, fn) {var map = function(arr, fn) {
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = fn(arr[i], i);
    }
    return arr;
};
    const newArr = new Int32Array(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        newArr[i] = fn(arr[i], i);
    }
    return newArr;
};

/*
Approach 6: In-Memory Transformation
To achieve optimal performance, you can simply reuse the memory already allocated to the first array.

It's important to note that it is generally discouraged for a function to modify the values passed to it. It can lead to unexpected bugs where the user of the function was not expecting that as a side-effect. The built-in Array.map does not modify the original array.

*/

var map = function(arr, fn) {
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = fn(arr[i], i);
    }
    return arr;
};