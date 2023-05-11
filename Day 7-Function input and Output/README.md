<h1> Function Composition </h1>

<div class="px-5 pt-4"><div class="_1l1MA" data-track-load="qd_description_content"><p>Given an array of functions&nbsp;<code>[f<span style="font-size: 10.8333px;">1</span>, f<sub>2</sub>, f<sub>3</sub>,&nbsp;..., f<sub>n</sub>]</code>, return&nbsp;a new function&nbsp;<code>fn</code>&nbsp;that is the <strong>function&nbsp;composition</strong> of the array of functions.</p>

<p>The&nbsp;<strong>function&nbsp;composition</strong>&nbsp;of&nbsp;<code>[f(x), g(x), h(x)]</code>&nbsp;is&nbsp;<code>fn(x) = f(g(h(x)))</code>.</p>

<p>The&nbsp;<strong>function&nbsp;composition</strong>&nbsp;of an empty list of functions is the&nbsp;<strong>identity function</strong>&nbsp;<code>f(x) = x</code>.</p>

<p>You may assume each&nbsp;function&nbsp;in the array accepts one integer as input&nbsp;and returns one integer as output.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> functions = [x =&gt; x + 1, x =&gt; x * x, x =&gt; 2 * x], x = 4
<strong>Output:</strong> 65
<strong>Explanation:</strong>
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> functions = [x =&gt; 10 * x, x =&gt; 10 * x, x =&gt; 10 * x], x = 1
<strong>Output:</strong> 1000
<strong>Explanation:</strong>
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> functions = [], x = 42
<strong>Output:</strong> 42
<strong>Explanation:</strong>
The composition of zero functions is the identity function</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code><font face="monospace">-1000 &lt;= x &lt;= 1000</font></code></li>
	<li><code><font face="monospace">0 &lt;= functions.length &lt;= 1000</font></code></li>
	<li><font face="monospace"><code>all functions accept and return a single integer</code></font></li>
</ul>
</div></div>

