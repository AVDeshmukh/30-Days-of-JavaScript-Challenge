<div class="px-5 pt-4"><div class="_1l1MA" data-track-load="qd_description_content"><p>Given a function&nbsp;<code>fn</code>,&nbsp;return&nbsp;a&nbsp;<strong>curried</strong>&nbsp;version of that function.</p>

<p>A&nbsp;<strong>curried</strong>&nbsp;function is a function that accepts fewer or an equal number of&nbsp;parameters as the original function and returns either another&nbsp;<strong>curried</strong>&nbsp;function or the same value the original function would have returned.</p>

<p>In practical terms, if you called the original function like&nbsp;<code>sum(1,2,3)</code>, you would call the&nbsp;<strong>curried</strong>&nbsp;version like <code>csum(1)(2)(3)<font face="sans-serif, Arial, Verdana, Trebuchet MS">,&nbsp;</font></code><code>csum(1)(2,3)</code>,&nbsp;<code>csum(1,2)(3)</code>, or&nbsp;<code>csum(1,2,3)</code>. All these methods of calling the <strong>curried</strong> function&nbsp;should return the same value as the original.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> 
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[1],[2],[3]]
<strong>Output:</strong> 6
<strong>Explanation:</strong>
The code being executed is:
const curriedSum = curry(fn);
curriedSum(1)(2)(3) === 6;
curriedSum(1)(2)(3) should return the same value as sum(1, 2, 3).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong>
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[1,2],[3]]
<strong>Output:</strong> 6
<strong>Explanation:</strong>
curriedSum(1, 2)(3) should return the same value as sum(1, 2, 3).</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong>
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[],[],[1,2,3]]
<strong>Output:</strong> 6
<strong>Explanation:</strong>
You should be able to pass the parameters in any way, including all at once or none at all.
curriedSum()()(1, 2, 3) should return the same value as sum(1, 2, 3).
</pre>

<p><strong class="example">Example 4:</strong></p>

<pre><strong>Input:</strong>
fn = function life() { return 42; }
inputs = [[]]
<strong>Output:</strong> 42
<strong>Explanation:</strong>
currying a function that accepts zero parameters should effectively do nothing.
curriedLife() === 42
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= inputs.length &lt;= 1000</code></li>
	<li><code>0 &lt;= inputs[i][j] &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= fn.length &lt;= 1000</code></li>
	<li><code>inputs.flat().length == fn.length</code></li>
	<li><code>function parameters explicitly defined</code></li>
</ul>
</div></div>

