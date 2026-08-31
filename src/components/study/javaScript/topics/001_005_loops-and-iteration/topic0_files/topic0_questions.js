/**
 * Topic 0 Questions: while Loop
 * Module: 001_005_loops-and-iteration
 * Educator: Sukanta Hui | Coder & AccoTax
 */

const questions = [
  {
    question: "What defines an entry-controlled loop in JavaScript and why is while an example of one?",
    shortAnswer: "An entry-controlled loop evaluates its condition before executing any code in its body; if the condition evaluates to false at the start, the loop body executes 0 times.",
    explanation: "Unlike do...while loops which execute at least once, the while loop tests the condition expression upfront during the evaluation phase of the loop header. If the condition produces a falsy value immediately, the loop statement finishes instantly.",
    hint: "Think: check before entry.",
    level: "basic",
    codeExample: "let x = 10;\nwhile (x < 5) {\n  console.log('Never runs');\n}"
  },
  {
    question: "What is the primary cause of an accidental infinite loop in a while statement?",
    shortAnswer: "Failing to mutate the variables participating in the condition expression inside the loop body, or establishing a condition that can never evaluate to false.",
    explanation: "Because while loops do not have a built-in increment step in their syntax header, the developer is responsible for updating the control variable inside the loop block. Omitting this statement leaves the condition perpetually truthy, locking the main UI thread.",
    hint: "Always ensure state changes toward the termination boundary.",
    level: "basic",
    codeExample: "// ❌ Infinite loop:\nlet i = 0;\nwhile (i < 5) {\n  console.log(i);\n  // Missing i++ !\n}"
  },
  {
    question: "When should an engineer prefer a while loop over a traditional for loop?",
    shortAnswer: "When the exact number of iterations is indeterminate upfront and depends on dynamic runtime conditions (e.g. queue draining, linked list traversal, network polling).",
    explanation: "Traditional `for` loops are ideal for fixed ranges or array index counting. `while` loops are cleaner when evaluating external flags, reading data until an EOF / null marker, or processing items until a buffer is empty.",
    hint: "Use while when you don't know the count in advance.",
    level: "intermediate",
    codeExample: "while (queue.length > 0) {\n  processItem(queue.shift());\n}"
  },
  {
    question: "How does JavaScript evaluate truthy and falsy expressions in a while condition?",
    shortAnswer: "The engine invokes the internal ToBoolean abstract operation on the condition expression before every iteration.",
    explanation: "Values like `0`, `\"\"`, `null`, `undefined`, `NaN`, and `false` coerce to `false` and immediately terminate the loop. All other objects, non-zero numbers, and non-empty strings coerce to `true`.",
    hint: "Remember standard ECMAScript falsy values: 0, '', null, undefined, NaN, false.",
    level: "basic",
    codeExample: "let count = 3;\nwhile (count) {\n  console.log(count);\n  count--; // Stops when count reaches 0 (falsy!)\n}"
  },
  {
    question: "What is the idiom while (node = node.next) and how does it traverse linked objects in JavaScript?",
    shortAnswer: "It assigns the next node reference to the variable and simultaneously tests if the resulting object is non-null.",
    explanation: "Assignment expressions in JavaScript return the assigned value. When `node.next` is an object, the assignment returns that object (truthy), continuing the loop. When `node.next` is `null`, the expression evaluates to `null` (falsy), cleanly halting traversal.",
    hint: "Assignment returns the assigned value.",
    level: "intermediate",
    codeExample: "let node = rootNode;\nwhile (node) {\n  console.log(node.value);\n  node = node.next;\n}"
  },
  {
    question: "How do break and continue statements behave inside a while loop?",
    shortAnswer: "break immediately terminates the while loop and transfers control outside; continue skips the remainder of the current body and immediately re-evaluates the loop condition.",
    explanation: "When `continue` is invoked in a while loop, execution jumps straight back to the `while (condition)` check. Take care that the variable increment occurs before the `continue` statement to prevent an infinite loop.",
    hint: "Be cautious: skipping the increment before `continue` causes infinite loops.",
    level: "intermediate",
    codeExample: "let n = 0;\nwhile (n < 5) {\n  n++; // Increment before continue!\n  if (n === 3) continue;\n  console.log(n); // 1, 2, 4, 5\n}"
  },
  {
    question: "How does V8 optimize hot while loops during long-running execution?",
    shortAnswer: "V8 uses On-Stack Replacement (OSR) to compile the running while loop into TurboFan-optimized machine code mid-execution without waiting for the enclosing function to return.",
    explanation: "When Ignition counts a high execution threshold on a while loop's back-edge bytecode, it triggers an OSR interrupt. TurboFan compiles the loop and swaps the execution frame directly on the Call Stack.",
    hint: "OSR compiles hot loops on-the-fly.",
    level: "advanced",
    codeExample: "// Hot while loop triggering V8 JIT OSR tier-up\nlet i = 0;\nwhile (i < 1_000_000) {\n  i++;\n}"
  },
  {
    question: "How can you implement a timeout guard to prevent while loops from locking the browser thread during complex computations?",
    shortAnswer: "Check performance.now() or Date.now() on each iteration against a maximum allowable threshold.",
    explanation: "Because JavaScript is single-threaded, a while loop that takes too long blocks the Event Loop, freezing DOM updates and user clicks. Setting a deadline timestamp ensures the loop aborts or yields control gracefully.",
    hint: "Compare elapsed time with a maximum millisecond allowance.",
    level: "advanced",
    codeExample: "const deadline = performance.now() + 50; // 50ms budget\nwhile (hasMoreWork()) {\n  if (performance.now() > deadline) {\n    console.warn('Yielding to event loop');\n    break;\n  }\n  doWorkChunk();\n}"
  },
  {
    question: "What is the difference between while (true) with an internal break versus a condition-based while loop?",
    shortAnswer: "while (true) relies on internal conditional break statements, often used when the termination check is complex or occurs in the middle of the loop body.",
    explanation: "This is known as a loop-and-a-half pattern. It avoids duplicating setup code before and inside the loop when the exit condition depends on calculations performed during the loop body.",
    hint: "Useful for read-eval-print loops and complex state parsing.",
    level: "intermediate",
    codeExample: "while (true) {\n  const token = scanner.nextToken();\n  if (token.type === 'EOF') break;\n  process(token);\n}"
  },
  {
    question: "How does variable scoping work with let vs var inside and outside a while loop block?",
    shortAnswer: "Variables declared with let/const inside the while block are block-scoped to that body; variables declared with var are hoisted to the enclosing function or global scope.",
    explanation: "Every iteration of a while loop enters a new block scope for statements inside `{ ... }`. Using `let` inside the loop body allocates a fresh variable binding per cycle.",
    hint: "Block scoping protects inner loop variables from leaking into parent scopes.",
    level: "basic",
    codeExample: "let i = 0;\nwhile (i < 1) {\n  let secret = 42; // Block scoped\n  i++;\n}\n// console.log(secret); → ReferenceError"
  },
  {
    question: "How can you safely process an array backwards using a while loop?",
    shortAnswer: "Initialize an index at array.length - 1 and decrement with while (index >= 0) or while (len--).",
    explanation: "The post-decrement pattern `while (len--)` cleanly stops when `len` decrements to 0 because 0 evaluates to falsy, and within the body `len` matches the valid zero-based index.",
    hint: "The `while (len--)` pattern is an ultra-concise reverse traversal idiom.",
    level: "intermediate",
    codeExample: "const items = ['a', 'b', 'c'];\nlet len = items.length;\nwhile (len--) {\n  console.log(items[len]); // 'c', 'b', 'a'\n}"
  },
  {
    question: "How does while handle asynchronous tasks with async/await?",
    shortAnswer: "Inside an async function, while (condition) cleanly awaits each Promise sequentially before advancing to the next cycle.",
    explanation: "Unlike array iteration methods like `forEach`, a `while` loop pauses at `await` expressions, preserving sequential control flow and backpressure.",
    hint: "Awaiting in a while loop allows true sequential polling.",
    level: "intermediate",
    codeExample: "async function pollServer() {\n  let ready = false;\n  while (!ready) {\n    ready = await checkStatus();\n    if (!ready) await sleep(1000);\n  }\n}"
  },
  {
    question: "What is the difference between a while loop and recursion for iterative algorithms?",
    shortAnswer: "A while loop reuses a single stack frame with O(1) memory, whereas recursion pushes a new stack frame per call, risking a RangeError (Maximum call stack size exceeded).",
    explanation: "Unless proper Tail Call Optimization (TCO) is guaranteed, deep recursion consumes Call Stack memory. Refactoring recursive trees or traversals to an iterative while loop with an explicit array stack prevents stack overflow.",
    hint: "While loops prevent stack overflow crashes.",
    level: "advanced",
    codeExample: "// Stack-based tree traversal with while loop (no recursion limit):\nconst stack = [root];\nwhile (stack.length > 0) {\n  const curr = stack.pop();\n  if (curr.left) stack.push(curr.left);\n  if (curr.right) stack.push(curr.right);\n}"
  },
  {
    question: "How can you use a while loop to reverse digits of an integer arithmetically without strings?",
    shortAnswer: "Extract the last digit using modulo 10 (num % 10), add to accumulated sum (sum * 10 + digit), and truncate with Math.floor(num / 10).",
    explanation: "This classic algorithmic math problem runs in O(log10 N) iterations using a simple `while (num > 0)` loop without allocating temporary string buffers.",
    hint: "Use % 10 to extract digits and / 10 to truncate.",
    level: "intermediate",
    codeExample: "let num = 1234, rev = 0;\nwhile (num > 0) {\n  rev = (rev * 10) + (num % 10);\n  num = Math.floor(num / 10);\n}\nconsole.log(rev); // 4321"
  },
  {
    question: "What is the consequence of modifying DOM elements inside a tight synchronous while loop?",
    shortAnswer: "The browser will not visually render intermediate changes until the entire while loop finishes because the rendering engine is blocked.",
    explanation: "The browser's UI repaint phase runs between event loop turns. A synchronous while loop keeps the main thread continuously busy, preventing style recalculation, layout, and compositing until the script terminates.",
    hint: "Use requestAnimationFrame or setTimeout to yield control between visual DOM updates.",
    level: "advanced",
    codeExample: "// DOM updates will only show final state after loop ends:\nlet i = 0;\nwhile (i < 1000) {\n  el.textContent = i; // User only sees 999 at the end!\n  i++;\n}"
  },
  {
    question: "How does the comma operator work inside a while condition expression?",
    shortAnswer: "The comma operator evaluates each expression from left to right and returns the value of the last operand to determine loop continuation.",
    explanation: "In `while (step1(), step2(), condition)`, `step1` and `step2` run as side-effects, and the boolean result of `condition` dictates whether the loop body runs.",
    hint: "Comma operator returns the rightmost value.",
    level: "advanced",
    codeExample: "let x = 0, y = 10;\nwhile (x++, y > 8) {\n  console.log(x, y);\n  y--;\n}"
  },
  {
    question: "How does a while loop behave when the condition variable is mutated inside a nested closure?",
    shortAnswer: "The loop observes the mutated variable as long as the closure shares the same lexical variable binding in memory.",
    explanation: "JavaScript variables declared with `let` or `var` in parent scope are passed by reference to inner closures. Modifying the variable inside an invoked function immediately updates the while loop's condition.",
    hint: "Closures share mutable bindings with their parent scope.",
    level: "intermediate",
    codeExample: "let active = true;\nconst stop = () => { active = false; };\nlet ticks = 0;\nwhile (active) {\n  ticks++;\n  if (ticks >= 3) stop();\n}"
  },
  {
    question: "Why does floating-point rounding error create subtle infinite while loop bugs in decimal step counters?",
    shortAnswer: "Due to IEEE 754 floating-point binary representation, repeated decimal additions (e.g. 0.1 + 0.2) accumulate precision drift that may never match an exact === boundary.",
    explanation: "If you write `while (x !== 1.0) { x += 0.1; }`, `x` will jump from `0.9999999999999999` to `1.0999999999999999`, missing `1.0` entirely and looping forever.",
    hint: "Never use strict equality (!== or ===) on floating-point counters in while conditions; use inequalities (<, >).",
    level: "advanced",
    codeExample: "// ❌ Dangerous:\n// let x = 0; while (x !== 1.0) x += 0.1; // Infinite loop!\n// ✓ Safe:\nlet x = 0; while (x < 1.0 - 1e-9) x += 0.1;"
  },
  {
    question: "What is a labeled while loop and how is it used with nested loops?",
    shortAnswer: "A label identifier prefixing a while loop allows inner break or continue statements to target that specific outer loop.",
    explanation: "In nested while structures, writing `break outerLoop;` immediately aborts the outer while loop rather than merely exiting the inner loop.",
    hint: "Use `labelName: while (...)` to control outer loop jumps.",
    level: "intermediate",
    codeExample: "outerLoop: while (condition1) {\n  while (condition2) {\n    if (found) break outerLoop;\n  }\n}"
  },
  {
    question: "How can you drain an event listener buffer or array using while (arr.length)?",
    shortAnswer: "By calling arr.shift() or arr.pop() on each tick until length reaches 0.",
    explanation: "Because `arr.length` returns 0 when empty (coerces to `false`), `while (arr.length)` automatically terminates when all queued callbacks have executed.",
    hint: "arr.length is truthy when non-empty, and 0 (falsy) when empty.",
    level: "basic",
    codeExample: "const listeners = [fn1, fn2, fn3];\nwhile (listeners.length) {\n  const handler = listeners.shift();\n  handler(eventData);\n}"
  },
  {
    question: "What happens if a return statement is placed inside a while loop within a function?",
    shortAnswer: "The function immediately returns the specified value, aborting the while loop and all remaining iterations.",
    explanation: "A `return` statement has higher scope priority than loop iteration. It tears down the local Execution Context and returns control to the calling function.",
    hint: "Return exits the entire function, terminating the while loop immediately.",
    level: "basic",
    codeExample: "function findFirstMatch(arr, target) {\n  let i = 0;\n  while (i < arr.length) {\n    if (arr[i] === target) return i; // Exits loop and function!\n    i++;\n  }\n  return -1;\n}"
  },
  {
    question: "How do you implement binary search using a while loop in JavaScript?",
    shortAnswer: "Maintain low and high pointers, calculate mid = Math.floor((low + high) / 2) in while (low <= high), and adjust pointers based on comparison.",
    explanation: "Binary search runs in O(log N) steps. The while loop condition `low <= high` ensures all candidate search intervals are examined until the target is found or search space is exhausted.",
    hint: "Halves search interval each cycle while low <= high.",
    level: "advanced",
    codeExample: "function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = (low + high) >> 1;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}"
  },
  {
    question: "What is the performance difference between while (i--) and while (--i)?",
    shortAnswer: "while (i--) evaluates the value of i before decrementing (including index 0); while (--i) decrements first and evaluates the new value (stopping before index 0).",
    explanation: "In `while (i--)`, when `i` is 1, the condition receives 1 (truthy), `i` becomes 0, and the body runs with `i = 0`. In `while (--i)`, when `i` is 1, `i` becomes 0, condition receives 0 (falsy), and loop terminates immediately.",
    hint: "Post-decrement tests then decrements; pre-decrement decrements then tests.",
    level: "advanced",
    codeExample: "let a = 2;\nwhile (a--) console.log('a:', a); // a: 1, a: 0\nlet b = 2;\nwhile (--b) console.log('b:', b); // b: 1"
  },
  {
    question: "How does garbage collection manage objects created and discarded inside a while loop?",
    shortAnswer: "Objects allocated inside the while block become unreachable at the end of each iteration and are collected during the next V8 Young Generation (Scavenge) GC cycle.",
    explanation: "Block-scoped variables lose references when the iteration block closes. Unless retained by external closures or global references, V8's nursery heap cleans them up quickly.",
    hint: "Short-lived loop allocations are quickly reclaimed by V8 Scavenger GC.",
    level: "expert",
    codeExample: "let i = 0;\nwhile (i < 1000) {\n  const temp = { id: i, data: new Array(100) }; // Reclaimed quickly\n  i++;\n}"
  },
  {
    question: "When should a senior architect enforce replacing a while loop with a declarative method like reduce or filter?",
    shortAnswer: "When working on immutable data transformations in UI frameworks (like React) where declarative state pipelines prevent side-effects and improve code maintainability.",
    explanation: "In application business logic and Redux reducers, declarative methods like `map` and `filter` express intent cleanly. `while` loops should be reserved for low-level algorithms, custom parsers, data streams, and hardware/performance bottlenecks.",
    hint: "Declarative for UI state; imperative while for algorithmic performance & stream pipelines.",
    level: "expert",
    codeExample: "// In UI state → declarative:\nconst activeUsers = users.filter(u => u.isActive);\n// In low-level tokenizer → while:\nwhile (pos < length && isWhitespace(source[pos])) pos++;"
  }
];

export default questions;
