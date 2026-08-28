/**
 * Topic 8 Questions & Answers: for...of vs for...in vs forEach vs Traditional for Loops
 * Module: 001_005_loops-and-iteration
 * Educator: Sukanta Hui | Coder & AccoTax
 */

const questions = [
  {
    question: "What is the primary conceptual and runtime difference between for...of and for...in?",
    shortAnswer: "for...of iterates over the values of an iterable using the Symbol.iterator protocol, whereas for...in iterates over the enumerable property keys (strings) of an object including its prototype chain.",
    explanation: "for...of was introduced in ES6 to cleanly traverse data collections (Arrays, Strings, Sets, Maps, NodeLists) by obtaining their values directly. In contrast, for...in traverses object property names as string identifiers, making it unsuitable for numeric array index operations.",
    hint: "Think: 'of' gives Values; 'in' gives Keys (names).",
    level: "basic",
    codeExample: "const arr = ['a', 'b', 'c'];\nfor (const val of arr) console.log(val); // 'a', 'b', 'c'\nfor (const key in arr) console.log(key); // '0', '1', '2' (strings!)"
  },
  {
    question: "Why should you never use for...in to iterate over a standard JavaScript Array?",
    shortAnswer: "for...in iterates over keys as strings, visits non-numeric properties, traverses prototype chain methods, and does not guarantee numerical index order.",
    explanation: "If any library or developer modifies Array.prototype or attaches custom properties to an array instance, for...in will visit those keys during iteration. Furthermore, since index variables are strings, performing arithmetic like `index + 1` results in string concatenation (`'0' + 1 = '01'`) rather than arithmetic addition.",
    hint: "Remember that array keys in for...in are strings and include inherited properties.",
    level: "basic",
    codeExample: "Array.prototype.customMethod = () => {};\nconst nums = [10, 20];\nfor (const i in nums) console.log(i, typeof i); // '0' (string), '1' (string), 'customMethod' (string)!"
  },
  {
    question: "Can you terminate or break out of a Array.prototype.forEach loop early?",
    shortAnswer: "No. forEach always executes the callback for every element in the array and cannot be stopped using break, continue, or return.",
    explanation: "Because forEach is a higher-order function that executes a separate callback for each item on the Call Stack, using `break` or `continue` inside the callback throws a SyntaxError. A `return` statement merely returns from the current callback function execution frame, proceeding to the next element.",
    hint: "Use `for...of`, a traditional `for` loop, or methods like `some()` / `find()` when early termination is required.",
    level: "basic",
    codeExample: "// ❌ This will not break the loop:\n[1, 2, 3].forEach(n => {\n  if (n === 2) return; // Only skips current callback iteration\n  console.log(n); // Logs 1, then 3\n});"
  },
  {
    question: "How does traditional for loop compare in performance and control to for...of and forEach in V8?",
    shortAnswer: "Traditional `for` loops have the lowest execution overhead, providing raw CPU index increments, direct memory access, and zero function call overhead.",
    explanation: "Traditional `for (let i = 0; i < len; i++)` compiles directly to high-efficiency CPU register comparisons and pointer increments in V8's Ignition and TurboFan tiers. `forEach` incurs callback function call overhead per iteration, while `for...of` creates an iterator object and invokes `.next()` per step.",
    hint: "Raw index loop = zero abstraction overhead.",
    level: "intermediate",
    codeExample: "const len = arr.length;\nfor (let i = 0; i < len; i++) {\n  // Fastest raw performance in hot algorithmic loops\n  const item = arr[i];\n}"
  },
  {
    question: "What happens when you use async/await inside a forEach loop versus inside a for...of loop?",
    shortAnswer: "for...of pauses execution and awaits each asynchronous promise sequentially, whereas forEach executes all async callbacks concurrently in fire-and-forget mode without waiting.",
    explanation: "forEach does not return or await promises returned by its callback function. Therefore, the enclosing function continues synchronously while the forEach callbacks trigger background microtasks. In contrast, `for...of` properly suspends the async function body at each `await` expression before moving to the next iteration.",
    hint: "Always use `for...of` (or `for`) when sequential asynchronous operations are required.",
    level: "intermediate",
    codeExample: "// ✓ Sequential:\nfor (const item of items) {\n  await saveToDb(item);\n}\n// ❌ Concurrent fire-and-forget (does not block outer function):\nitems.forEach(async (item) => {\n  await saveToDb(item);\n});"
  },
  {
    question: "How does for...of handle sparse arrays with missing slots compared to forEach and for...in?",
    shortAnswer: "for...of visits empty slots yielding `undefined`, whereas forEach and for...in completely skip non-existent empty slots (holes).",
    explanation: "In ECMAScript, `Array.prototype[Symbol.iterator]` iterates over index 0 to `length - 1` without checking if the property exists on the object, producing `undefined` for holes. In contrast, `forEach` and `for...in` check property existence (`HasProperty`) and skip holes.",
    hint: "Think: for...of respects dense range; forEach and for...in respect existing keys.",
    level: "intermediate",
    codeExample: "const sparse = [1, , 3]; // Hole at index 1\nfor (const x of sparse) console.log(x); // 1, undefined, 3\nsparse.forEach(x => console.log(x));   // 1, 3 (skips hole!)"
  },
  {
    question: "What underlying protocol powers the for...of loop in modern JavaScript?",
    shortAnswer: "The ECMAScript Iterable and Iterator Protocol via the well-known Symbol `Symbol.iterator`.",
    explanation: "When `for (const x of iterable)` executes, the engine calls `iterable[Symbol.iterator]()` to obtain an iterator object. In each loop step, it invokes `iterator.next()`, extracting `{ value, done }`. When `done: true` is received, the loop terminates.",
    hint: "Any object with a [Symbol.iterator] method returning an object with a next() method can be looped with for...of.",
    level: "intermediate",
    codeExample: "const iterator = ['x', 'y'][Symbol.iterator]();\nconsole.log(iterator.next()); // { value: 'x', done: false }\nconsole.log(iterator.next()); // { value: 'y', done: false }\nconsole.log(iterator.next()); // { value: undefined, done: true }"
  },
  {
    question: "How can you safely use for...in on an object without iterating over inherited prototype properties?",
    shortAnswer: "Guard property accesses using Object.hasOwn(obj, prop) or Object.prototype.hasOwnProperty.call(obj, prop).",
    explanation: "Because `for...in` walks the entire prototype chain up to `Object.prototype`, any properties added to upstream prototypes will be enumerated. Using `Object.hasOwn(obj, prop)` ensures only properties directly defined on the target instance are processed.",
    hint: "Modern ES2022 standard recommends Object.hasOwn(obj, prop).",
    level: "intermediate",
    codeExample: "for (const key in obj) {\n  if (Object.hasOwn(obj, key)) {\n    console.log(key, obj[key]);\n  }\n}"
  },
  {
    question: "How do you obtain both the index and the value simultaneously when using a for...of loop?",
    shortAnswer: "By calling the Array.prototype.entries() method and using array destructuring in the loop header: for (const [index, value] of array.entries()).",
    explanation: "The `.entries()` method returns a new Array Iterator object containing key-value pairs `[index, element]` for each item in the array, combining the cleanliness of `for...of` with access to numeric indices.",
    hint: "Use array.entries() with const [index, element].",
    level: "basic",
    codeExample: "const items = ['apple', 'banana', 'cherry'];\nfor (const [idx, item] of items.entries()) {\n  console.log(`${idx}: ${item}`);\n}"
  },
  {
    question: "Why does passing an async callback to Array.prototype.map() return an array of Promises rather than resolved values?",
    shortAnswer: "Async functions always return a Promise, so mapping over an array with an async callback produces an array of unresolved Promise instances.",
    explanation: "When you execute `arr.map(async (x) => ...)`",
    hint: "Wrap the resulting mapped promise array in Promise.all() to await all concurrent operations.",
    level: "intermediate",
    codeExample: "const urls = ['/api/1', '/api/2'];\n// Returns [Promise, Promise]\nconst promises = urls.map(async url => (await fetch(url)).json());\nconst results = await Promise.all(promises);"
  },
  {
    question: "What is the behavior of for...of when used on a plain JavaScript Object like { a: 1, b: 2 }?",
    shortAnswer: "It throws a TypeError: obj is not iterable because plain objects do not implement the Symbol.iterator method by default.",
    explanation: "Plain objects do not have a built-in `[Symbol.iterator]` implementation because there is no universal unambiguous traversal order (keys vs values vs entries). To iterate objects with `for...of`, use `Object.keys(obj)`, `Object.values(obj)`, or `Object.entries(obj)`.",
    hint: "Use Object.entries(obj) to loop over an object with for...of.",
    level: "basic",
    codeExample: "const user = { name: 'Swadeep', city: 'Barrackpore' };\n// ❌ for (const x of user) -> TypeError: user is not iterable\n// ✓ Correct:\nfor (const [key, val] of Object.entries(user)) {\n  console.log(`${key}: ${val}`);\n}"
  },
  {
    question: "How does the scope of let vs var affect traditional for loops with asynchronous closures (such as setTimeout)?",
    shortAnswer: "let creates a fresh, distinct binding for every iteration of the loop, preserving the current index in closures, whereas var shares a single global/function-scoped variable across all iterations.",
    explanation: "In ES6, `for (let i = 0; ...)` creates a new lexical environment record per iteration step, binding the value of `i` at that specific tick. `var i` shares a single mutable binding, which resolves to the final loop value when delayed callbacks fire.",
    hint: "Always declare loop counters with `let` rather than `var`.",
    level: "intermediate",
    codeExample: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10); // Logs 0, 1, 2\n}\nfor (var j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 10); // Logs 3, 3, 3\n}"
  },
  {
    question: "What is for await...of and when should you use it over standard for...of?",
    shortAnswer: "for await...of iterates over async iterables (or streams of promises), awaiting each Promise value before advancing to the next step.",
    explanation: "Async iterables implement `Symbol.asyncIterator`, where calling `next()` returns a Promise resolving to `{ value, done }`. `for await...of` seamlessly consumes Node.js Readable streams, web fetch streams, and async generators with native backpressure.",
    hint: "Use `for await...of` for Node.js readable streams and AsyncGenerator functions.",
    level: "advanced",
    codeExample: "async function* generateStream() {\n  yield Promise.resolve('Chunk 1');\n  yield Promise.resolve('Chunk 2');\n}\nfor await (const chunk of generateStream()) {\n  console.log(chunk); // 'Chunk 1', 'Chunk 2'\n}"
  },
  {
    question: "How can you simulate early termination (break/return) in a functional loop like forEach without throwing errors?",
    shortAnswer: "By using Array.prototype.some() or Array.prototype.every() instead of forEach.",
    explanation: "Array.prototype.some() stops iterating as soon as its callback returns `true`. Array.prototype.every() stops iterating as soon as its callback returns `false`. This allows clean, expressive short-circuiting in functional pipelines.",
    hint: "some() breaks on true; every() breaks on false.",
    level: "intermediate",
    codeExample: "const nums = [10, 20, 30, 40, 50];\nnums.some(n => {\n  if (n === 30) return true; // Breaks immediately!\n  console.log(n); // Logs 10, 20\n  return false;\n});"
  },
  {
    question: "What is the cleanup behavior of for...of when broken early using a break statement or an exception?",
    shortAnswer: "If the iterator defines a return() method, for...of automatically calls iterator.return() to release resources (file handles, database locks, stream readers).",
    explanation: "ECMAScript specification mandates that when a `for...of` loop terminates abruptly (via `break`, `return`, or a thrown error), the runtime invokes `iterator.return()` if present on the iterator. This enables automatic resource disposal in custom generators and streams.",
    hint: "The iterator protocol provides automatic `return()` cleanup during early exit.",
    level: "advanced",
    codeExample: "function createResource() {\n  return {\n    [Symbol.iterator]() {\n      return {\n        next() { return { value: 1, done: false }; },\n        return() { console.log('Cleaning up resources!'); return { done: true }; }\n      };\n    }\n  };\n}\nfor (const x of createResource()) {\n  break; // Triggers return() immediately\n}"
  },
  {
    question: "Why is caching array.length in a traditional for loop rarely necessary in modern V8 engines?",
    shortAnswer: "V8's TurboFan JIT compiler performs loop invariant code motion and hoist checks automatically when it proves the array is not mutated inside the loop.",
    explanation: "Historically, developers wrote `for (let i = 0, len = arr.length; i < len; i++)` to prevent property lookups. Modern JIT compilers automatically hoist the length check into a CPU register unless the loop body calls functions that could potentially alter array length.",
    hint: "Modern JIT compilers optimize `arr.length` automatically.",
    level: "advanced",
    codeExample: "// Modern idiomatic JS is clean and fast:\nfor (let i = 0; i < arr.length; i++) {\n  // V8 optimizes this automatically\n}"
  },
  {
    question: "How does for...of interact with Set and Map data structures?",
    shortAnswer: "for...of directly iterates over Set values, and iterates over [key, value] entry tuples for Map instances.",
    explanation: "Both `Set` and `Map` implement `Symbol.iterator`. For `Set`, the default iterator yields unique values. For `Map`, the default iterator yields 2-element arrays `[key, value]`, allowing immediate destructuring in the loop statement header.",
    hint: "Map yields [key, value]; Set yields value.",
    level: "basic",
    codeExample: "const map = new Map([['a', 1], ['b', 2]]);\nfor (const [k, v] of map) console.log(k, v); // 'a' 1, 'b' 2\nconst set = new Set([10, 20]);\nfor (const val of set) console.log(val);     // 10, 20"
  },
  {
    question: "What is an On-Stack Replacement (OSR) optimization in V8 during long-running loop execution?",
    shortAnswer: "OSR allows V8 to swap an unoptimized, interpreted loop function running in Ignition directly with optimized machine code generated by TurboFan in the middle of execution.",
    explanation: "If a loop runs for many iterations (hot loop), V8 does not wait for the outer function to return. Instead, TurboFan compiles the loop body and replaces the execution frame directly on the Call Stack (On-Stack Replacement) to immediately accelerate execution.",
    hint: "OSR upgrades running loops from bytecode to native machine code mid-flight.",
    level: "expert",
    codeExample: "// Long running loop triggers V8 OSR:\nfor (let i = 0; i < 1_000_000; i++) {\n  // Bytecode -> TurboFan optimized assembly via OSR\n}"
  },
  {
    question: "How does mutating an array during iteration affect for...of, forEach, and traditional for loops?",
    shortAnswer: "Traditional for loops use current index positions (can cause skipped or double-visited elements); forEach uses length at start but follows mutating indices; for...of dynamically tracks iterator state.",
    explanation: "If elements are removed (`splice`) during iteration, index-based loops shift remaining elements down, causing the next item to be skipped unless the index is manually adjusted. In `for...of`, the iterator internally tracks current position.",
    hint: "Never mutate array length in-place during active iteration; create a filtered copy or iterate backwards.",
    level: "intermediate",
    codeExample: "// ❌ Anti-pattern: mutating while iterating forwards skips elements\nconst arr = [1, 2, 2, 3];\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === 2) arr.splice(i, 1); // Skips second 2!\n}"
  },
  {
    question: "What is the difference between iterating a String with for...of versus a traditional index loop for emojis and unicode characters?",
    shortAnswer: "for...of iterates by Unicode code points (properly preserving multi-byte emoji surrogate pairs), whereas indexed loops traverse UTF-16 code units (splitting emojis into broken surrogates).",
    explanation: "JavaScript strings are encoded as UTF-16 code units. Emojis and special characters (like 🚀 or 👨‍👩‍👧) consist of surrogate pairs (2 code units each). `str[i]` accesses individual surrogate halves producing corrupt characters, whereas `for...of` consumes complete code points.",
    hint: "Use `for...of` for Unicode-safe string processing.",
    level: "advanced",
    codeExample: "const str = 'JS🚀';\nconsole.log(str.length); // 4 (not 3!)\nfor (let i = 0; i < str.length; i++) console.log(str[i]); // 'J', 'S', '\uD83D', '\uDE80' (broken)\nfor (const char of str) console.log(char);                // 'J', 'S', '🚀' (perfect)"
  },
  {
    question: "Why does for...in iterate keys in an order that may differ from insertion order for integer-like keys?",
    shortAnswer: "ECMAScript specification requires integer indices to be sorted numerically first, followed by string keys in chronological insertion order, and finally Symbol keys.",
    explanation: "V8 stores array-indexed properties in an 'elements' backing store and named properties in a 'properties' store. When `for...in` runs, it traverses numeric integer keys in ascending numerical order, which may not match insertion order.",
    hint: "Numeric object keys are sorted in ascending numerical order in for...in.",
    level: "advanced",
    codeExample: "const obj = { '10': 'a', '2': 'b', 'first': 'c' };\nfor (const k in obj) console.log(k); // '2', '10', 'first'"
  },
  {
    question: "What is the memory and garbage collection impact of forEach when used inside a high-frequency animation or game loop?",
    shortAnswer: "forEach allocates a new callback closure function object on every frame or invocation, increasing garbage collection churn and causing micro-stutters.",
    explanation: "In high-frequency rendering loops (e.g. 60–120 FPS `requestAnimationFrame` cycles), passing anonymous arrow functions to `forEach` continuously allocates closure contexts in the V8 Young Generation heap. Traditional `for` loops create zero heap allocations and produce no GC pressure.",
    hint: "Use traditional `for` loops in performance-critical rendering and game engines.",
    level: "expert",
    codeExample: "// In 60 FPS animation tick:\nfunction render(particles) {\n  // ❌ Creates garbage every frame:\n  // particles.forEach(p => p.update());\n  // ✓ Zero allocations:\n  for (let i = 0; i < particles.length; i++) {\n    particles[i].update();\n  }\n}"
  },
  {
    question: "How do you implement a custom infinite generator and consume it safely with for...of?",
    shortAnswer: "Use a generator function function* with a while(true) yield pattern, and terminate consumption with a break condition in the for...of loop.",
    explanation: "Generators naturally conform to the Iterable and Iterator protocols. Because generator execution pauses at `yield` expressions, an infinite sequence generates values lazily on-demand without exhausting memory.",
    hint: "Generator functions pause execution at each `yield`.",
    level: "advanced",
    codeExample: "function* idGenerator() {\n  let id = 1;\n  while (true) yield id++;\n}\nfor (const id of idGenerator()) {\n  console.log(id);\n  if (id === 3) break; // Halts generator consumption\n}"
  },
  {
    question: "What is the difference between Array.prototype.keys(), values(), and entries() when used with for...of?",
    shortAnswer: "keys() yields numeric indices (0, 1, 2), values() yields element items, and entries() yields [index, value] pairs.",
    explanation: "These built-in array methods return specialized Array Iterator objects adhering to `Symbol.iterator`, enabling clean, declarative selection of keys, values, or dual tuples.",
    hint: "keys() -> index; values() -> item; entries() -> [index, item].",
    level: "basic",
    codeExample: "const arr = ['red', 'blue'];\nfor (const k of arr.keys()) console.log(k);       // 0, 1\nfor (const v of arr.values()) console.log(v);     // 'red', 'blue'\nfor (const [k, v] of arr.entries()) console.log(k, v); // 0 'red', 1 'blue'"
  },
  {
    question: "When should a senior JavaScript architect choose each of the 4 looping mechanisms in enterprise production codebases?",
    shortAnswer: "Use for...of for clean readable iteration over collections and async pipelines; traditional for for high-performance/hot loops and multidimensional matrices; for...in strictly for inspecting plain object keys with Object.hasOwn; and forEach for simple declarative side-effects.",
    explanation: "Modern JavaScript architecture prioritizes `for...of` as the standard default for data collections due to value clarity and async support. Traditional `for` is reserved for tight mathematical optimizations and backwards loops. `for...in` is restricted to object reflection. `forEach` is used when chained with other array methods.",
    hint: "Default: for...of for collections; for(let i...) for raw performance; for...in for object keys.",
    level: "expert",
    codeExample: "// Decision Matrix:\n// Arrays / Sets / Maps -> for...of\n// High Performance / Hot Path -> for (let i = 0; ...)\n// Plain Object Inspection -> for (const k in obj) if (Object.hasOwn(obj, k))\n// Fluent Chaining -> arr.filter().map().forEach()"
  }
];

export default questions;