<div class="break-words"><div><div class="_16yfq _2YoR3"><h2 id="solution">Solution</h2>
<hr>
<h3 id="overview">Overview</h3>
<p>Currying is a powerful technique in functional programming that transforms a function with multiple arguments into a sequence of functions. It allows you to create flexible and reusable code by enabling partial application of function arguments. In this article, we will discuss the concept and implementation of currying in JavaScript.</p>
<p>Example:</p>
<p>Suppose we have a function sum that takes three arguments and returns their sum:</p>
<iframe src="https://leetcode.com/playground/LYkChWNA/shared" width="100%" height="106" name="user-content-LYkChWNA" allowfullscreen="" translate="no"></iframe>
<p>We can create a curried version of this function, curriedSum. Now, we can call curriedSum in various ways, all of which should return the same result as the original sum function:</p>
<iframe src="https://leetcode.com/playground/fNzvffeJ/shared" width="100%" height="174" name="user-content-fNzvffeJ" allowfullscreen="" translate="no"></iframe>
<p>Currying in JavaScript has several practical applications that can help improve code readability, maintainability, and reusability. Here are some practical use cases of currying:</p>
<ol>
<li>
<p>Reusable utility functions: Currying can help create reusable utility functions that can be easily customized for specific use cases.
Currying allows you to create a function that returns another function with a partially applied argument. In this case, we have a curried add function that takes two arguments, a and b. When you call add with a single argument, it returns a new function that takes the second argument b and adds it to the initially provided a.</p>
<p>Here's the example with more explanation:</p>
<iframe src="https://leetcode.com/playground/kSR5xiyh/shared" width="100%" height="225" name="user-content-kSR5xiyh" allowfullscreen="" translate="no"></iframe>
</li>
<li>
<p>Event handling: In event-driven programming, currying can be used to create event handlers with specific configurations, while keeping the core event handling function generic.</p>
<iframe src="https://leetcode.com/playground/KwsJBbqH/shared" width="100%" height="208" name="user-content-KwsJBbqH" allowfullscreen="" translate="no"></iframe>
</li>
<li>
<p>Customizing API calls: Currying can help create more specific API calls based on a generic API call function.</p>
<iframe src="https://leetcode.com/playground/CKWPhut5/shared" width="100%" height="259" name="user-content-CKWPhut5" allowfullscreen="" translate="no"></iframe>
</li>
<li>
<p>Higher-order functions and functional composition: Currying enables the creation of higher-order functions that can be composed to create more complex functionality.</p>
</li>
</ol>
<iframe src="https://leetcode.com/playground/ZADJMvbK/shared" width="100%" height="225" name="user-content-ZADJMvbK" allowfullscreen="" translate="no"></iframe>
<p>Currying is a valuable concept in functional programming that enables you to write more flexible and reusable code. Mastering currying will help you create cleaner and more efficient solutions for a wide range of programming problems.</p>
<hr>
<h3 id="approach-1-currying-with-recursive-function-calls">Approach 1: Currying with Recursive Function Calls</h3>
<h3 id="intuition">Intuition</h3>
<p>The problem requires us to transform a given function into a curried version. A curried function is a function that accepts fewer or an equal number of parameters as the original function and returns either another curried function or the same value the original function would have returned.</p>
<p>This can be achieved using a recursive approach that returns a new function each time it's called with fewer arguments than the original function. This continues until a sufficient amount of arguments has been collected. At that point, the original function can be called.</p>
<h3 id="algorithm">Algorithm</h3>
<ol>
<li>The <code>curry</code> function takes a function (<code>fn</code>) as its parameter. This is the function that will be eventually executed with the curried arguments.</li>
<li>It returns a new function (<code>curried</code>) that is responsible for accumulating the arguments passed to it until the required number of arguments is reached. This function acts as a closure, remembering the accumulated arguments at each step.</li>
<li><code>curried</code> is defined with the rest parameter syntax <code>(...args)</code> to accept a variable number of arguments, allowing partial application at each step.</li>
<li>Inside <code>curried</code>, a check is performed to see if the accumulated arguments are sufficient. If the number of arguments passed (<code>args.length</code>) is greater than or equal to the original function's arity (<code>fn.length</code>), then all required arguments have been provided. This is our base case.</li>
<li>If the sufficient arguments check passes, invoke <code>fn</code> with the spread syntax <code>(...args)</code> to pass all the collected arguments, and return the result.</li>
<li>If the number of arguments passed is not sufficient, then return an anonymous function that also uses the rest parameter syntax <code>(...nextArgs)</code>. This allows for further accumulation of arguments.</li>
<li>When the anonymous function is called, it invokes <code>curried</code> again with the accumulated arguments from both <code>args</code> and <code>nextArgs</code>. This ensures that the arguments are passed in the correct order and merged together.</li>
<li>The process of accumulating arguments and invoking <code>curried</code> continues until the necessary number of arguments is met. This enables the flexibility to apply arguments in any combination of calls.</li>
<li>Once the necessary number of arguments is met, the original function (<code>fn</code>) is called with all the accumulated arguments, providing the same result as if the original function had been called directly with those arguments.</li>
</ol>
<h3 id="implementation">Implementation</h3>
<iframe src="https://leetcode.com/playground/Beet8NND/shared" width="100%" height="208" name="user-content-Beet8NND" allowfullscreen="" translate="no"></iframe>
<h3 id="complexity-analysis">Complexity Analysis</h3>
<p>Let N be the number of arguments in the original function.</p>
<p>Time complexity: O(N). The algorithm creates a chain of functions with a depth proportional to the number of arguments.</p>
<p>Space complexity: O(N). The algorithm uses memory to store intermediate functions and arguments, which grows with the number of arguments in the original function.</p>
<hr>
<h3 id="approach-2--currying-with-the-built-in-bind-method">Approach 2:  Currying with the Built-in Bind Method</h3>
<h3 id="intuition-1">Intuition</h3>
<p>The general intuition is the same as for Approach 1. Although it's not required by the test cases, in this approach, we're also going to handle situations where the 'this' context needs to be taken care of, as it's an important part of writing a production-ready solution. Using the bind method makes the code very concise, as it abstracts away some of the complexity.</p>
<p>The bind method is particularly helpful in this scenario, as it creates a new function with the same body as the curried function and a specified 'this' context. In our currying implementation, we use bind to create a new function with the accumulated arguments and the same 'this' context as the original curried function. This allows us to keep track of the collected arguments while also preserving the 'this' context across multiple calls. The bind method makes the code concise and easy to read, as it essentially abstracts away the need for writing a whole new function.</p>
<p>Simply put, the bind method creates a new function, which we return - in this case, it creates a function almost identical to (...nextArgs) =&gt; curried(...args, ...nextArgs), but with a fixed 'this' context. Note that the function created by bind also accepts incoming arguments, which we accomplish with the '...nextArgs' part in Approach 1.</p>
<h3 id="algorithm-1">Algorithm</h3>
<ol>
<li>The curry function takes a function (fn) as its parameter. This is the function that will be eventually executed with the curried arguments.</li>
<li>It returns a new function (curried) that is responsible for accumulating the arguments passed to it until the required number of arguments is reached. This function acts as a closure, remembering the accumulated arguments at each step.</li>
<li>curried is defined with the rest parameter syntax (...args) to accept a variable number of arguments, allowing partial application at each step.</li>
<li>Inside curried, a check is performed to see if the accumulated arguments are sufficient. If the number of arguments passed (args.length) is greater than or equal to the original function's arity (fn.length), then all required arguments have been provided. This is our base case.</li>
<li>If the sufficient arguments check passes, invoke fn with the apply method to pass all the collected arguments with the correct this context, and return the result. It's worth noting that scenarios involving this context are not tested by the automated judge.</li>
<li>If the number of arguments passed is not sufficient, then return a new function created with the bind method. This allows for further accumulation of arguments while preserving the this context. The bind method creates a new function similar to the function we were returning in Approach 1. It's essentially equivalent to (...nextArgs) =&gt; curried.apply(this, args).</li>
<li>The process of accumulating arguments and invoking curried continues until the necessary number of arguments is met. This enables the flexibility to apply arguments in any combination of calls.
8.Once the necessary number of arguments is met, the original function (fn) is called with all the accumulated arguments, providing the same result as if the original function had been called directly with those arguments.</li>
</ol>
<h3 id="implementation-1">Implementation</h3>
<iframe src="https://leetcode.com/playground/DwTsJMXS/shared" width="100%" height="208" name="user-content-DwTsJMXS" allowfullscreen="" translate="no"></iframe>
<h3 id="complexity-analysis-1">Complexity Analysis</h3>
<p>Let N be the number of arguments in the original function.</p>
<p>Time complexity: O(N). The algorithm creates a chain of functions with a depth proportional to the number of arguments.</p>
<p>Space complexity: O(N). The algorithm uses memory to store intermediate functions and arguments, which grows with the number of arguments in the original function.</p>
<hr>
<h3 id="additional-considerations">Additional Considerations</h3>
<h4 id="partial-application-vs-currying">Partial Application vs Currying</h4>
<p>Partial application and currying are closely related concepts in functional programming, but they serve different purposes. In fact, currying can be considered a type of partial application.</p>
<p>Partial Application:</p>
<p>Partial application refers to the process of fixing a number of arguments to a function, generating a new function with a smaller number of remaining arguments. It allows you to create new functions from existing ones by pre-specifying some of the arguments. This can lead to more modular and reusable code.</p>
<p>For example, suppose we have a function that takes three arguments:</p>
<div class="mb-6 rounded-lg px-3 py-2.5 font-menlo text-sm bg-fill-3 dark:bg-dark-fill-3"><div class="group relative" translate="no"><pre style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none; padding: 0px; margin: 0px; overflow: auto; background: transparent;"><code class="language-javascript" style="color: rgb(156, 220, 254); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, &quot;Courier New&quot;, monospace; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none;"><span><span class="token" style="color: rgb(86, 156, 214);">function</span><span> </span><span class="token" style="color: rgb(220, 220, 170);">sum</span><span class="token" style="color: rgb(212, 212, 212);">(</span><span class="token" style="color: rgb(156, 220, 254);">a</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span class="token" style="color: rgb(156, 220, 254);"> b</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span class="token" style="color: rgb(156, 220, 254);"> c</span><span class="token" style="color: rgb(212, 212, 212);">)</span><span> </span><span class="token" style="color: rgb(212, 212, 212);">{</span><span>
</span></span><span><span>  </span><span class="token" style="color: rgb(197, 134, 192);">return</span><span> a </span><span class="token" style="color: rgb(212, 212, 212);">+</span><span> b </span><span class="token" style="color: rgb(212, 212, 212);">+</span><span> c</span><span class="token" style="color: rgb(212, 212, 212);">;</span><span>
</span></span><span><span></span><span class="token" style="color: rgb(212, 212, 212);">}</span></span></code></pre><div class="h-4 w-4 cursor-pointer absolute top-0 right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="h-4 w-4 fill-gray-6 hover:fill-gray-7 dark:fill-dark-gray-6 dark:hover:fill-dark-gray-7 hidden group-hover:block"><path fill-rule="evenodd" d="M11.3 8.3H19a3 3 0 013 3V19a3 3 0 01-3 3h-7.7a3 3 0 01-3-3v-7.7a3 3 0 013-3zm0 2a1 1 0 00-1 1V19a1 1 0 001 1H19a1 1 0 001-1v-7.7a1 1 0 00-1-1h-7.7zm-5.6 3.4a1 1 0 110 2h-.9A2.8 2.8 0 012 12.9V4.8A2.8 2.8 0 014.8 2h8.1a2.8 2.8 0 012.8 2.8v.9a1 1 0 11-2 0v-.9a.8.8 0 00-.8-.8H4.8a.8.8 0 00-.8.8v8.1a.8.8 0 00.8.8h.9z" clip-rule="evenodd"></path></svg></div></div></div>
<p>We can create a partially applied function that "fixes" the first argument to 1:</p>
<div class="mb-6 rounded-lg px-3 py-2.5 font-menlo text-sm bg-fill-3 dark:bg-dark-fill-3"><div class="group relative" translate="no"><pre style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none; padding: 0px; margin: 0px; overflow: auto; background: transparent;"><code class="language-javascript" style="color: rgb(156, 220, 254); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, &quot;Courier New&quot;, monospace; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none;"><span><span class="token" style="color: rgb(86, 156, 214);">function</span><span> </span><span class="token" style="color: rgb(220, 220, 170);">partialSum</span><span class="token" style="color: rgb(212, 212, 212);">(</span><span class="token" style="color: rgb(156, 220, 254);">b</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span class="token" style="color: rgb(156, 220, 254);"> c</span><span class="token" style="color: rgb(212, 212, 212);">)</span><span> </span><span class="token" style="color: rgb(212, 212, 212);">{</span><span>
</span></span><span><span>  </span><span class="token" style="color: rgb(197, 134, 192);">return</span><span> </span><span class="token" style="color: rgb(220, 220, 170);">sum</span><span class="token" style="color: rgb(212, 212, 212);">(</span><span class="token" style="color: rgb(181, 206, 168);">1</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span> b</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span> c</span><span class="token" style="color: rgb(212, 212, 212);">)</span><span class="token" style="color: rgb(212, 212, 212);">;</span><span>
</span></span><span><span></span><span class="token" style="color: rgb(212, 212, 212);">}</span></span></code></pre><div class="h-4 w-4 cursor-pointer absolute top-0 right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="h-4 w-4 fill-gray-6 hover:fill-gray-7 dark:fill-dark-gray-6 dark:hover:fill-dark-gray-7 hidden group-hover:block"><path fill-rule="evenodd" d="M11.3 8.3H19a3 3 0 013 3V19a3 3 0 01-3 3h-7.7a3 3 0 01-3-3v-7.7a3 3 0 013-3zm0 2a1 1 0 00-1 1V19a1 1 0 001 1H19a1 1 0 001-1v-7.7a1 1 0 00-1-1h-7.7zm-5.6 3.4a1 1 0 110 2h-.9A2.8 2.8 0 012 12.9V4.8A2.8 2.8 0 014.8 2h8.1a2.8 2.8 0 012.8 2.8v.9a1 1 0 11-2 0v-.9a.8.8 0 00-.8-.8H4.8a.8.8 0 00-.8.8v8.1a.8.8 0 00.8.8h.9z" clip-rule="evenodd"></path></svg></div></div></div>
<p>Now, when we call partialSum, we only need to provide the remaining two arguments:</p>
<div class="mb-6 rounded-lg px-3 py-2.5 font-menlo text-sm bg-fill-3 dark:bg-dark-fill-3"><div class="group relative" translate="no"><pre style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none; padding: 0px; margin: 0px; overflow: auto; background: transparent;"><code class="language-javascript" style="color: rgb(156, 220, 254); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, &quot;Courier New&quot;, monospace; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none;"><span><span class="token" style="color: rgb(78, 201, 176);">console</span><span class="token" style="color: rgb(212, 212, 212);">.</span><span class="token method property-access" style="color: rgb(220, 220, 170);">log</span><span class="token" style="color: rgb(212, 212, 212);">(</span><span class="token" style="color: rgb(220, 220, 170);">partialSum</span><span class="token" style="color: rgb(212, 212, 212);">(</span><span class="token" style="color: rgb(181, 206, 168);">2</span><span class="token" style="color: rgb(212, 212, 212);">,</span><span> </span><span class="token" style="color: rgb(181, 206, 168);">3</span><span class="token" style="color: rgb(212, 212, 212);">)</span><span class="token" style="color: rgb(212, 212, 212);">)</span><span class="token" style="color: rgb(212, 212, 212);">;</span><span> </span><span class="token" style="color: rgb(106, 153, 85);">// Output: 6</span></span></code></pre><div class="h-4 w-4 cursor-pointer absolute top-0 right-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="h-4 w-4 fill-gray-6 hover:fill-gray-7 dark:fill-dark-gray-6 dark:hover:fill-dark-gray-7 hidden group-hover:block"><path fill-rule="evenodd" d="M11.3 8.3H19a3 3 0 013 3V19a3 3 0 01-3 3h-7.7a3 3 0 01-3-3v-7.7a3 3 0 013-3zm0 2a1 1 0 00-1 1V19a1 1 0 001 1H19a1 1 0 001-1v-7.7a1 1 0 00-1-1h-7.7zm-5.6 3.4a1 1 0 110 2h-.9A2.8 2.8 0 012 12.9V4.8A2.8 2.8 0 014.8 2h8.1a2.8 2.8 0 012.8 2.8v.9a1 1 0 11-2 0v-.9a.8.8 0 00-.8-.8H4.8a.8.8 0 00-.8.8v8.1a.8.8 0 00.8.8h.9z" clip-rule="evenodd"></path></svg></div></div></div>
<p>Partial application deals with fixing a certain number of arguments, creating a new function with fewer remaining arguments. This makes it useful for creating specialized versions of more general functions.</p>
<p>Currying, on the other hand, breaks down a function into a sequence of functions, each taking a single argument (or possibly more). This allows you to pass arguments one at a time and create new functions based on intermediate results.</p>
<p>While both techniques can lead to more modular and reusable code, their specific use cases and implementations are different. Currying is more focused on creating a chain of functions, while partial application is about fixing arguments to create more specialized functions.</p>
<h4 id="different-implementations-of-curry">Different implementations of curry</h4>
<p>It's worth noting that there are many different implementations of the curry higher-order function, which may vary significantly in behavior.</p>
<p>This problem presents one of the most popular behaviors of curry. Another popular variation is a curry function that doesn't accept a predefined amount of arguments (the function doesn't have a predefined length e.g const getSum = (...args) =&gt; args.reduce((a, b) =&gt; a + b, 0)) and is called when the user doesn't pass any arguments. We can easily modify one of the approaches above to achieve that:</p>
<iframe src="https://leetcode.com/playground/BLQtzETk/shared" width="100%" height="310" name="user-content-BLQtzETk" allowfullscreen="" translate="no"></iframe>
<p>It's always important to clarify with the interviewer which version we are asked to implement.</p></div></div></div>