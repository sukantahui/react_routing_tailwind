import os
import json

# ============================================
# Helper function to generate explanations
# ============================================
def generate_explanations(project, code):
    """
    Returns a tuple (logicExplanation, codeExplanation) for the given project.
    Uses the project title and the code to produce descriptive text.
    """
    title = project["title"]

    if "Function Declarations vs Function Expressions" in title:
        logic = (
            "Function declarations are hoisted and can be called before definition, while function expressions are not hoisted and "
            "are assigned to variables. Declarations are useful for global functions, expressions are often used as callbacks."
        )
        code_exp = (
            "The code shows a function declaration (hoisted) and a function expression (assigned to a variable). "
            "It demonstrates that the declaration can be called above its definition, while the expression cannot."
        )
    elif "Parameters, Arguments, and Default Parameters" in title:
        logic = (
            "Parameters are placeholders in function definition; arguments are actual values passed. Default parameters allow setting "
            "fallback values if an argument is omitted or undefined."
        )
        code_exp = (
            "The script defines a function with parameters, uses default values, and shows how arguments are matched to parameters."
        )
    elif "Return Values and Early Returns" in title:
        logic = (
            "Functions return values using `return`. If no `return` is present, the function returns `undefined`. Early returns "
            "can exit a function early based on conditions, avoiding nested logic."
        )
        code_exp = (
            "The code has a function that uses early returns to handle invalid inputs and returns a computed result otherwise."
        )
    elif "Function Scope: Local vs Global Variables" in title:
        logic = (
            "Variables declared inside a function with `var`, `let`, or `const` are local to that function. Global variables are "
            "accessible everywhere, but local variables shadow globals within the function scope."
        )
        code_exp = (
            "The script demonstrates a global variable and a local variable with the same name, showing how the local shadows the global."
        )
    elif "Arrow Functions and Concise Syntax" in title:
        logic = (
            "Arrow functions provide a shorter syntax, do not have their own `this`, and are not hoisted. They are ideal for short "
            "callbacks and when lexical `this` is needed."
        )
        code_exp = (
            "The code compares a traditional function with an arrow function. It shows the syntax differences and how `this` behaves."
        )
    elif "Pure Functions vs Side Effects" in title:
        logic = (
            "Pure functions always return the same output for the same input and cause no side effects (e.g., no mutation of external state). "
            "Impure functions may modify variables outside their scope or rely on external state."
        )
        code_exp = (
            "The script defines a pure function that adds two numbers, and an impure function that modifies a global variable."
        )
    elif "Function Hoisting" in title:
        logic = (
            "Hoisting moves function declarations to the top of their scope. Function expressions are not hoisted; only the variable "
            "declaration is hoisted, but the assignment remains in place."
        )
        code_exp = (
            "The code calls a function declared later (works) and attempts to call a function expression before its assignment (fails)."
        )
    elif "Immediately Invoked Function Expressions (IIFE)" in title:
        logic = (
            "IIFEs are functions that are defined and executed immediately. They create a new scope, avoiding polluting the global "
            "namespace, and are often used for module patterns."
        )
        code_exp = (
            "The script creates an IIFE that executes instantly and returns a value, and shows how variables inside are not accessible globally."
        )
    elif "Callback Functions" in title:
        logic = (
            "Callbacks are functions passed as arguments to other functions, to be executed later. They are fundamental to asynchronous "
            "programming and higher-order functions."
        )
        code_exp = (
            "The code defines a function that accepts a callback and invokes it, demonstrating both named and anonymous callbacks."
        )
    elif "Higher-Order Functions" in title:
        logic = (
            "Higher-order functions are functions that take other functions as arguments or return a function. Array methods like "
            "`map`, `filter`, and `reduce` are common examples."
        )
        code_exp = (
            "The script creates a custom higher-order function that accepts a function and applies it to each element of an array."
        )
    elif "Function Rest Parameters" in title:
        logic = (
            "Rest parameters allow a function to accept an indefinite number of arguments as an array. They are denoted by `...` before the parameter."
        )
        code_exp = (
            "The code defines a function that uses rest parameters to sum any number of arguments, showing the array conversion."
        )
    elif "Function Spread Operator" in title:
        logic = (
            "The spread operator (`...`) expands an iterable (like an array) into individual arguments. It is useful for passing array "
            "elements to functions that expect separate parameters."
        )
        code_exp = (
            "The script uses spread to pass array elements to a function that normally takes separate arguments."
        )
    elif "Closure Basics" in title:
        logic = (
            "A closure is formed when a function retains access to variables from its outer scope even after the outer function has returned. "
            "It's used for data privacy and creating factories."
        )
        code_exp = (
            "The code creates a function that returns an inner function, and the inner function remembers the outer variable, demonstrating closure."
        )
    elif "Function Factories (Returning Functions)" in title:
        logic = (
            "Function factories are functions that return other functions, often used to create customized functions with preset parameters."
        )
        code_exp = (
            "The script defines a multiplier factory that takes a factor and returns a function that multiplies a number by that factor."
        )
    elif "Recursion – Factorial" in title:
        logic = (
            "Recursion is when a function calls itself. The factorial function (n! = n * (n-1)!) is a classic recursive example."
        )
        code_exp = (
            "The code implements factorial recursively, with a base case for 0 and 1, and shows the call stack."
        )
    elif "Recursion – Fibonacci" in title:
        logic = (
            "The Fibonacci sequence is defined recursively: fib(n) = fib(n-1) + fib(n-2). Recursion can be expensive without memoization."
        )
        code_exp = (
            "The script computes Fibonacci numbers recursively and notes performance issues with large n."
        )
    elif "Function Methods: call, apply, bind" in title:
        logic = (
            "`call` and `apply` invoke a function with a specified `this` and arguments. `bind` returns a new function with a bound `this`."
        )
        code_exp = (
            "The code demonstrates using `call` and `apply` to invoke a function with different contexts, and uses `bind` to create a bound function."
        )
    elif "Function Arguments Object" in title:
        logic = (
            "The `arguments` object (available in non-arrow functions) is an array-like object containing the passed arguments. "
            "It's often replaced by rest parameters in modern code."
        )
        code_exp = (
            "The script uses the `arguments` object to sum any number of arguments, showing its array-like nature."
        )
    elif "Default Parameters with Object Destructuring" in title:
        logic = (
            "Default parameters can be combined with object destructuring to provide default values for properties, making function calls more flexible."
        )
        code_exp = (
            "The function accepts an options object with destructured properties and default values, allowing optional parameters."
        )
    elif "Function Composition" in title:
        logic = (
            "Function composition is combining multiple functions into one, where the output of one becomes the input of another. "
            "It's a functional programming technique."
        )
        code_exp = (
            "The script defines a compose function that takes two functions and returns a new function that applies them in sequence."
        )
    elif "Memoization (Caching)" in title:
        logic = (
            "Memoization caches function results based on input arguments to avoid redundant computations. It's useful for expensive recursive functions."
        )
        code_exp = (
            "The code adds memoization to the Fibonacci function, drastically improving performance for repeated calls."
        )
    elif "Currying" in title:
        logic = (
            "Currying transforms a function that takes multiple arguments into a sequence of functions each taking a single argument."
        )
        code_exp = (
            "The script implements a curried version of a multiplication function and shows how it can be partially applied."
        )
    elif "Async Functions (Promise basics)" in title:
        logic = (
            "Async functions return a Promise and allow using `await` to pause execution until a Promise resolves. They simplify asynchronous code."
        )
        code_exp = (
            "The code defines an async function that simulates fetching data with `setTimeout` and returns a Promise, then uses `await` to get the result."
        )
    elif "setTimeout and setInterval with Functions" in title:
        logic = (
            "`setTimeout` and `setInterval` schedule function execution after a delay. They are used for timers, animations, and periodic tasks."
        )
        code_exp = (
            "The script shows a timeout that logs after 2 seconds and an interval that increments a counter every second, then clears it."
        )
    elif "Function Binding in Event Handlers" in title:
        logic = (
            "When event handlers are passed as callbacks, the value of `this` may change. Using `bind` ensures the correct context."
        )
        code_exp = (
            "The code simulates a button click handler, showing how `this` would be lost and how `bind` preserves it."
        )
    elif "Function Generators (Intro)" in title:
        logic = (
            "Generator functions (`function*`) can yield multiple values over time and pause execution, producing an iterator. "
            "They are used for lazy sequences and async flows."
        )
        code_exp = (
            "The script defines a generator that yields numbers 1 to 3, and iterates over it using `for...of`."
        )
    elif "Throttling and Debouncing (Concept)" in title:
        logic = (
            "Throttling limits how often a function can be called (e.g., once per 100ms), while debouncing delays execution until after a pause."
        )
        code_exp = (
            "The code provides simple implementations of throttle and debounce, and demonstrates their effect with repeated calls."
        )
    elif "Function with Rest and Spread Combined" in title:
        logic = (
            "Rest and spread can be combined to accept a variable number of arguments and then pass them to another function."
        )
        code_exp = (
            "The script defines a function that uses rest to collect arguments, then uses spread to call another function with them."
        )
    elif "Error Handling in Functions (try/catch)" in title:
        logic = (
            "`try...catch` blocks allow handling errors gracefully inside functions, preventing crashes and enabling recovery."
        )
        code_exp = (
            "The function attempts a risky operation (like parsing invalid JSON) and catches the error, returning a default value instead."
        )
    else:  # FUNC030
        logic = (
            "This comprehensive project combines multiple function concepts into a utility library. It includes pure functions, closures, "
            "higher-order functions, error handling, and more, demonstrating real-world usage."
        )
        code_exp = (
            "The code defines a set of utility functions (e.g., compose, memoize, throttle) and uses them to build a small application, "
            "showcasing integration of various function features."
        )

    return logic, code_exp


