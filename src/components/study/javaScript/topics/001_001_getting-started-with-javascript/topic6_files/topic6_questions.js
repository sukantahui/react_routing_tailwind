const questions = [
  {
    question: "What is JavaScript Strict Mode and how is it invoked?",
    shortAnswer: "A restricted variant of JavaScript enabled by placing 'use strict'; at the top of a script or function.",
    explanation: "Introduced in ES5, strict mode eliminates bad language quirks, turns silent errors into exceptions, secures 'this', and boosts engine performance.",
    hint: "Place 'use strict'; at the start of a file or function.",
    level: "basic",
    codeExample: "'use strict';\n// Entire script executes in strict mode"
  },
  {
    question: "What happens when assigning to an undeclared variable in strict mode?",
    shortAnswer: "It throws a ReferenceError instead of creating an accidental global variable on window.",
    explanation: "In sloppy mode, typing foo = 10 attaches foo to window. In strict mode, the engine throws ReferenceError: foo is not defined.",
    hint: "Throws ReferenceError to prevent accidental global variables.",
    level: "basic",
    codeExample: "'use strict';\ntry {\n  x = 100; // ReferenceError\n} catch (e) {\n  console.log(e.name);\n}"
  },
  {
    question: "What is the value of 'this' in a plain standalone function call in strict mode?",
    shortAnswer: "'this' is undefined (in sloppy mode, it defaults to the global window object).",
    explanation: "Securing 'this' to undefined prevents functions from accidentally modifying global window properties when called without a context.",
    hint: "In strict mode, standalone function this is undefined.",
    level: "intermediate",
    codeExample: "'use strict';\nfunction test() { return this; }\nconsole.log(test()); // undefined"
  },
  {
    question: "Are ES6 Modules and Classes strict by default?",
    shortAnswer: "Yes, all ES6 Modules (import/export) and Class bodies execute in strict mode automatically.",
    explanation: "The ECMAScript specification mandates that all module code and class definitions are strict without needing an explicit 'use strict' directive.",
    hint: "ES6 Modules and Classes are strict by default.",
    level: "basic",
    codeExample: "class Student {\n  // Automatically strict mode!\n}"
  },
  {
    question: "What happens when mutating a non-writable or frozen property in strict mode?",
    shortAnswer: "A TypeError is thrown immediately (in sloppy mode, it fails silently).",
    explanation: "In sloppy mode, attempting to modify an Object.freeze() object fails without error. In strict mode, it throws TypeError.",
    hint: "Throws TypeError on non-writable property mutation.",
    level: "intermediate",
    codeExample: "'use strict';\nconst obj = Object.freeze({ a: 1 });\ntry { obj.a = 2; } catch(e) { console.log(e.name); } // TypeError"
  },
  {
    question: "Why does strict mode disallow duplicate parameter names in functions?",
    shortAnswer: "Duplicate parameter names create ambiguity and potential bugs; strict mode throws a SyntaxError.",
    explanation: "In sloppy mode, function add(a, a, b) { return a; } is allowed (second a overwrites first). Strict mode forbids this grammar.",
    hint: "Throws SyntaxError on duplicate parameters.",
    level: "intermediate",
    codeExample: "// 'use strict'; function add(a, a) {} // SyntaxError: Duplicate parameter name"
  },
  {
    question: "What happens to the 'with' statement in strict mode?",
    shortAnswer: "The 'with' statement is completely forbidden and throws a compile-time SyntaxError.",
    explanation: "'with' modifies the scope chain dynamically, confusing both developers and JIT compilers and crippling runtime optimization.",
    hint: "'with' statement is banned in strict mode.",
    level: "intermediate",
    codeExample: "// 'use strict'; with (obj) {} // SyntaxError: Strict mode code may not include a with statement"
  },
  {
    question: "How does strict mode handle variable declarations inside eval()?",
    shortAnswer: "Variables declared inside strict eval() do not leak into the enclosing scope.",
    explanation: "In sloppy mode, eval('var x = 10') creates x in the outer function. In strict mode, eval has its own isolated lexical scope.",
    hint: "Strict eval does not leak variables to outer scope.",
    level: "advanced",
    codeExample: "'use strict';\neval('var secret = 42;');\nconsole.log(typeof secret); // 'undefined' (Isolated!)"
  },
  {
    question: "Why are legacy octal numeric literals (e.g. 010) forbidden in strict mode?",
    shortAnswer: "Leading zero octals caused confusion with decimals; ES6 introduced the explicit 0o prefix instead.",
    explanation: "In sloppy mode, 010 evaluates to 8 (octal). Strict mode bans leading zeros to avoid bugs and requires 0o10.",
    hint: "Bans 010; requires modern ES6 0o10 format.",
    level: "basic",
    codeExample: "const num = 0o10; // Modern Octal (8)"
  },
  {
    question: "What happens when you try to delete an undeletable property in strict mode?",
    shortAnswer: "It throws a TypeError (in sloppy mode, it returns false silently).",
    explanation: "Attempting to run delete Object.prototype or delete Math.PI in strict mode throws a TypeError.",
    hint: "delete nonConfigurableProperty throws TypeError.",
    level: "intermediate",
    codeExample: "'use strict';\ntry { delete Object.prototype; } catch(e) { console.log(e.name); } // TypeError"
  },
  {
    question: "Why are 'eval' and 'arguments' forbidden as variable names in strict mode?",
    shortAnswer: "To prevent developers from shadowing or reassigning core language keywords.",
    explanation: "In strict mode, var eval = 10 or function(arguments) {} throws SyntaxError.",
    hint: "Cannot bind or assign to 'eval' or 'arguments'.",
    level: "intermediate",
    codeExample: "// 'use strict'; var eval = 10; // SyntaxError: Unexpected eval or arguments in strict mode"
  },
  {
    question: "How does strict mode improve V8 TurboFan JIT compiler optimization?",
    shortAnswer: "By eliminating dynamic scope changes (with, eval) and ensuring predictable lexical variable resolution.",
    explanation: "When the engine knows scopes cannot be modified dynamically, it can inline variable lookups and compile functions into faster machine code.",
    hint: "Predictable lexical scope enables faster JIT machine code.",
    level: "advanced",
    codeExample: "// Static scope resolution allows TurboFan to bypass runtime scope lookups"
  },
  {
    question: "What is the script concatenation hazard with 'use strict'?",
    shortAnswer: "Bundling a strict script at the top of non-strict legacy files makes the entire bundle strict, potentially breaking legacy code.",
    explanation: "If a top-level 'use strict' is placed at the top of a merged bundle, legacy scripts expecting sloppy mode will crash.",
    hint: "Wrap scripts in IIFEs before concatenating: (function() { 'use strict'; ... })();",
    level: "advanced",
    codeExample: "(function() {\n  'use strict';\n  // Safe scoped strict mode in bundle\n})();"
  },
  {
    question: "How do you detect whether strict mode is currently active in your JavaScript runtime?",
    shortAnswer: "Evaluate a non-arrow function call: (function() { return !this; })().",
    explanation: "If strict mode is active, this is undefined (!this is true). If sloppy mode is active, this is window (!window is false).",
    hint: "!this inside a regular function returns true in strict mode.",
    level: "advanced",
    codeExample: "const isStrict = (function() { return !this; })();\nconsole.log('Strict Active:', isStrict);"
  },
  {
    question: "What is the difference between function-level strict mode and file-level strict mode?",
    shortAnswer: "File-level applies to the entire file; function-level applies only inside that specific function body.",
    explanation: "Function-level strict mode allows developers to opt individual functions into strict mode without affecting legacy code in the rest of the file.",
    hint: "'use strict' inside function body scopes strictness to that function.",
    level: "basic",
    codeExample: "function strictRoutine() {\n  'use strict';\n  // Only this function is strict\n}"
  },
  {
    question: "What happens if 'use strict'; is not the first statement in a script or function?",
    shortAnswer: "It is treated as a plain harmless string literal and strict mode will NOT be activated.",
    explanation: "ECMAScript specification requires the directive prologue to be at the very top. Any code or semicolon preceding it disables strict activation.",
    hint: "Must be the very first statement (comments allowed before it).",
    level: "intermediate",
    codeExample: "const a = 1;\n'use strict'; // INEFFECTIVE! Strict mode is NOT active here"
  },
  {
    question: "What happens when you assign a primitive to a property in strict mode?",
    shortAnswer: "Throws TypeError (e.g. (14).s = 'test' throws TypeError in strict mode).",
    explanation: "In sloppy mode, boxing creates a temporary wrapper object and discards the property silently. In strict mode, it throws TypeError.",
    hint: "Throws TypeError when setting properties on primitive values.",
    level: "advanced",
    codeExample: "'use strict';\ntry { 'abc'.custom = 1; } catch(e) { console.log(e.name); } // TypeError"
  },
  {
    question: "What happens to arguments.callee in strict mode?",
    shortAnswer: "Accessing arguments.callee or arguments.caller throws a TypeError.",
    explanation: "arguments.callee prevents engine optimizations and inlining. Strict mode removes it completely.",
    hint: "arguments.callee is deprecated and throws TypeError in strict mode.",
    level: "intermediate",
    codeExample: "'use strict';\nfunction test() {\n  try { console.log(arguments.callee); } catch(e) { console.log(e.name); }\n}\ntest(); // TypeError"
  },
  {
    question: "How does strict mode handle the arguments object reflecting parameter changes?",
    shortAnswer: "In strict mode, the arguments object does NOT alias parameter variables (they remain decoupled).",
    explanation: "In sloppy mode, changing parameter 'a' mutates arguments[0]. In strict mode, arguments stores the initial values passed without aliasing.",
    hint: "Strict mode decouples parameters from arguments array indices.",
    level: "expert",
    codeExample: "'use strict';\nfunction check(a) {\n  a = 42;\n  console.log(arguments[0]); // 10 (Decoupled!)\n}\ncheck(10);"
  },
  {
    question: "Why does modern frontend development rarely require manual 'use strict' declarations?",
    shortAnswer: "Because modern bundlers and frameworks use ES Modules, which are strictly strict by specification.",
    explanation: "Vite, Next.js, and TypeScript automatically compile all code into ES Modules, rendering manual 'use strict' statements redundant.",
    hint: "ES Modules (import/export) are automatically strict mode.",
    level: "basic",
    codeExample: "// In Vite/React apps, all files are ES modules and already strict by default"
  },
  {
    question: "What is the difference between SyntaxError, ReferenceError, and TypeError in strict mode?",
    shortAnswer: "SyntaxError: Grammar violation at parse time; ReferenceError: Invalid variable reference; TypeError: Operation on incompatible type/object.",
    explanation: "Duplicate parameters cause SyntaxError at parse time. Undeclared variables cause ReferenceError. Mutating frozen objects causes TypeError.",
    hint: "SyntaxError (parsing) vs ReferenceError (variables) vs TypeError (property mutation).",
    level: "intermediate",
    codeExample: "// ReferenceError: x = 1\n// TypeError: frozenObj.prop = 1\n// SyntaxError: function(a, a) {}"
  },
  {
    question: "Can you turn OFF strict mode inside a nested function if the outer scope is strict?",
    shortAnswer: "No, strict mode cannot be cancelled or disabled once activated in an enclosing scope.",
    explanation: "Strict mode is strictly infectious downwards. A child function nested inside a strict file/function is always strict.",
    hint: "Strict mode cannot be deactivated in child scopes.",
    level: "intermediate",
    codeExample: "'use strict';\nfunction outer() {\n  function inner() {\n    // Always strict! Cannot turn off.\n  }\n}"
  },
  {
    question: "What happens when using delete on a plain variable in strict mode?",
    shortAnswer: "Throws a SyntaxError (e.g. delete x throws SyntaxError).",
    explanation: "delete is intended only for object properties. Attempting to delete direct variable identifiers is illegal in strict mode.",
    hint: "delete identifier throws SyntaxError.",
    level: "basic",
    codeExample: "'use strict';\nlet x = 10;\n// delete x; // SyntaxError: Delete of an unqualified identifier in strict mode"
  },
  {
    question: "What is the impact of strict mode on constructor functions invoked without 'new'?",
    shortAnswer: "In strict mode, this is undefined, causing immediate TypeError instead of polluting window with properties.",
    explanation: "In sloppy mode, Person('Swadeep') attaches name to window.name. In strict mode, this.name throws TypeError: Cannot set property on undefined.",
    hint: "Prevents constructor without 'new' from polluting window.",
    level: "intermediate",
    codeExample: "'use strict';\nfunction Person(name) {\n  this.name = name; // Throws TypeError if called without 'new'\n}"
  },
  {
    question: "What is the key takeaway about strict mode for professional engineers?",
    shortAnswer: "Strict mode enforces defensive coding invariants, prevents silent failures, and ensures forward compatibility with future ECMAScript standards.",
    explanation: "Writing strict code eliminates legacy JavaScript footguns and aligns with modern enterprise engineering standards.",
    hint: "Transforms silent bugs into actionable exceptions and prepares code for modern ESNext.",
    level: "basic",
    codeExample: "// Always develop in strict mode or ES Modules for production reliability"
  }
];

export default questions;