<div class="break-words"><div><div class="_16yfq _2YoR3"><h2 id="solution">Editorial</h2>
<hr>
<h3 id="overview">Overview</h3>
<p>Function composition is a concept in <a href="https://en.wikipedia.org/wiki/Functional_programming" target="_blank">functional programming</a> where the output of one function is used as the input of another function. In other words, it's the process of chaining two or more functions together so that the result of one function becomes the input to the next.</p>
<p>For example, let's say we have two functions, <code>f(x)</code> and <code>g(x)</code>:</p>
<pre>
const f = x => x + 2;
const g = x => x * 3;
</pre>
<p>The composition of these two functions, denoted as <code>(f ∘ g)(x)</code>*, means applying the function <code>g(x)</code> first, and then using the result of <code>g(x)</code> as the input to <code>f(x)</code>. In this case, <code>(f ∘ g)(x)</code> would be:</p>
<pre>
const composedFunc = x => f(g(x)); // f(g(x)) = f(3x) = 3x + 2
</pre>
<p>So, when we compose the functions <code>f(x)</code> and <code>g(x)</code>, the resulting function <code>(f ∘ g)(x)</code> takes an input <code>x</code>, multiplies it by <code>3</code> (using <code>g(x)</code>), and then adds <code>2</code> to the result (using <code>f(x)</code>).</p>
<pre>
const composedFunc = x => f(g(x)); // f(g(x)) = f(3x) = 3x + 2
</pre>
<p>So, when we compose the functions <code>f(x)</code> and <code>g(x)</code>, the resulting function <code>(f ∘ g)(x)</code> takes an input <code>x</code>, multiplies it by <code>3</code> (using <code>g(x)</code>), and then adds <code>2</code> to the result (using <code>f(x)</code>).</p>
<p>In this problem, you are given an array of functions and asked to create a single function that represents the function composition of the given array of functions.</p>
<p>The challenge here is to create a new function that evaluates the composition of the given functions in the correct order, from right to left. This requires understanding how to chain functions together and pass the output of one function as the input to the next.</p>
<p>In cases where the array of functions is empty, the composed function should act as the identity function, i.e., <code>f(x) = x</code>. In other words, the function should return whatever was passed into it without any modifications.</p>
<p>*The notation <code>(f ∘ g)(x)</code> is used in mathematics to represent function composition. It is read as "<code>f</code> composed with <code>g</code>" or "<code>f</code> of <code>g</code>." The small circle (<code>∘</code>) between <code>f</code> and <code>g</code> is the composition operator. This notation is used to indicate that the function <code>f</code> is applied to the result of applying the function <code>g</code> to the input <code>x</code>. In other words, you first apply <code>g(x)</code> and then use the result as the input to <code>f(x)</code>.</p>
<hr>
<h3 id="approach-1-function-composition-using-iteration">Approach 1: Function Composition using Iteration</h3>
<h4 id="intuition">Intuition</h4>
<p>Function composition is a concept where we apply a series of functions to an input value in a specified order. In this problem, we're asked to compose functions given in an array and create a new function that represents their composition. The order of applying these functions is from right to left, and when the array of functions is empty, we should return the identity function, which returns the input unchanged.</p>
<p>In order to solve this problem, we can iterate over the array of functions backwards and successively apply each function to the input value. We'll start with the input value <code>x</code> and apply the last function in the array to it. We'll then use the result as the input for the previous function and continue the process until we reach the first function in the array. After applying all the functions, we'll return the final result.</p>
<h4 id="algorithm">Algorithm</h4>
<ol>
<li>Inside the <code>compose</code> function, return another function that takes an input value <code>x</code>.</li>
<li>Check if the length of the array of functions is zero; if so, return the identity function (i.e., return <code>x</code>).</li>
<li>Initialize a variable <code>input</code> with the value of <code>x</code>.</li>
<li>Iterate over the array of functions from the last index to the first index.</li>
<li>For each function in the array, apply it to the <code>input</code> value and update the <code>input</code> with the result.</li>
<li>After iterating through all the functions, return the final <code>input</code> value as the output of the composed function.</li>
</ol>
<h4 id="implementation">Implementation</h4>
<p>Here is an implementation using a regular <code>for</code> loop:</p>
<pre>
var compose = function (functions) {
  return function (x) {
    if (functions.length === 0) return x;
    let input = x;

    for (let i = functions.length - 1; i >= 0; i--) {
      const currFunc = functions[i];

      input = currFunc(input);
    }

    return input;
  };
};
</pre>
<p>Implementation using a <code>for ... of</code> loop:</p>
<pre>
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
</pre>
<h4 id="complexity-analysis">Complexity Analysis</h4>
<p>Let <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> be the number of functions in the array.</p>
<p>Time complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(N)O(N)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span><span class="mclose">)</span></span></span></span></span>. Each of the <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> functions in the array is called exactly once, assuming that each function has a constant time complexity.</p>
<p>Space complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(1)O(1)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span>. The iterative method uses a single variable input to store the intermediate results, not requiring any additional space.</p>
<hr>
<h3 id="approach-2--function-composition-using-arrayreduceright">Approach 2:  Function Composition using Array.reduceRight()</h3>
<h4 id="intuition-1">Intuition</h4>
<p>In the first approach, we used iteration to apply the functions from right to left. Alternatively, we can utilize the <code>Array.reduceRight()</code> method to achieve the same result. The <code>reduceRight()</code> method applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value. In this case, our accumulator will be the input value <code>x</code>, and the function will be the composition of the functions in the array.</p>
<p>Using <code>reduceRight()</code> simplifies the code and provides a more functional programming style solution. The key is to understand how the <code>Array.reduceRight()</code> method works and how it can be applied to this problem.</p>
<h4 id="algorithm-1">Algorithm</h4>
<ol>
<li>Inside the <code>compose</code> function, return another function that takes an input value <code>x</code>.</li>
<li>Use the <code>Array.reduceRight()</code> method to iterate over the functions from right to left.</li>
<li>For each function in the array, apply it to the accumulator (<code>x</code> initially) and update the accumulator with the result.</li>
<li>After iterating through all the functions, return the final accumulator value as the output of the composed function.</li>
</ol>
<h4 id="implementation-1">Implementation</h4>
<pre>
type F = (x: number) => number;

