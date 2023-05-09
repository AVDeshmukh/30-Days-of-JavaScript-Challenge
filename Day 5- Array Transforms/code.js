
/*
Approach 1: Push Values onto New Array
You can create a new array and push all values where fn(arr[i], i) returns a truthy value. This is done by iterating over each element in the original array.
*/

var filter = function(arr, fn) {
    const newArr = [];
    for (let i = 0; i < arr.length; ++i) {
        if (fn(arr[i], i)) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

/*

Approach 2: For...in Loop
For...in loops are more commonly used to iterate over the keys on an object. However, they can also be used to iterate over the indices of an array. This approach is notable because it respects sparse arrays by omitting empty indices. For example, if you wrote let arr = Array(100); arr[1] = 10;, this approach would only apply a filter on the single element and it will automatically remove all the empty values.

An interesting thing to note is that this is the most similar to how the built-in Array.filter works. Because Array.filter needs to handle sparse arrays, it is usually slower than an optimal custom implementation that assumes arrays aren't sparse.

Another thing to note is that since for...in loops include keys on the object's prototype, it is often better to use Object.keys().
*/

var filter = function(arr, fn) {
    const newArr = [];
    for (const stringIndex in arr) {
        const i = Number(stringIndex);
        if (fn(arr[i], i)) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

/*

Approach 3: Preallocate Memory
Pushing elements onto an array can be a slow operation. This is because the array may not have space for the new element and will need to be resized. Initializing the array with new Array(size) can avoid these expensive resizing operations.

At the end, we will remove empty elements by popping them from the end of the array. Note that this algorithm will perform the fastest in the case where few elements are removed from the original array.

*/

var filter = function(arr, fn) {
    let size = 0;
    const newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        if (fn(arr[i], i)) {
            newArr[size] = arr[i];
            size++;
        }
    }
    // Ensure new array is of length size
    while (newArr.length > size) {
        newArr.pop();
    }
    return newArr
};

/*


Approach 4: Perform Operations In-Place
This approach is similar to Approach 3, but utilizes the memory of the input array, avoiding the cost of creating a new array.

Note that this solution is efficient, but it generally is not a good idea to mutate arguments passed into a function. This is because the user of the function may not expect their array to be modified and this could result in bugs. Note that the built-in Array.filter does not mutate the input array.
*/

var filter = function(arr, fn) {
    let size = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (fn(arr[i], i)) {
            arr[size] = arr[i];
            size++;
        }
    }
    // Ensure array is of length size
    while (arr.length > size) {
        arr.pop();
    }
    return arr
};

/*
Approach 5: Standard Library
You were asked not to use the built-in Array.filter method. This approach is mainly included for the performance benchmarks at the end.

*/
var filter = function(arr, fn) {
    return arr.filter(fn);
};