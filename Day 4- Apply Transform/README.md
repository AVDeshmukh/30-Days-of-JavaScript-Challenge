<h1>Apply Transform Over Each Element in Array</h1>
<div class="px-5 pt-4"><div class="_1l1MA" data-track-load="qd_description_content"><p>Given an integer array&nbsp;<code>arr</code>&nbsp;and a mapping function&nbsp;<code>fn</code>, return&nbsp;a new array with a transformation applied to each element.</p>

<p>The returned array should be created such that&nbsp;<code>returnedArray[i] = fn(arr[i], i)</code>.</p>

<p>Please solve it without the built-in <code>Array.map</code> method.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3], fn = function plusone(n) { return n + 1; }
<strong>Output:</strong> [2,3,4]
<strong>Explanation:</strong>
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one. 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
<strong>Output:</strong> [1,3,5]
<strong>Explanation:</strong> The function increases each value by the index it resides in.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> arr = [10,20,30], fn = function constant() { return 42; }
<strong>Output:</strong> [42,42,42]
<strong>Explanation:</strong> The function always returns 42.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= arr.length &lt;= 1000</code></li>
	<li><code><font face="monospace">-10<sup>9</sup>&nbsp;&lt;= arr[i] &lt;= 10<sup>9</sup></font></code></li>
	<li><font face="monospace"><code>fn returns a number</code></font></li>
</ul>
</div></div>
<div><div class="_16yfq _2YoR3"><h2 id="solution">Apply Transform Over Each Element in Array
</h2>
<hr>
<h3 id="overview">Overview</h3>
<p>This question is intended as an introduction to <em><strong>callbacks</strong></em>. A callback is defined as a function passed as an argument to another function. They are critical to understand as they are used frequently in almost any JavaScript codebase and are essential to writing reusable code.</p>
<h4 id="why-use-callbacks">Why Use Callbacks</h4>
<p>The simple answer is they allow you to write code that can be reused across different use-cases.</p>
<p>Imagine you created an algorithm that sorts an array of numbers. Then you encounter a situation where you want to sort an array of people by their age. One option is to re-write the algorithm to handle arrays of people. However, a far better way is to have this function accept a callback that is expected to return a number. Then you can keep the core algorithm the same, and the user of the function simply passes <code>person =&gt; person.age</code> as the 2nd parameter.</p>
<p>Just about any generic algorithm can benefit from accepting callbacks. The standard JavaScript library and many 3rd party packages rely heavily on them. This particular question asks to reimplement the <code>Array.map</code> method, which is one of the most heavily used array methods in JavaScript. However, there are four small differences.</p>
<ol>
<li><code>Array.map</code> is a method on the Array prototype. This implementation accepts the array as the 1st argument.</li>
<li>The callback provided to <code>Array.map</code> passes a reference to the original array as the 3rd argument. This implementation's callback only accepts two arguments.</li>
<li><code>Array.map</code> optionally allows you pass a <code>thisArg</code> as the 2nd parameter. If provided, the passed callback will be bound to that context (assuming the callback isn't an arrow function as they can't be bound).</li>
<li><code>Array.map</code> is required to handle sparse arrays. For example, if you write code <code>let arr = Array(100); arr[1] = 1;</code>, <code>Array.map</code> will only look at index 1.</li>
</ol>