# ============================================
# JavaScript function projects data (30 projects)
# ============================================
func_projects = {
    "projectCategory": "JavaScript Functions – 30 Practical Projects",
    "subject": "Web Development (JavaScript)",
    "board": "General",
    "class": "Beginner / Intermediate / Advanced",
    "tools": ["Browser Console", "VS Code", "Any modern browser"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": [
        {
            "projectId": "FUNC001",
            "title": "Function Declarations vs Function Expressions",
            "difficulty": "Beginner",
            "description": "Compare hoisting behavior of function declarations and function expressions.",
            "exampleText": "console.log(declaration()); function declaration() { return 'Hoisted!'; }\nconst expression = function() { return 'Not hoisted!'; };",
            "exampleOutput": "Hoisted!; TypeError: expression is not a function",
            "answerFile": "./answers/FUNC001.js",
            "learningOutcome": "Understanding hoisting and the difference between declaration and expression."
        },
        {
            "projectId": "FUNC002",
            "title": "Parameters, Arguments, and Default Parameters",
            "difficulty": "Beginner",
            "description": "Demonstrate function parameters, passing arguments, and default parameter values.",
            "exampleText": "function greet(name = 'Guest') { return `Hello, ${name}`; }",
            "exampleOutput": "Hello, Alice; Hello, Guest",
            "answerFile": "./answers/FUNC002.js",
            "learningOutcome": "Using parameters and default values."
        },
        {
            "projectId": "FUNC003",
            "title": "Return Values and Early Returns",
            "difficulty": "Beginner",
            "description": "Show how return values work and how early returns can simplify logic.",
            "exampleText": "function divide(a, b) { if (b === 0) return 'Error: division by zero'; return a / b; }",
            "exampleOutput": "2; Error: division by zero",
            "answerFile": "./answers/FUNC003.js",
            "learningOutcome": "Returning values and using early returns."
        },
        {
            "projectId": "FUNC004",
            "title": "Function Scope: Local vs Global Variables",
            "difficulty": "Beginner",
            "description": "Illustrate the difference between global and local variables inside a function.",
            "exampleText": "let globalVar = 'global';\nfunction testScope() { let localVar = 'local'; console.log(globalVar, localVar); }",
            "exampleOutput": "global local",
            "answerFile": "./answers/FUNC004.js",
            "learningOutcome": "Understanding variable scope."
        },
        {
            "projectId": "FUNC005",
            "title": "Arrow Functions and Concise Syntax",
            "difficulty": "Beginner",
            "description": "Compare traditional functions with arrow functions, focusing on syntax and this binding.",
            "exampleText": "const add = (a, b) => a + b;\nconst obj = { name: 'Arrow', method: () => this.name };",
            "exampleOutput": "add(2,3) -> 5; obj.method() -> undefined (or global)",
            "answerFile": "./answers/FUNC005.js",
            "learningOutcome": "Arrow function syntax and lexical this."
        },
        {
            "projectId": "FUNC006",
            "title": "Pure Functions vs Side Effects",
            "difficulty": "Intermediate",
            "description": "Define pure and impure functions, and understand the concept of side effects.",
            "exampleText": "let counter = 0;\nfunction impure() { counter++; }\nfunction pure(a, b) { return a + b; }",
            "exampleOutput": "pure(1,2) always 3; impure modifies external state.",
            "answerFile": "./answers/FUNC006.js",
            "learningOutcome": "Identifying pure functions and side effects."
        },
        {
            "projectId": "FUNC007",
            "title": "Function Hoisting",
            "difficulty": "Beginner",
            "description": "Explore how function declarations are hoisted, while expressions are not.",
            "exampleText": "hoisted(); function hoisted() { console.log('Works'); }\n// notHoisted(); // Error\nvar notHoisted = function() {};",
            "exampleOutput": "Works; Error if notHoisted called before assignment",
            "answerFile": "./answers/FUNC007.js",
            "learningOutcome": "Hoisting behavior of functions."
        },
        {
            "projectId": "FUNC008",
            "title": "Immediately Invoked Function Expressions (IIFE)",
            "difficulty": "Intermediate",
            "description": "Create and execute an IIFE to encapsulate code and avoid polluting global scope.",
            "exampleText": "(function() { var private = 10; console.log(private); })();",
            "exampleOutput": "10; private is not accessible outside",
            "answerFile": "./answers/FUNC008.js",
            "learningOutcome": "Using IIFE for scope isolation."
        },
        {
            "projectId": "FUNC009",
            "title": "Callback Functions",
            "difficulty": "Intermediate",
            "description": "Pass a function as an argument to another function and execute it later.",
            "exampleText": "function processUserInput(callback) { callback('John'); }",
            "exampleOutput": "Hello, John",
            "answerFile": "./answers/FUNC009.js",
            "learningOutcome": "Understanding callbacks."
        },
        {
            "projectId": "FUNC010",
            "title": "Higher-Order Functions",
            "difficulty": "Intermediate",
            "description": "Create a function that takes another function as an argument or returns a function.",
            "exampleText": "function applyTwice(f, x) { return f(f(x)); }",
            "exampleOutput": "applyTwice(n => n*2, 3) -> 12",
            "answerFile": "./answers/FUNC010.js",
            "learningOutcome": "Higher-order functions concept."
        },
        {
            "projectId": "FUNC011",
            "title": "Function Rest Parameters",
            "difficulty": "Intermediate",
            "description": "Use rest parameters to handle an indefinite number of arguments as an array.",
            "exampleText": "function sum(...numbers) { return numbers.reduce((a,b) => a+b, 0); }",
            "exampleOutput": "sum(1,2,3) -> 6",
            "answerFile": "./answers/FUNC011.js",
            "learningOutcome": "Rest parameters."
        },
        {
            "projectId": "FUNC012",
            "title": "Function Spread Operator",
            "difficulty": "Intermediate",
            "description": "Spread array elements as arguments to a function.",
            "exampleText": "const nums = [1,2,3]; Math.max(...nums);",
            "exampleOutput": "3",
            "answerFile": "./answers/FUNC012.js",
            "learningOutcome": "Spread operator with function calls."
        },
        {
            "projectId": "FUNC013",
            "title": "Closure Basics",
            "difficulty": "Advanced",
            "description": "Create a closure where an inner function retains access to outer variables.",
            "exampleText": "function outer(x) { return function inner(y) { return x + y; }; }",
            "exampleOutput": "outer(5)(3) -> 8",
            "answerFile": "./answers/FUNC013.js",
            "learningOutcome": "Understanding closures."
        },
        {
            "projectId": "FUNC014",
            "title": "Function Factories (Returning Functions)",
            "difficulty": "Advanced",
            "description": "Write a function that returns another function, often used to create customized functions.",
            "exampleText": "function multiplier(factor) { return function(x) { return x * factor; }; }",
            "exampleOutput": "double(5) -> 10",
            "answerFile": "./answers/FUNC014.js",
            "learningOutcome": "Factory functions and closures."
        },
        {
            "projectId": "FUNC015",
            "title": "Recursion – Factorial",
            "difficulty": "Intermediate",
            "description": "Implement factorial using recursion.",
            "exampleText": "function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }",
            "exampleOutput": "factorial(5) -> 120",
            "answerFile": "./answers/FUNC015.js",
            "learningOutcome": "Recursive thinking."
        },
        {
            "projectId": "FUNC016",
            "title": "Recursion – Fibonacci",
            "difficulty": "Intermediate",
            "description": "Compute Fibonacci numbers recursively.",
            "exampleText": "function fib(n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }",
            "exampleOutput": "fib(6) -> 8",
            "answerFile": "./answers/FUNC016.js",
            "learningOutcome": "Recursion with performance considerations."
        },
        {
            "projectId": "FUNC017",
            "title": "Function Methods: call, apply, bind",
            "difficulty": "Advanced",
            "description": "Use call, apply, and bind to control the value of this and arguments.",
            "exampleText": "function greet() { console.log(this.name); }\nconst obj = { name: 'Alice' };",
            "exampleOutput": "Alice (via call); Alice (via bind)",
            "answerFile": "./answers/FUNC017.js",
            "learningOutcome": "Explicit this binding."
        },
        {
            "projectId": "FUNC018",
            "title": "Function Arguments Object",
            "difficulty": "Intermediate",
            "description": "Access the arguments object inside a regular function (non-arrow).",
            "exampleText": "function sum() { return Array.from(arguments).reduce((a,b) => a+b, 0); }",
            "exampleOutput": "sum(1,2,3) -> 6",
            "answerFile": "./answers/FUNC018.js",
            "learningOutcome": "Arguments object and its array-like nature."
        },
        {
            "projectId": "FUNC019",
            "title": "Default Parameters with Object Destructuring",
            "difficulty": "Intermediate",
            "description": "Combine default parameters and object destructuring for flexible options.",
            "exampleText": "function configure({ port = 3000, host = 'localhost' } = {}) { console.log(port, host); }",
            "exampleOutput": "3000 localhost (defaults)",
            "answerFile": "./answers/FUNC019.js",
            "learningOutcome": "Destructuring defaults."
        },
        {
            "projectId": "FUNC020",
            "title": "Function Composition",
            "difficulty": "Advanced",
            "description": "Combine multiple functions into one using composition.",
            "exampleText": "const compose = (f, g) => x => f(g(x));",
            "exampleOutput": "compose(x => x*2, x => x+1)(5) -> 12",
            "answerFile": "./answers/FUNC020.js",
            "learningOutcome": "Function composition."
        },
        {
            "projectId": "FUNC021",
            "title": "Memoization (Caching)",
            "difficulty": "Advanced",
            "description": "Cache function results to avoid recalculating.",
            "exampleText": "function memoize(fn) { const cache = {}; return function(...args) { const key = JSON.stringify(args); if (cache[key]) return cache[key]; return cache[key] = fn(...args); }; }",
            "exampleOutput": "Memoized Fibonacci runs faster",
            "answerFile": "./answers/FUNC021.js",
            "learningOutcome": "Optimization with memoization."
        },
        {
            "projectId": "FUNC022",
            "title": "Currying",
            "difficulty": "Advanced",
            "description": "Transform a function that takes multiple arguments into a sequence of unary functions.",
            "exampleText": "const curry = (fn) => (a) => (b) => fn(a,b);",
            "exampleOutput": "curry((a,b) => a+b)(5)(3) -> 8",
            "answerFile": "./answers/FUNC022.js",
            "learningOutcome": "Currying concept."
        },
        {
            "projectId": "FUNC023",
            "title": "Async Functions (Promise basics)",
            "difficulty": "Advanced",
            "description": "Use async/await to handle asynchronous operations.",
            "exampleText": "async function fetchData() { return new Promise(resolve => setTimeout(() => resolve('data'), 1000)); }",
            "exampleOutput": "data after 1 second",
            "answerFile": "./answers/FUNC023.js",
            "learningOutcome": "Async/await with Promises."
        },
        {
            "projectId": "FUNC024",
            "title": "setTimeout and setInterval with Functions",
            "difficulty": "Intermediate",
            "description": "Schedule function execution with timers.",
            "exampleText": "setTimeout(() => console.log('timeout'), 1000);",
            "exampleOutput": "timeout after 1 sec",
            "answerFile": "./answers/FUNC024.js",
            "learningOutcome": "Timers and scheduling."
        },
        {
            "projectId": "FUNC025",
            "title": "Function Binding in Event Handlers",
            "difficulty": "Intermediate",
            "description": "Preserve this context when attaching event handlers.",
            "exampleText": "button.addEventListener('click', this.handleClick.bind(this));",
            "exampleOutput": "this correctly refers to the component",
            "answerFile": "./answers/FUNC025.js",
            "learningOutcome": "Binding event handlers."
        },
        {
            "projectId": "FUNC026",
            "title": "Function Generators (Intro)",
            "difficulty": "Advanced",
            "description": "Create generator functions that yield values lazily.",
            "exampleText": "function* idGenerator() { let id = 1; while(true) { yield id++; } }",
            "exampleOutput": "1, 2, 3, ...",
            "answerFile": "./answers/FUNC026.js",
            "learningOutcome": "Generator functions."
        },
        {
            "projectId": "FUNC027",
            "title": "Throttling and Debouncing (Concept)",
            "difficulty": "Advanced",
            "description": "Implement throttle and debounce functions to limit execution frequency.",
            "exampleText": "function throttle(fn, delay) { let lastCall = 0; return function(...args) { ... }; }",
            "exampleOutput": "Logs at most once per delay",
            "answerFile": "./answers/FUNC027.js",
            "learningOutcome": "Performance optimization techniques."
        },
        {
            "projectId": "FUNC028",
            "title": "Function with Rest and Spread Combined",
            "difficulty": "Intermediate",
            "description": "Use rest to collect arguments and spread to pass them to another function.",
            "exampleText": "function logAll(...args) { console.log(...args); }",
            "exampleOutput": "Logs all arguments individually",
            "answerFile": "./answers/FUNC028.js",
            "learningOutcome": "Combining rest and spread."
        },
        {
            "projectId": "FUNC029",
            "title": "Error Handling in Functions (try/catch)",
            "difficulty": "Intermediate",
            "description": "Use try/catch to handle errors gracefully inside functions.",
            "exampleText": "function safeParse(json) { try { return JSON.parse(json); } catch { return null; } }",
            "exampleOutput": "null on invalid JSON",
            "answerFile": "./answers/FUNC029.js",
            "learningOutcome": "Error handling."
        },
        {
            "projectId": "FUNC030",
            "title": "Comprehensive Function Practice: Utility Library",
            "difficulty": "Advanced",
            "description": "Build a small utility library using many function concepts: composition, memoization, throttling, etc.",
            "exampleText": "const utils = { compose, memoize, throttle, ... }",
            "exampleOutput": "A working set of utility functions.",
            "answerFile": "./answers/FUNC030.js",
            "learningOutcome": "Integrating multiple function concepts."
        }
    ]
}