function compose(functions: F[]): F {
    return (x: number) => functions.reduceRight((acc, f) => f(acc), x);
}
;
</pre>
<p>The key here is to understand how <code>Array.reduceRight()</code> works.</p>
<p><code>Array.reduceRight()</code> is a built-in JavaScript array method that can be used to apply a function to each element of an array, starting from the rightmost element and moving towards the left. It takes two arguments: a reducer function and an optional initial value for the accumulator.</p>
<p>The reducer function itself has four arguments: the accumulator, the current value, the current index, and the array being processed. The accumulator is a value that is being built up with each iteration, and it is returned at the end of the process. In our case, the accumulator represents the intermediate result of applying the functions in the composition.</p>
<p>Here's a breakdown of how <code>Array.reduceRight()</code> works in the context of the compose function:</p>
<ol>
<li>The compose function receives an array of functions and returns a new function that takes an input value <code>x</code>.</li>
<li>When the new function is called with an input value <code>x</code>, it calls <code>Array.reduceRight()</code> on the functions array.</li>
<li>The reducer function is called for each function in the array, starting from the rightmost element and moving towards the left. The accumulator initially holds the input value <code>x</code>.</li>
<li>In each iteration, the reducer function applies the current function to the accumulator and updates the accumulator with the result.</li>
<li>Once all the functions have been applied, the final value of the accumulator is returned.</li>
</ol>
<p>To illustrate this process, let's consider a simple example:</p>
<pre>
const functions = [x => x * 2, x => x + 1];
const composedFn = compose(functions);
const result = composedFn(3); // result should be (3 + 1) * 2 = 8
</pre>
<ol>
<li>The compose function receives an array functions with two functions: <code>x =&gt; x * 2</code> and <code>x =&gt; x + 1</code>.</li>
<li>When <code>composedFn</code> is called with the input value <code>3</code>, it calls <code>Array.reduceRight()</code> on the functions array.</li>
<li>The reducer function starts with the rightmost function <code>x =&gt; x + 1</code> and applies it to the accumulator (initially <code>3</code>). The accumulator becomes <code>3 + 1 = 4</code>.</li>
<li>The reducer function then moves to the next function <code>x =&gt; x * 2</code> and applies it to the accumulator (now <code>4</code>). The accumulator becomes <code>4 * 2 = 8</code>.</li>
<li>The final value of the accumulator, <code>8</code>, is returned as the result of the composed function.</li>
</ol>
<p>To sum up, by using <code>Array.reduceRight()</code>, we can easily apply the function composition in a clean and concise manner.</p>
<h4 id="complexity-analysis-1">Complexity Analysis</h4>
<p>Let <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> be the number of functions in the array.</p>
<p>Time complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(N)O(N)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span><span class="mclose">)</span></span></span></span></span>. Each of the <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> functions in the array is called exactly once, assuming that each function has a constant time complexity.
Space complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(1)O(1)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span>. The reduceRight method uses an accumulator to store the intermediate results, not requiring any additional space.</p>
<hr>
<h3 id="additional-considerations">Additional Considerations</h3>
<p>A professional implementation would need to consider several more things when dealing with function composition.</p>
<h4 id="handling-this-context">Handling this context</h4>
<p>In JavaScript, the value of this within a function depends on how the function is called. When using function composition, it's important to consider how the <code>this</code> context of the original functions is preserved. Although the provided test cases may not explicitly test for this, handling the <code>this</code> context correctly can be crucial in real-world scenarios.</p>
<p>One approach to handle the <code>this</code> context is to use the <code>call</code> or <code>apply</code> methods when invoking the composed functions. This allows you to explicitly set the value of this when calling the function. For example:</p>
<pre>
const composedFn = function(x) {
  let result = x;
  for (let i = functions.length - 1; i >= 0; i--) {
    result = functions[i].call(this, result);
  }
  return result;
};
</pre>
<p>This ensures that the <code>this</code> context of the original functions is preserved when they are called as part of the composed function. For more clarity, consider a scenario where the functions you're composing are methods on an object, and they rely on <code>this</code> to access other properties or methods on that object. If you don't correctly preserve the <code>this</code> context when composing these methods, they may not work as expected.</p>
<pre>
const obj = {
  value: 1,
  increment: function() { this.value++; return this.value; },
  double: function() { this.value *= 2; return this.value; },
};

// Composing the methods without preserving `this`
const badCompose = function(functions) {
  return function(x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

const badComposedFn = badCompose([obj.increment, obj.double]);
console.log(badComposedFn(1));  // This will return NaN, because `this` is not `obj` inside `increment` and `double`
</pre>
<p>To handle this situation, you can use the <code>call</code> or <code>apply</code> methods when invoking the composed functions. This allows you to explicitly set the value of <code>this</code> when calling the function:</p>
<pre>
const obj = {
  value: 1,
  increment: function() { this.value++; return this.value; },
  double: function() { this.value *= 2; return this.value; },
};

// Composing the methods while preserving `this`
const goodCompose = function(functions, context) {
  return function(x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i].call(context, result);
    }
    return result;
  };
};

const goodComposedFn = goodCompose([obj.increment, obj.double], obj);
console.log(goodComposedFn(1));  // This works as expected, because `this` is `obj` inside `increment` and `double`
</pre>
<h4 id="using-external-libraries">Using External Libraries</h4>
<p>Instead of writing your own function composition implementation, you might consider using external libraries that provide this functionality. Libraries like Ramda and Lodash offer various utility functions, including function composition. By using a well-known library, you can benefit from the following:</p>
<ol>
<li>Robustness: These libraries have been tested extensively and are used by many developers, ensuring that their implementations are reliable and handle various edge cases.</li>
<li>Performance: These libraries are optimized for performance and are likely to have better performance characteristics than a custom implementation.</li>
<li>Readability: Using a popular library can improve the readability of your code, as other developers are more likely to be familiar with the library's functions and their behavior.</li>
<li>Documentation: Renowned libraries usually have comprehensive documentation. This can significantly ease the development process, as you can quickly refer to the documentation for function explanations, usage examples, and more. Furthermore, many modern code editors support features like hovering over a function to display a brief description and a link to more detailed documentation. This is particularly helpful for understanding the expected behavior of library functions without having to constantly switch to a web browser.</li>
</ol>
<p>Here's an example of using Ramda's <code>compose</code> function:</p>
<pre>
import { compose } from 'ramda';

const composedFn = compose(...functions);
</pre>
<p>And similarly, using Lodash's <code>flowRight</code> function:</p>
<pre>
import { flowRight } from 'lodash';

const composedFn = flowRight(...functions);
</pre>
</div></div></div>