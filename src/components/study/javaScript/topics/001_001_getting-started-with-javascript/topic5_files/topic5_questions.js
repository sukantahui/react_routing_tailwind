const questions = [
  {
    question: "What is the primary purpose of console.log() in JavaScript?",
    shortAnswer: "To output variables, objects, and diagnostic messages to the host environment console for debugging.",
    explanation: "console.log prints evaluated expressions to browser DevTools or Node.js terminal, allowing developers to inspect runtime state and trace code execution.",
    hint: "Standard output function for diagnostic logging.",
    level: "basic",
    codeExample: "const student = 'Swadeep';\nconsole.log('Enrolled student:', student);"
  },
  {
    question: "How does console.table() improve structured data inspection?",
    shortAnswer: "It renders arrays of objects or 2D arrays as clean, sortable tabular grids in DevTools.",
    explanation: "Instead of clicking nested object trees, console.table formats data with row indices and column headers, making complex collections instant to read.",
    hint: "Tabular grid formatting for arrays and objects.",
    level: "basic",
    codeExample: "console.table([{ name: 'Swadeep', roll: 101 }, { name: 'Tuhina', roll: 102 }]);"
  },
  {
    question: "What is the 'Live Object Mutation Trap' in browser DevTools logging?",
    shortAnswer: "Logging an object outputs a reference pointer; expanding it later shows mutated values rather than values at log time.",
    explanation: "Because console.log does not create an immutable snapshot, expanding the logged object in DevTools reads live memory. Fix: console.log(JSON.parse(JSON.stringify(obj))).",
    hint: "Objects are logged by reference, showing future mutations when expanded.",
    level: "intermediate",
    codeExample: "const user = { name: 'Swadeep' };\nconsole.log('Snapshot:', JSON.parse(JSON.stringify(user)));\nuser.name = 'Tuhina';"
  },
  {
    question: "How do console.time() and console.timeEnd() benchmark execution duration?",
    shortAnswer: "They calculate and log the exact elapsed time in milliseconds between matching label calls.",
    explanation: "console.time('label') starts a high-precision timer; console.timeEnd('label') stops the timer and prints the elapsed milliseconds.",
    hint: "Precision performance benchmarking with matching label strings.",
    level: "intermediate",
    codeExample: "console.time('Loop');\nfor(let i=0; i<1e6; i++) {}\nconsole.timeEnd('Loop'); // Loop: 1.8ms"
  },
  {
    question: "What is the purpose of the 'debugger' statement in JavaScript?",
    shortAnswer: "A programmatic breakpoint that pauses execution and opens the Sources tab if DevTools is active.",
    explanation: "When the JavaScript engine hits 'debugger' with DevTools open, execution halts immediately, allowing line-by-line stepping and scope variable inspection.",
    hint: "Programmatic breakpoint in code.",
    level: "basic",
    codeExample: "function calculate(val) {\n  // debugger; // Execution pauses here\n  return val * 10;\n}"
  },
  {
    question: "How does console.assert() work and when does it log?",
    shortAnswer: "It writes an error message to the console ONLY if the first argument evaluates to false.",
    explanation: "If the assertion condition is true, nothing happens. If false, an error message is printed with a stack trace, without halting execution.",
    hint: "Logs an error only when the condition is false.",
    level: "intermediate",
    codeExample: "const age = 12;\nconsole.assert(age >= 18, 'User must be an adult!'); // Logs error"
  },
  {
    question: "What is console.trace() used for?",
    shortAnswer: "It prints an interactive stack trace showing the exact function call hierarchy leading to that point.",
    explanation: "Essential for debugging deep nested functions or finding where an unexpected function call originated in large codebases.",
    hint: "Outputs the complete Call Stack trace.",
    level: "intermediate",
    codeExample: "function a() { b(); }\nfunction b() { console.trace('Where was I called?'); }\na();"
  },
  {
    question: "How do console.group() and console.groupEnd() organize console outputs?",
    shortAnswer: "They group related log statements inside collapsible, indented hierarchy blocks in DevTools.",
    explanation: "Using console.group('Title') and console.groupEnd() keeps complex multi-step routines cleanly organized and readable in the console.",
    hint: "Collapsible indented log groups.",
    level: "basic",
    codeExample: "console.group('Auth Flow');\nconsole.log('Validating user');\nconsole.log('Generating token');\nconsole.groupEnd();"
  },
  {
    question: "How does the %c format specifier style console messages?",
    shortAnswer: "It applies CSS rules passed in subsequent arguments to format text color, background, and fonts.",
    explanation: "Developers use %c to print branded badges, distinct warnings, and colorful developer logs in DevTools.",
    hint: "%c applies CSS styling strings to console output.",
    level: "intermediate",
    codeExample: "console.log('%c SUCCESS ', 'background: #10b981; color: white; font-weight: bold;');"
  },
  {
    question: "What is console.count() and console.countReset()?",
    shortAnswer: "Maintains an automatic counter tracking how many times it was called with a specific label.",
    explanation: "Useful for tracking component re-renders, loop iterations, or event listener firing counts without declaring manual counter variables.",
    hint: "Automatic call counter for a given label.",
    level: "basic",
    codeExample: "console.count('Render'); // Render: 1\nconsole.count('Render'); // Render: 2\nconsole.countReset('Render');"
  },
  {
    question: "What is the difference between console.dir() and console.log() on DOM elements?",
    shortAnswer: "console.log prints the HTML DOM tree representation; console.dir prints an interactive JSON-like property list.",
    explanation: "console.dir(element) allows inspecting all JavaScript object properties, methods, dataset attributes, and prototype links of a DOM node.",
    hint: "console.log = HTML markup; console.dir = JavaScript object properties.",
    level: "intermediate",
    codeExample: "const btn = document.createElement('button');\nconsole.dir(btn); // Shows all JS properties"
  },
  {
    question: "Why should excessive console.log calls be stripped from production bundles?",
    shortAnswer: "They degrade runtime performance and can cause memory leaks by retaining object references.",
    explanation: "Logging objects in hot loops creates garbage collection pressure. Build tools like Vite use plugins or terser (drop_console: true) to strip them.",
    hint: "Prevents memory leaks and optimizes production runtime performance.",
    level: "advanced",
    codeExample: "// Vite build config: esbuild: { drop: ['console', 'debugger'] }"
  },
  {
    question: "What are Conditional Breakpoints in Chrome DevTools?",
    shortAnswer: "Breakpoints that only pause execution when a specified JavaScript boolean expression evaluates to true.",
    explanation: "Right-clicking a line in Sources tab and adding a condition (e.g. user.id === 42) avoids manually stepping through thousands of loop iterations.",
    hint: "Pauses execution only when condition === true.",
    level: "advanced",
    codeExample: "// Condition: item.price > 1000"
  },
  {
    question: "What is a DOM Mutation Breakpoint in DevTools?",
    shortAnswer: "A breakpoint that pauses JavaScript execution the moment a DOM element is modified, removed, or has its attributes changed.",
    explanation: "Right-click any DOM node in Elements tab → 'Break on' → Subtree modifications, Attribute modifications, or Node removal.",
    hint: "Pauses JS when a specific DOM node is mutated.",
    level: "advanced",
    codeExample: "// Pauses execution exactly on the line of JS modifying the element"
  },
  {
    question: "What is an XHR / Fetch Breakpoint in DevTools?",
    shortAnswer: "A breakpoint that pauses execution whenever a network request matching a specific URL pattern is sent.",
    explanation: "Configured in Sources tab under 'XHR/fetch Breakpoints', it lets developers inspect code right before an API request leaves the browser.",
    hint: "Pauses execution right before a matching fetch() URL is dispatched.",
    level: "advanced",
    codeExample: "// Add URL filter: '/api/v1/auth'"
  },
  {
    question: "What is the Call Stack panel in DevTools debugger?",
    shortAnswer: "A pane listing all active execution frames in LIFO order showing how the engine reached the current breakpoint.",
    explanation: "Clicking any frame in the Call Stack pane navigates back in time, letting you inspect local scope variables at that exact parent call site.",
    hint: "LIFO list of active function execution frames.",
    level: "intermediate",
    codeExample: "// Frame 1: handleClick → Frame 2: processForm → Frame 3: validate"
  },
  {
    question: "What is the Scope pane in DevTools debugger?",
    shortAnswer: "A panel displaying all variables accessible in the current Local, Closure, Script, and Global scopes.",
    explanation: "While paused at a breakpoint, the Scope pane displays live values of all variables in scope, allowing on-the-fly value modifications.",
    hint: "Inspects Local, Closure, Script, and Global variables.",
    level: "intermediate",
    codeExample: "// Inspects variables trapped in closures and local stack frames"
  },
  {
    question: "What is the Watch pane in DevTools debugger?",
    shortAnswer: "A panel where developers add custom JavaScript expressions to evaluate automatically at every breakpoint step.",
    explanation: "Adding expressions like state.user.name or items.length continuously evaluates their values as you step through code execution.",
    hint: "Continuously evaluates custom expressions during debugging.",
    level: "basic",
    codeExample: "// Watch: user !== null"
  },
  {
    question: "What is the difference between 'Step Over' (F10) and 'Step Into' (F11) in DevTools?",
    shortAnswer: "Step Over executes the current line without entering function calls; Step Into steps inside the called function body.",
    explanation: "Use Step Over (F10) for lines with external libraries; use Step Into (F11) when you need to inspect the inner logic of your custom function.",
    hint: "F10 = Skip entering function; F11 = Enter inside function.",
    level: "basic",
    codeExample: "// F10 moves to next line; F11 dives into the function"
  },
  {
    question: "What is 'Step Out' (Shift + F11) in DevTools debugger?",
    shortAnswer: "Executes the remainder of the current function and pauses immediately in the parent calling frame.",
    explanation: "Useful when you have stepped into a large utility function and want to return back to your main routine immediately.",
    hint: "Shift + F11 exits the current function back to caller.",
    level: "basic",
    codeExample: "// Finishes current function and returns to parent caller"
  },
  {
    question: "What is the Memory tab in DevTools used for?",
    shortAnswer: "Taking Heap Snapshots and recording allocation timelines to diagnose and fix memory leaks.",
    explanation: "Developers compare two heap snapshots before and after an action to identify retained objects (detached DOM nodes, uncleared closures) that cause memory growth.",
    hint: "Heap snapshots and memory leak profiling.",
    level: "expert",
    codeExample: "// Compare Snapshot 1 vs Snapshot 2 to find leaked objects"
  },
  {
    question: "What is the Performance tab in DevTools used for?",
    shortAnswer: "Recording CPU activity, frame rates (FPS), layout calculations, and JavaScript execution bottlenecks.",
    explanation: "Identifies long tasks (tasks taking > 50ms that block the main thread), layout thrashing, and slow rendering functions.",
    hint: "Profiles CPU flame charts, frame drops, and Long Tasks.",
    level: "expert",
    codeExample: "// Highlights Long Tasks (red flag on flame chart)"
  },
  {
    question: "What is console.clear() and what keyboard shortcut triggers it?",
    shortAnswer: "Clears all console messages; shortcut is Ctrl + L on Windows or Cmd + K on macOS.",
    explanation: "Clearing the console removes accumulated clutter and logs an empty slate message: 'Console was cleared'.",
    hint: "Ctrl + L or Cmd + K clears the console.",
    level: "basic",
    codeExample: "console.clear();"
  },
  {
    question: "What is console.info() vs console.debug()?",
    shortAnswer: "console.info prints informational messages; console.debug prints verbose logs visible only when 'Verbose' filter is enabled.",
    explanation: "By default, browsers hide console.debug() messages unless the user changes the DevTools log level dropdown from 'Info' to 'Verbose'.",
    hint: "console.debug requires 'Verbose' filter in DevTools log levels.",
    level: "intermediate",
    codeExample: "console.debug('Low-level V8 bytecode trace');"
  },
  {
    question: "How do you log multi-argument expressions with console.log()?",
    shortAnswer: "Pass multiple arguments separated by commas; the console joins them with spaces automatically.",
    explanation: "Passing multiple arguments avoids string concatenation bugs and allows objects to remain interactive references in DevTools.",
    hint: "console.log('User:', user, 'Status:', status);",
    level: "basic",
    codeExample: "console.log('Student:', 'Swadeep', 'Roll:', 101, { active: true });"
  }
];

export default questions;
