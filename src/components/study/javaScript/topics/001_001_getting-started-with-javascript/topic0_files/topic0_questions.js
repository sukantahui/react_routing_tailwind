const questions = [
  {
    question: "What is JavaScript and who invented it?",
    shortAnswer: "JavaScript is a high-level, single-threaded, multi-paradigm programming language created by Brendan Eich in 1995.",
    explanation: "Brendan Eich developed JavaScript in May 1995 at Netscape. It was standardized as ECMAScript (ECMA-262) in 1997 and has evolved into the universal programming language for the web, servers, and cross-platform desktop/mobile applications.",
    hint: "Think: 1995 Netscape, Mocha -> LiveScript -> JavaScript.",
    level: "basic",
    codeExample: "console.log('JavaScript Engine:', typeof globalThis !== 'undefined');"
  },
  {
    question: "Where can JavaScript execute today?",
    shortAnswer: "In web browsers (Chrome, Safari, Firefox), server runtimes (Node.js, Deno, Bun), and mobile/desktop frameworks (React Native, Electron).",
    explanation: "JavaScript runtimes exist across all major platforms. In browsers, engines like V8 and SpiderMonkey execute scripts. On servers and CLI tools, Node.js, Deno, and Bun provide OS and file system access.",
    hint: "Browser engines, server runtimes, desktop/mobile frameworks.",
    level: "basic",
    codeExample: "const isBrowser = typeof window !== 'undefined';\nconsole.log(isBrowser ? 'Running in Browser' : 'Running on Server');"
  },
  {
    question: "What is the relationship between JavaScript and ECMAScript?",
    shortAnswer: "ECMAScript is the official specification; JavaScript is the most popular dialect and implementation of that standard.",
    explanation: "ECMAScript (ECMA-262 standard maintained by the TC39 committee) defines the language syntax, semantics, and built-in objects. JavaScript, ActionScript, and JScript are implementations of ECMAScript.",
    hint: "ECMAScript = the rulebook specification; JavaScript = the actual running engine implementation.",
    level: "basic",
    codeExample: "// ES6+ syntax compliant with ECMA-262\nconst greet = (name = 'Swadeep') => `Hello, ${name}!`;"
  },
  {
    question: "What is the V8 engine and how does its JIT pipeline work?",
    shortAnswer: "V8 is Google's open-source C++ JavaScript engine combining the Ignition bytecode interpreter and TurboFan optimizing JIT compiler.",
    explanation: "V8 parses JS code into an AST, interprets it into Ignition bytecode for fast startup, collects runtime type feedback via Inline Caches, and optimizes hot functions into machine code with TurboFan.",
    hint: "V8 = Parser -> Ignition Interpreter -> TurboFan JIT Optimizer.",
    level: "intermediate",
    codeExample: "function add(a, b) { return a + b; }\n// TurboFan optimizes this monomorphic call site\nadd(10, 20);"
  },
  {
    question: "How does the Call Stack differ from the Memory Heap in JavaScript?",
    shortAnswer: "The Call Stack handles execution context frames and primitive values (LIFO); the Memory Heap dynamically allocates objects and closures.",
    explanation: "Primitive data types (number, string, boolean, etc.) are stored directly in stack frames. Reference types (objects, arrays, functions) are stored in the heap, and the stack stores pointer addresses referencing the heap.",
    hint: "Stack = fast, linear execution frames; Heap = dynamic, garbage-collected object store.",
    level: "intermediate",
    codeExample: "let num = 42; // Stack\nconst user = { name: 'Tuhina' }; // Heap object, stack holds memory address pointer"
  },
  {
    question: "Why is JavaScript single-threaded, and how does it prevent UI freezing?",
    shortAnswer: "JS has one call stack, but handles asynchronous non-blocking I/O using the browser/Node event loop and worker threads.",
    explanation: "JavaScript executes one statement at a time on its main thread. Asynchronous tasks (timers, fetch requests, UI events) are delegated to browser Web APIs or Libuv thread pools, returning callbacks to the event loop task queues.",
    hint: "Single call stack + Event loop delegation to background worker threads.",
    level: "intermediate",
    codeExample: "console.log('Start');\nsetTimeout(() => console.log('Async Callback'), 100);\nconsole.log('End');"
  },
  {
    question: "What is 'globalThis' and why was it introduced in ES2020?",
    shortAnswer: "'globalThis' provides a unified, cross-platform reference to the global object across all JavaScript runtimes.",
    explanation: "Prior to ES2020, developers had to check 'window' for browsers, 'self' for Web Workers, and 'global' for Node.js. 'globalThis' standardizes global context access in any environment.",
    hint: "Universal global variable name standard in ES2020.",
    level: "intermediate",
    codeExample: "globalThis.__APP_VERSION__ = '2.5.0';\nconsole.log(globalThis.__APP_VERSION__);"
  },
  {
    question: "What happens when you access 'window' inside a Node.js script?",
    shortAnswer: "A ReferenceError: window is not defined exception is thrown.",
    explanation: "Node.js does not have a browser window or DOM tree. Its top-level global object is 'global'. Attempting to reference 'window' without declaration throws an uncaught ReferenceError.",
    hint: "Node has 'global', not 'window'.",
    level: "intermediate",
    codeExample: "try {\n  console.log(window);\n} catch (err) {\n  console.log('Caught expected error:', err.name); // ReferenceError\n}"
  },
  {
    question: "What is the difference between a Microtask and a Macrotask in the Event Loop?",
    shortAnswer: "Microtasks (Promises, queueMicrotask) execute immediately after the current script and before the next Macrotask (setTimeout).",
    explanation: "At the end of each task execution, the JavaScript engine drains the entire Microtask Queue before yielding to rendering or picking the next task from the Macrotask (Task) Queue.",
    hint: "Microtasks (Promises) always run BEFORE Macrotasks (Timers).",
    level: "advanced",
    codeExample: "setTimeout(() => console.log('Macrotask'), 0);\nPromise.resolve().then(() => console.log('Microtask'));\n// Logs 'Microtask' first, then 'Macrotask'"
  },
  {
    question: "How does V8's Inline Caching (IC) optimize property lookups?",
    shortAnswer: "IC caches the memory offset of object properties based on their hidden classes (Shapes/Maps).",
    explanation: "When an object property is repeatedly accessed at the same call site with the same shape, V8 caches the memory offset in machine code, bypassing dictionary lookups for near-instant C++ speed.",
    hint: "Monomorphic shapes allow direct memory offset reads.",
    level: "advanced",
    codeExample: "function getAge(user) { return user.age; }\n// Monomorphic: same shape { age, name }\ngetAge({ age: 21, name: 'Abhronila' });"
  },
  {
    question: "What is JIT Deoptimization (Deopt) in V8 TurboFan?",
    shortAnswer: "When runtime types violate TurboFan's optimized assumptions, V8 bails out and falls back to Ignition bytecode.",
    explanation: "If TurboFan compiled a function assuming arguments are always 31-bit small integers (SMI), passing a floating point or string forces V8 to deoptimize and re-evaluate via Ignition.",
    hint: "Polymorphism or type shape switching causes deoptimization.",
    level: "advanced",
    codeExample: "function compute(x) { return x * 2; }\ncompute(10); // TurboFan optimizes for Integer\ncompute('text'); // Forces Deoptimization bailout!"
  },
  {
    question: "What is the difference between Node.js, Deno, and Bun?",
    shortAnswer: "Node is the classic V8/Libuv runtime; Deno is secure-by-default with native TS; Bun is built in Zig on JavaScriptCore for ultra-fast startup.",
    explanation: "Node.js (created 2009 by Ryan Dahl) uses CommonJS/ESM and V8. Deno (2018 by Ryan Dahl) uses Rust/Tokio and V8 with strict permissions. Bun (2022 by Jarred Sumner) uses WebKit's JavaScriptCore for blazing performance.",
    hint: "Node (V8+C++), Deno (V8+Rust), Bun (JSC+Zig).",
    level: "advanced",
    codeExample: "console.log(typeof Bun !== 'undefined' ? 'Bun' : typeof Deno !== 'undefined' ? 'Deno' : 'Node/Browser');"
  },
  {
    question: "What is Garbage Collection in JavaScript and how does Mark-and-Sweep work?",
    shortAnswer: "The engine automatically frees memory by marking reachable root objects and sweeping away unreachable objects.",
    explanation: "The V8 Garbage Collector starts from roots (global window, current stack frames) and traverses all references. Objects not reachable from any root are swept and reclaimed into free memory lists.",
    hint: "Roots -> Reachable Graph -> Mark & Sweep unreachable memory.",
    level: "advanced",
    codeExample: "let obj = { data: 'temp' };\nobj = null; // Original heap object is now unreachable and eligible for GC"
  },
  {
    question: "How do primitive values behave regarding mutability in JavaScript?",
    shortAnswer: "All primitive values in JavaScript are immutable; variables holding primitives are reassigned, not mutated in-place.",
    explanation: "Strings, numbers, booleans, symbols, and bigints cannot have their underlying bytes mutated in place. Methods like str.toUpperCase() return a new string rather than changing the original.",
    hint: "Primitives cannot be mutated; only re-assigned.",
    level: "basic",
    codeExample: "let str = 'hello';\nstr.toUpperCase();\nconsole.log(str); // Still 'hello'"
  },
  {
    question: "What are the 8 fundamental data types in modern JavaScript (ES2024)?",
    shortAnswer: "7 primitives (Undefined, Null, Boolean, Number, BigInt, String, Symbol) and 1 reference type (Object).",
    explanation: "ECMAScript formal specification defines 7 primitive types and Object (which includes Arrays, Functions, Dates, RegExps, Maps, Sets, and custom class instances).",
    hint: "7 primitives + 1 reference type (Object).",
    level: "basic",
    codeExample: "const types = [undefined, null, true, 42, 100n, 'text', Symbol('id'), {}];\nconsole.log(types.map(v => typeof v));"
  },
  {
    question: "What is the difference between dynamic typing and static typing?",
    shortAnswer: "JavaScript is dynamically typed; variable types are checked at runtime and can hold any value over time.",
    explanation: "In statically typed languages (TypeScript, Java, Rust), variable types are enforced during compilation. In JavaScript, variables hold untyped references to typed runtime values.",
    hint: "Dynamic = runtime type binding; Static = compile-time type verification.",
    level: "basic",
    codeExample: "let val = 10; // Number\nval = 'Barrackpore'; // Valid in dynamically typed JS"
  },
  {
    question: "How does JavaScript handle concurrency without multi-threading on the main stack?",
    shortAnswer: "Through the Event Loop, asynchronous callback queues, and Web Worker threads for CPU-heavy tasks.",
    explanation: "The main thread executes the Call Stack and delegates async events (DOM, Timers, Network) to the browser/host. For true multi-core parallel computation, Web Workers or Node Worker Threads are spawned.",
    hint: "Event Loop for async I/O; Web Workers for true background multi-threading.",
    level: "expert",
    codeExample: "// Spawning a background thread\n// const worker = new Worker('worker.js');"
  },
  {
    question: "What is the ECMAScript TC39 committee and its 5-stage proposal process?",
    shortAnswer: "TC39 governs JS evolution through Stage 0 (Strawperson) to Stage 4 (Finished Standard).",
    explanation: "TC39 consists of academics, browser vendors, and tech leaders. Proposals progress through Stage 0 (Idea), Stage 1 (Proposal), Stage 2 (Draft), Stage 3 (Candidate), and Stage 4 (Approved for yearly ECMAScript release).",
    hint: "TC39 Stages: 0 (Idea) -> 1 -> 2 -> 3 (Candidate) -> 4 (Finished Standard).",
    level: "expert",
    codeExample: "// Stage 4 features land in standard yearly releases like ES2024 / ES2025"
  },
  {
    question: "What is a Memory Leak in JavaScript and how can it occur if GC is automatic?",
    shortAnswer: "Memory is leaked when unneeded objects remain referenced by active roots (e.g. forgotten event listeners or global closures).",
    explanation: "The Garbage Collector cannot free memory that is still referenced by roots. Common causes include unremoved DOM event listeners, uncleared setInterval timers, and detached DOM nodes stored in global variables.",
    hint: "Active root references prevent Garbage Collection.",
    level: "expert",
    codeExample: "const leakedArray = [];\nsetInterval(() => leakedArray.push(new Array(1000).fill('*')), 50);"
  },
  {
    question: "What is QuickJS and where is it used compared to V8?",
    shortAnswer: "QuickJS is a lightweight, small-footprint C-based JavaScript engine designed for embedded systems and WASM sandboxes.",
    explanation: "While V8 is optimized for high-performance JIT execution with high memory overhead, Fabrice Bellard's QuickJS is complete ES2023 compliant with an ultra-small binary size (<1MB) suitable for IoT microcontrollers and secure sandboxes.",
    hint: "QuickJS = ultra-lightweight embedded C engine; V8 = heavy enterprise JIT compiler.",
    level: "expert",
    codeExample: "// QuickJS runs complete ES2023 in microcontrollers with mere kilobytes of RAM"
  },
  {
    question: "How does 'typeof null' return 'object' and why hasn't it been fixed?",
    shortAnswer: "It is an infamous historical bug from JS 1.0; fixing it would break backward compatibility across millions of legacy websites.",
    explanation: "In JavaScript 1.0, values were represented with a type tag in memory. The type tag for objects was 000, and null was represented as a NULL pointer (0x00), triggering the object type branch. TC39 rejected proposals to fix it to preserve the web.",
    hint: "Historical type tag bug preserved for backward compatibility.",
    level: "intermediate",
    codeExample: "console.log(typeof null); // 'object'\nconsole.log(null === null); // true"
  },
  {
    question: "How does the 'debugger' statement work in JavaScript?",
    shortAnswer: "The 'debugger' keyword invokes any available debugging functionality, pausing execution if DevTools is open.",
    explanation: "When DevTools is open, encountering 'debugger' pauses JS execution right at that line, opening the Sources tab and allowing developers to inspect variable scope and step through frames.",
    hint: "Programmatic breakpoint in source code.",
    level: "basic",
    codeExample: "function testDebug(val) {\n  // debugger; // Pauses execution when DevTools is active\n  return val * 2;\n}"
  },
  {
    question: "What is Hermes and why does React Native use it over V8 or JSC?",
    shortAnswer: "Hermes is an open-source JS engine optimized by Meta for fast mobile startup, Bytecode pre-compilation (AOT), and low memory footprint.",
    explanation: "Unlike browser engines that parse source at runtime, Hermes pre-compiles JavaScript into optimized Bytecode ahead of time (AOT) during app building, slashing Time-To-Interactive (TTI) on mobile devices.",
    hint: "Hermes = Bytecode AOT compilation for mobile React Native apps.",
    level: "expert",
    codeExample: "// Hermes compiles React Native bundles to binary bytecode ahead of time"
  },
  {
    question: "What is the difference between client-side JavaScript and server-side JavaScript?",
    shortAnswer: "Client-side JS runs in user browsers with DOM/Web APIs; server-side JS runs on servers with OS, database, and filesystem access.",
    explanation: "Client-side JS focuses on UI rendering, event listeners, and client state. Server-side JS (Node.js, Deno, Bun) handles HTTP web servers, database connections, background worker queues, and filesystem I/O.",
    hint: "Client = DOM & Web APIs; Server = OS, Filesystem & Network Sockets.",
    level: "basic",
    codeExample: "// Client: document.title = 'Hello';\n// Server: fs.writeFileSync('log.txt', 'Hello');"
  },
  {
    question: "What is the role of the Libuv library in Node.js?",
    shortAnswer: "Libuv is a multi-platform C library that powers Node.js's non-blocking asynchronous I/O and Event Loop.",
    explanation: "While V8 executes JavaScript code and memory management, Libuv provides the cross-platform Event Loop, Thread Pool (for filesystem and DNS lookups), child processes, and asynchronous network sockets.",
    hint: "V8 = JS Engine; Libuv = Asynchronous I/O and Event Loop engine.",
    level: "expert",
    codeExample: "// Libuv handles fs.readFile and network sockets asynchronously in Node.js"
  }
];

export default questions;
