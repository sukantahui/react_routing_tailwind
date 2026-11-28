// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "What is variable scope in Python?",
    "options": [
      "The region of a program where a variable is accessible and recognized",
      "The data type of a variable",
      "The memory size in bytes",
      "The lifetime of the computer"
    ],
    "correctAnswer": 0,
    "explanation": "Scope defines the textual context or visibility boundary within which an identifier can be referenced.",
    "hint": "Visibility region."
  },
  {
    "id": 2,
    "question": "What is the scope of a variable defined inside a Python function?",
    "options": [
      "Global scope",
      "Local scope",
      "Built-in scope",
      "Universal scope"
    ],
    "correctAnswer": 1,
    "explanation": "Variables declared inside a function body have local scope and are accessible only within that function.",
    "hint": "Function-bound scope."
  },
  {
    "id": 3,
    "question": "What happens if you attempt to access a function's local variable outside of that function?",
    "options": [
      "It returns None",
      "It returns 0",
      "Raises NameError: name '...' is not defined",
      "SyntaxError"
    ],
    "correctAnswer": 2,
    "explanation": "Local variables do not exist outside their defining function; accessing them raises `NameError`.",
    "hint": "Unbound identifier outside scope."
  },
  {
    "id": 4,
    "question": "What is the lifetime of a local variable?",
    "options": [
      "It persists until the computer restarts",
      "Created when the function is called and destroyed when the function returns",
      "Lives permanently in memory",
      "Expires after 10 seconds"
    ],
    "correctAnswer": 1,
    "explanation": "Local variables exist only during the active invocation of the function.",
    "hint": "Invocation duration."
  },
  {
    "id": 5,
    "question": "What is the scope of a variable defined outside of all functions at top-level?",
    "options": [
      "Local scope",
      "Global scope",
      "Class scope",
      "Hidden scope"
    ],
    "correctAnswer": 1,
    "explanation": "Top-level variables declared outside functions have module-wide global scope.",
    "hint": "Module-wide scope."
  },
  {
    "id": 6,
    "question": "What is variable shadowing?",
    "options": [
      "When a local variable has the same name as a global variable, hiding the global variable within the function",
      "A memory leak",
      "Deleting a variable",
      "An encrypted variable"
    ],
    "correctAnswer": 0,
    "explanation": "Shadowing occurs when a local identifier masks an identically named global identifier in local scope.",
    "hint": "Local masks global."
  },
  {
    "id": 7,
    "question": "What will `x = 10; def f(): x = 20; f(); print(x)` output?",
    "options": [
      "10",
      "20",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The assignment `x = 20` inside `f` creates a local variable `x`. The global `x` remains 10.",
    "hint": "Local assignment does not alter global."
  },
  {
    "id": 8,
    "question": "Can a function read the value of a global variable without using the `global` keyword?",
    "options": [
      "Yes, reading global variables is permitted without the global keyword",
      "No, reading requires global keyword",
      "Only if it is a string",
      "Raises UnboundLocalError"
    ],
    "correctAnswer": 0,
    "explanation": "Python allows reading global variables directly if no local assignment occurs in the function.",
    "hint": "Read-only global access."
  },
  {
    "id": 9,
    "question": "What is the lifetime of a global variable?",
    "options": [
      "Created when defined and persists until the program terminates",
      "Destroyed after each function call",
      "1 hour",
      "Only while main() runs"
    ],
    "correctAnswer": 0,
    "explanation": "Global variables remain in the module namespace until the Python interpreter process exits.",
    "hint": "Program lifetime."
  },
  {
    "id": 10,
    "question": "What is printed by: `x = 5; def f(): print(x); f()`?",
    "options": [
      "5",
      "None",
      "NameError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Since `x` is not assigned locally, Python looks up `x` in the global scope and prints 5.",
    "hint": "Global lookup."
  },
  {
    "id": 11,
    "question": "Where are local variables stored during function execution?",
    "options": [
      "In the local stack frame of the Call Stack",
      "In the global data segment",
      "On the hard disk",
      "In cache memory only"
    ],
    "correctAnswer": 0,
    "explanation": "Local variables reside within the activation record (stack frame) on the call stack.",
    "hint": "Stack frame storage."
  },
  {
    "id": 12,
    "question": "What error occurs if two functions declare local variables with the same name `total`?",
    "options": [
      "No error; each function has its own completely isolated local scope",
      "NameCollisionError",
      "SyntaxError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Local scopes are strictly isolated; identical names in different functions do not conflict.",
    "hint": "Scope isolation."
  },
  {
    "id": 13,
    "question": "Can a local variable in `funcA` be directly accessed by `funcB`?",
    "options": [
      "No, functions cannot access local variables of other functions",
      "Yes, if they are in the same file",
      "Only if funcA returns it",
      "Yes, using import"
    ],
    "correctAnswer": 0,
    "explanation": "Local scopes are mutually exclusive; `funcB` cannot inspect `funcA`'s local namespace.",
    "hint": "Mutual scope exclusion."
  },
  {
    "id": 14,
    "question": "What does `globals()` return in Python?",
    "options": [
      "A dictionary representing the current global symbol table",
      "A list of numbers",
      "CPU clock speed",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`globals()` returns the dictionary containing all current module-level global variables.",
    "hint": "Global symbol dictionary."
  },
  {
    "id": 15,
    "question": "What does `locals()` return?",
    "options": [
      "A dictionary representing the current local namespace",
      "List of installed packages",
      "Memory address",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`locals()` returns a dictionary of the current local scope's variables.",
    "hint": "Local symbol dictionary."
  },
  {
    "id": 16,
    "question": "What will `a = 1; def f(): a = 2; def g(): a = 3; g(); return a; print(f())` output?",
    "options": [
      "2",
      "1",
      "3",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`g()` sets its own local `a = 3`. `f()`'s local `a` remains 2. Thus `f()` returns 2.",
    "hint": "Nested scope boundaries."
  },
  {
    "id": 17,
    "question": "Why is excessive use of global variables discouraged in software design?",
    "options": [
      "They make code harder to debug, create hidden dependencies, and can be unintentionally modified anywhere",
      "They run slower",
      "They are limited to 10 in Python",
      "They cannot store lists"
    ],
    "correctAnswer": 0,
    "explanation": "Global state introduces tight coupling and makes functions non-reentrant and difficult to test.",
    "hint": "Software engineering best practices."
  },
  {
    "id": 18,
    "question": "What is the scope of formal parameters?",
    "options": [
      "Local to the function in which they are defined",
      "Global to the script",
      "Universal",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Formal parameters behave identically to local variables created at the start of the function.",
    "hint": "Parameter scope."
  },
  {
    "id": 19,
    "question": "What is printed by: `val = 100; def f(val): return val + 50; print(f(20))`?",
    "options": [
      "70",
      "150",
      "100",
      "20"
    ],
    "correctAnswer": 0,
    "explanation": "Parameter `val = 20` shadows global `val = 100`: `20 + 50 = 70`.",
    "hint": "Parameter shadowing."
  },
  {
    "id": 20,
    "question": "What is the value of global `val` after `val = 100; def f(val): val = 200; f(50); print(val)`?",
    "options": [
      "100",
      "200",
      "50",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Modifying parameter `val` inside `f` has zero effect on the global variable `val`.",
    "hint": "Global preservation."
  },
  {
    "id": 21,
    "question": "When is a global variable created in Python?",
    "options": [
      "When it is first assigned a value at the module level",
      "When the computer boots up",
      "Only inside main()",
      "When imported"
    ],
    "correctAnswer": 0,
    "explanation": "A global variable comes into existence upon its initial top-level assignment statement.",
    "hint": "Creation upon assignment."
  },
  {
    "id": 22,
    "question": "Can a global variable be deleted using `del`?",
    "options": [
      "Yes, `del variable_name` removes it from the global namespace",
      "No, global variables are permanent",
      "Only if it is a number",
      "Raises SystemError"
    ],
    "correctAnswer": 0,
    "explanation": "`del` removes the name binding from the global namespace.",
    "hint": "del on global names."
  },
  {
    "id": 23,
    "question": "What is printed by: `x = 10; def f(): x = x + 1; f()`?",
    "options": [
      "UnboundLocalError: cannot access local variable 'x' where it is not associated with a value",
      "11",
      "10",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Because `x` is assigned on the left of `=`, Python treats `x` as local. Evaluating `x + 1` before it is initialized raises `UnboundLocalError`.",
    "hint": "Classic UnboundLocalError."
  },
  {
    "id": 24,
    "question": "Why does `x = x + 1` inside a function without `global x` cause an `UnboundLocalError`?",
    "options": [
      "Python detects assignment to x and marks it local, but tries to read it before assignment",
      "Because x is immutable",
      "Because x is undefined",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Any assignment in a function marks the name as local throughout the entire function body.",
    "hint": "Compile-time local detection."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the core difference between scope and lifetime?",
    "options": [
      "Scope is the region of code where a variable is accessible; Lifetime is the duration of time it remains in memory",
      "They are identical concepts",
      "Scope is memory size; Lifetime is variable name",
      "Lifetime applies only to files"
    ],
    "correctAnswer": 0,
    "explanation": "Scope is spatial/textual (where it can be seen); Lifetime is temporal (how long it exists in memory).",
    "hint": "Spatial vs Temporal distinction."
  }
];

export default questions;