# ============================================
# JavaScript code for each project (FUNC001.js .. FUNC030.js)
# ============================================
func_files_content = {
    "FUNC001.js": r"""// Function Declarations vs Function Expressions
console.log(declaration()); // Works due to hoisting

function declaration() {
    return 'Function declaration works!';
}

// console.log(expression()); // TypeError: expression is not a function
const expression = function() {
    return 'Function expression works only after assignment';
};

console.log(expression()); // Now it works
""",

    "FUNC002.js": r"""// Parameters, Arguments, and Default Parameters
function greet(name = 'Guest') {
    return `Hello, ${name}`;
}

console.log(greet('Alice')); // Hello, Alice
console.log(greet());        // Hello, Guest
""",

    "FUNC003.js": r"""// Return Values and Early Returns
function divide(a, b) {
    if (b === 0) {
        return 'Error: division by zero'; // early return
    }
    return a / b;
}

console.log(divide(10, 5)); // 2
console.log(divide(10, 0)); // Error: division by zero
""",

    "FUNC004.js": r"""// Function Scope: Local vs Global Variables
let globalVar = 'global';

function testScope() {
    let localVar = 'local';
    console.log('Inside function:', globalVar, localVar);
}

testScope();
// console.log(localVar); // ReferenceError: localVar is not defined
""",

    "FUNC005.js": r"""// Arrow Functions and Concise Syntax
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(add(2, 3), addArrow(2, 3)); // 5 5

// Lexical this
const obj = {
    name: 'Arrow',
    traditional: function() {
        console.log('Traditional this:', this.name);
    },
    arrow: () => {
        console.log('Arrow this:', this.name);
    }
};
obj.traditional(); // Arrow
obj.arrow();       // undefined (or global)
""",

    "FUNC006.js": r"""// Pure Functions vs Side Effects
let counter = 0;

// Impure function: modifies external state
function impure() {
    counter++;
    return counter;
}

// Pure function: no side effects, same input => same output
function pure(a, b) {
    return a + b;
}

console.log(pure(1, 2)); // 3
console.log(pure(1, 2)); // 3
console.log(impure());   // 1
console.log(impure());   // 2
""",

    "FUNC007.js": r"""// Function Hoisting
hoisted(); // Works

function hoisted() {
    console.log('Hoisted!');
}

// notHoisted(); // TypeError: notHoisted is not a function
var notHoisted = function() {
    console.log('Not hoisted');
};
notHoisted(); // Works now
""",

    "FUNC008.js": r"""// Immediately Invoked Function Expressions (IIFE)
(function() {
    var privateVar = 'I am private';
    console.log('IIFE executed:', privateVar);
})();

// privateVar is not accessible here
// console.log(privateVar); // ReferenceError
""",

    "FUNC009.js": r"""// Callback Functions
function processUserInput(callback) {
    const name = 'John';
    callback(name);
}

processUserInput(function(name) {
    console.log(`Hello, ${name}`);
});
""",

    "FUNC010.js": r"""// Higher-Order Functions
function applyTwice(f, x) {
    return f(f(x));
}

const double = n => n * 2;
console.log(applyTwice(double, 3)); // 12 (3*2*2)
""",

    "FUNC011.js": r"""// Function Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100
""",

    "FUNC012.js": r"""// Function Spread Operator
const numbers = [5, 10, 15, 20];
const max = Math.max(...numbers);
console.log(max); // 20
""",

    "FUNC013.js": r"""// Closure Basics
function outer(x) {
    return function inner(y) {
        return x + y;
    };
}

const add5 = outer(5);
console.log(add5(3)); // 8
console.log(outer(10)(2)); // 12
""",

    "FUNC014.js": r"""// Function Factories (Returning Functions)
function multiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
""",

    "FUNC015.js": r"""// Recursion – Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
""",

    "FUNC016.js": r"""// Recursion – Fibonacci
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(6));  // 8
console.log(fib(10)); // 55
// Note: This is inefficient for large n; memoization would help.
""",

    "FUNC017.js": r"""// Function Methods: call, apply, bind
function greet(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };

// call
greet.call(person, 'Hello'); // Hello, Alice

// apply
greet.apply(person, ['Hi']); // Hi, Alice

// bind
const boundGreet = greet.bind(person, 'Hey');
boundGreet(); // Hey, Alice
""",

    "FUNC018.js": r"""// Function Arguments Object
function sumAll() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sumAll(1, 2, 3, 4)); // 10
console.log(sumAll(5, 10));      // 15
""",

    "FUNC019.js": r"""// Default Parameters with Object Destructuring
function configure({ port = 3000, host = 'localhost' } = {}) {
    console.log(`Server running on ${host}:${port}`);
}

configure();               // Server running on localhost:3000
configure({ port: 8080 }); // Server running on localhost:8080
configure({ host: 'example.com', port: 80 }); // Server running on example.com:80
""",

    "FUNC020.js": r"""// Function Composition
const compose = (f, g) => x => f(g(x));

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(3)); // (3+1)*2 = 8
""",

    "FUNC021.js": r"""// Memoization (Caching)
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Returning from cache');
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const fib = memoize(function(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // fast due to memoization
""",

    "FUNC022.js": r"""// Currying
const curry = fn => a => b => fn(a, b);

const add = (a, b) => a + b;
const curriedAdd = curry(add);

console.log(curriedAdd(5)(3)); // 8
const add5 = curriedAdd(5);
console.log(add5(10)); // 15
""",

    "FUNC023.js": r"""// Async Functions (Promise basics)
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Data received'), 1000);
    });
}

async function displayData() {
    const data = await fetchData();
    console.log(data);
}

displayData(); // Data received after 1 second
""",

    "FUNC024.js": r"""// setTimeout and setInterval with Functions
setTimeout(() => {
    console.log('Timeout executed after 2 seconds');
}, 2000);

let count = 0;
const interval = setInterval(() => {
    count++;
    console.log(`Interval count: ${count}`);
    if (count === 3) clearInterval(interval);
}, 1000);
""",

    "FUNC025.js": r"""// Function Binding in Event Handlers
class Button {
    constructor(label) {
        this.label = label;
    }

    handleClick() {
        console.log(`Button ${this.label} clicked`);
    }
}

const btn = new Button('Submit');
// Simulate a click handler that loses context
setTimeout(btn.handleClick, 1000); // Button undefined clicked
// Bind fixes it
setTimeout(btn.handleClick.bind(btn), 1000); // Button Submit clicked
""",

    "FUNC026.js": r"""// Function Generators (Intro)
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
""",

    "FUNC027.js": r"""// Throttling and Debouncing (Concept)
function throttle(fn, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Simulate rapid calls
const log = throttle(() => console.log('Throttled'), 1000);
const logDebounced = debounce(() => console.log('Debounced'), 1000);

setInterval(log, 200); // logs at most once per second
setInterval(logDebounced, 200); // logs only after 1 second of no calls
setTimeout(() => clearInterval(interval1), 5000); // demo stop
""",

    "FUNC028.js": r"""// Function with Rest and Spread Combined
function logAll(...args) {
    console.log(...args);
}

logAll(1, 2, 3, 4); // 1 2 3 4
""",

    "FUNC029.js": r"""// Error Handling in Functions (try/catch)
function safeParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.log('Parsing error:', error.message);
        return null;
    }
}

console.log(safeParse('{"name":"Alice"}')); // { name: 'Alice' }
console.log(safeParse('invalid json'));     // null
""",

    "FUNC030.js": r"""// Comprehensive Function Practice: Utility Library
const utils = (function() {
    // Compose
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

    // Memoize
    const memoize = fn => {
        const cache = {};
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache[key]) return cache[key];
            const result = fn(...args);
            cache[key] = result;
            return result;
        };
    };

    // Throttle
    const throttle = (fn, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                fn(...args);
            }
        };
    };

    // Debounce
    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    return { compose, memoize, throttle, debounce };
})();

// Example usage
const add = a => b => a + b;
const add5 = add(5);
const double = x => x * 2;
const add5ThenDouble = utils.compose(double, add5);
console.log(add5ThenDouble(3)); // (3+5)*2 = 16

const factorial = utils.memoize(n => n <= 1 ? 1 : n * factorial(n-1));
console.log(factorial(5)); // 120, cached for future calls

const log = utils.throttle(() => console.log('Throttled'), 1000);
log(); // will run at most once per second
"""
}


# ============================================
# Add explanation fields to each project
# ============================================
for proj in func_projects["projects"]:
    pid = proj["projectId"]
    code = func_files_content.get(pid + ".js", "")
    logic, code_exp = generate_explanations(proj, code)
    proj["logicExplanation"] = logic
    proj["codeExplanation"] = code_exp


# ============================================
# Create directories and write files
# ============================================
current_dir = os.path.dirname(os.path.abspath(__file__))

answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Write JSON file
json_path = os.path.join(current_dir, "js-function-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(func_projects, f, indent=2, ensure_ascii=False)

# Write each JavaScript file
for filename, content in func_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(func_files_content)} JS files and 'js-function-projects.json' (with explanations)")