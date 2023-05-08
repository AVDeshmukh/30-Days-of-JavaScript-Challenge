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
<h4 id="performance-benchmarks">Performance Benchmarks</h4>
<p>The following approaches include approximate benchmark results. You can test the results for yourself on this <a href="https://leetcode.com/playground/hAzJ7xEF" target="_blank">playground</a>. Tests are done with a random array of 5 million integers and a callback that increments each number.</p>
<h2 id="approach-1-write-values-onto-initially-empty-array">Approach 1: Write Values onto Initially Empty Array</h2>
<p>In JavaScript, you can read and write to indices that aren't in the range <code>[0, arr.length)</code>. Just like with normal objects, accessing an index that doesn't exist returns <code>undefined</code>. Writing to an index that doesn't exist is generally discouraged because, besides being confusing, it can result in slow and unpredictable performance.</p>
<p>This app
roach takes ~250ms for 5M elements.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/QUYYb59C/shared" width="100%" height="174" name="user-content-QUYYb59C" allowfullscreen="" translate="no"></iframe>
<hr>
<h2 id="approach-2-forin-loop">Approach 2: For...in Loop</h2>
<p>For...in loops are more commonly used to iterate over the keys on an object. However, they can also be used to iterate over the indices of an array. This approach is notable because it respects sparse arrays. For example, if you wrote <code>let arr = Array(100); arr[1] = 10;</code>, this approach would only transform the single element.</p>
<p>This approach takes ~1000ms for 5M elements. An interesting thing to note is that this is the most similar to how the built-in <code>Array.map</code> works. Because <code>Array.map</code> needs to handle sparse arrays, it is usually several times slower than an optimal custom implementation that assumes arrays aren't sparse.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/SdoaGFVS/shared" width="100%" height="174" name="user-content-SdoaGFVS" allowfullscreen="" translate="no"></iframe>
<hr>
<h2 id="approach-3-push-values-onto-array">Approach 3: Push Values onto Array</h2>
<p>JavaScript arrays are confusingly named because traditionally arrays have a fixed sized. However in JavaScript arrays can have elements appended with an average <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(1)O(1)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span> time. You can build up a transformed array by appending each element to the end one-by-one.</p>
<p>This approach takes ~200ms for 5M elements.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/8qWQ3Z6R/shared" width="100%" height="174" name="user-content-8qWQ3Z6R" allowfullscreen="" translate="no"></iframe>
<hr>
<h2 id="approach-4-preallocate-memory">Approach 4: Preallocate Memory</h2>
<p>You can create an empty array with some length using the <code>new Array(len)</code> constructor. Note that the memory is allocated but the array doesn't actually contain any elements.</p>
<p>This technique is more performant than appending elements to the end of the array. This is because whenever you push a value to an array, the array may not have enough memory allocated to it and it will need to be resized. This is an expensive operation. Initializing the memory upfront can result in much better performance.</p>
<p>This approach takes ~40ms for 5M elements.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/X6yV2sdF/shared" width="100%" height="174" name="user-content-X6yV2sdF" allowfullscreen="" translate="no"></iframe>
<hr>
<h4 id="approach-5-32-bit-integer-array">Approach 5: 32 Bit Integer Array</h4>
<p>JavaScript allows you to use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays" target="_blank">typed arrays</a>. These aren't like normal JavaScript arrays because they only allow specific data types and their size cannot be altered.</p>
<p>These are a useful tool when you want to store lots of data in a memory efficient way. Traditional arrays can take up significant amounts of memory because they are not fixed size and can store arbitrary data.</p>
<p>This approach takes ~20ms for 5M elements.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/NE5GF878/shared" width="100%" height="174" name="user-content-NE5GF878" allowfullscreen="" translate="no"></iframe>
<hr>
<h4 id="approach-6-in-memory-transformation">Approach 6: In-Memory Transformation</h4>
<p>To achieve optimal performance, you can simply reuse the memory already allocated to the first array.</p>
<p>It's important to note that it is generally discouraged for a function to modify the values passed to it. It can lead to unexpected bugs where the user of the function was not expecting that as a side-effect. The built-in <code>Array.map</code> does not modify the original array.</p>
<p>This approach takes ~10ms for 5M elements.</p>
<p><strong>Implementation</strong></p>
<iframe src="https://leetcode.com/playground/WGm9VwNL/shared" width="100%" height="157" name="user-content-WGm9VwNL" allowfullscreen="" translate="no"></iframe>
<hr>
<h4 id="complexity-analysis">Complexity Analysis</h4>
<p>The following analysis applies to all of the approaches.</p>
<p>Time complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(N)O(N)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span><span class="mclose">)</span></span></span></span></span> where <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> is <code>arr.length</code>.</p>
<p>Space complexity: <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(N)O(N)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span><span class="mclose">)</span></span></span></span></span> where <span class="math math-inline"><span class="katex"><span class="katex-mathml">NN</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.6833em;"></span><span class="mord mathnormal" style="margin-right: 0.10903em;">N</span></span></span></span></span> is <code>arr.length</code>. The <em><strong>extra</strong></em> space is <span class="math math-inline"><span class="katex"><span class="katex-mathml">O(1)O(1)</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 1em; vertical-align: -0.25em;"></span><span class="mord mathnormal" style="margin-right: 0.02778em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span> for Approach 6.</p></div></div>