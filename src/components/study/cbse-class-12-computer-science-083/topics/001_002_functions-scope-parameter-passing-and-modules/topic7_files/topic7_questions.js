// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What does the acronym LEGB stand for in Python variable resolution?",
    "options": [
      "Local, Enclosing, Global, Built-in",
      "Logical, External, Global, Binary",
      "List, Element, Global, Byte",
      "Local, Extended, General, Built-in"
    ],
    "correctAnswer": 0,
    "explanation": "LEGB represents the strict search order: Local -> Enclosing -> Global -> Built-in.",
    "hint": "Local, Enclosing, Global, Built-in."
  },
  {
    "id": 2,
    "question": "In what sequential order does Python look up an unqualified variable name?",
    "options": [
      "L -> E -> G -> B",
      "B -> G -> E -> L",
      "G -> L -> E -> B",
      "L -> G -> E -> B"
    ],
    "correctAnswer": 0,
    "explanation": "Python inspects Local first, then Enclosing functions, then Global module level, and finally Built-ins.",
    "hint": "From innermost to outermost."
  },
  {
    "id": 3,
    "question": "What error is raised if an identifier cannot be found in any of the LEGB scopes?",
    "options": [
      "NameError: name '...' is not defined",
      "KeyError",
      "ValueError",
      "LookupError"
    ],
    "correctAnswer": 0,
    "explanation": "When a name is absent from Local, Enclosing, Global, and Built-in namespaces, Python raises `NameError`.",
    "hint": "Undefined identifier error."
  },
  {
    "id": 4,
    "question": "What is the Enclosing (E) scope?",
    "options": [
      "Names defined inside an outer function that encloses a nested inner function",
      "The entire computer network",
      "Operating system variables",
      "The main module"
    ],
    "correctAnswer": 0,
    "explanation": "Enclosing scope refers to the namespace of an outer enclosing function in nested definitions.",
    "hint": "Outer function in nested functions."
  },
  {
    "id": 5,
    "question": "What will happen if you define a variable named `len = 50` at the global level?",
    "options": [
      "It shadows the built-in `len()` function, causing subsequent `len([1, 2])` calls to raise TypeError",
      "It changes the length of the file",
      "Raises SyntaxError immediately",
      "Python renames it to len_"
    ],
    "correctAnswer": 0,
    "explanation": "Since Global scope (G) precedes Built-in scope (B), global `len = 50` masks built-in `len()`, raising `TypeError: 'int' object is not callable`.",
    "hint": "Shadowing built-in functions."
  },
  {
    "id": 6,
    "question": "What is the output of: `x = 'G'; def outer(): x = 'E'; def inner(): return x; return inner(); print(outer())`?",
    "options": [
      "E",
      "G",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`inner()` has no local `x`. It searches Enclosing scope and finds `x = 'E'`. Output: 'E'.",
    "hint": "Enclosing scope lookup."
  },
  {
    "id": 7,
    "question": "Which scope has the highest priority during name resolution?",
    "options": [
      "Local (L)",
      "Global (G)",
      "Enclosing (E)",
      "Built-in (B)"
    ],
    "correctAnswer": 0,
    "explanation": "Local scope is checked first; if an identifier is found locally, search terminates immediately.",
    "hint": "First checked scope."
  },
  {
    "id": 8,
    "question": "Which scope is checked as the final fallback before raising NameError?",
    "options": [
      "Built-in (B)",
      "Global (G)",
      "Enclosing (E)",
      "Local (L)"
    ],
    "correctAnswer": 0,
    "explanation": "Built-in scope is the final namespace checked in the LEGB hierarchy.",
    "hint": "Last scope before error."
  },
  {
    "id": 9,
    "question": "Which built-in module holds the Built-in scope?",
    "options": [
      "builtins",
      "sys",
      "os",
      "__main__"
    ],
    "correctAnswer": 0,
    "explanation": "The `builtins` module contains all built-in functions, exceptions, and constants.",
    "hint": "builtins module."
  },
  {
    "id": 10,
    "question": "What is the output of: `x = 10; def f(): return x; print(f())`?",
    "options": [
      "10",
      "None",
      "NameError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`f` has no local `x` and no enclosing function. It finds `x = 10` in Global scope.",
    "hint": "Global resolution."
  },
  {
    "id": 11,
    "question": "Can a function have multiple enclosing scopes?",
    "options": [
      "Yes, if functions are nested several levels deep (e.g. f1 inside f2 inside f3)",
      "No, maximum 1 enclosing scope",
      "Only in Python 2",
      "Causes StackOverflow"
    ],
    "correctAnswer": 0,
    "explanation": "Deeply nested functions search enclosing scopes outward from innermost to outermost enclosing parent.",
    "hint": "Multi-level nested functions."
  },
  {
    "id": 12,
    "question": "Which keyword is used inside a nested function to modify a variable in the Enclosing scope?",
    "options": [
      "nonlocal",
      "global",
      "outer",
      "enclosing"
    ],
    "correctAnswer": 0,
    "explanation": "The `nonlocal` keyword binds an identifier to the nearest enclosing function's scope.",
    "hint": "nonlocal keyword."
  },
  {
    "id": 13,
    "question": "What will `def outer(): x = 10; def inner(): nonlocal x; x += 5; inner(); return x; print(outer())` output?",
    "options": [
      "15",
      "10",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`nonlocal x` modifies the enclosing `x`, changing it from 10 to 15.",
    "hint": "nonlocal variable modification."
  },
  {
    "id": 14,
    "question": "What happens if you declare `nonlocal x` when no enclosing function defines `x`?",
    "options": [
      "SyntaxError: no binding for nonlocal 'x' found",
      "It creates a global variable",
      "Treated as None",
      "Passes silently"
    ],
    "correctAnswer": 0,
    "explanation": "`nonlocal` requires an existing variable in an enclosing scope; otherwise raises SyntaxError.",
    "hint": "nonlocal requirement."
  },
  {
    "id": 15,
    "question": "What is the output of: `def f(): return sum([1, 2]); print(f())`?",
    "options": [
      "3",
      "NameError",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`sum` is resolved in the Built-in scope (B) and returns 3.",
    "hint": "Built-in function lookup."
  },
  {
    "id": 16,
    "question": "What will `x = 5; def f(): x = x; f()` output?",
    "options": [
      "UnboundLocalError",
      "5",
      "None",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "The assignment `x = ...` marks `x` as local. Evaluating `x` on the RHS before assignment raises `UnboundLocalError`.",
    "hint": "RHS evaluation of uninitialized local."
  },
  {
    "id": 17,
    "question": "Does Python look into caller functions for variable resolution (dynamic scoping)?",
    "options": [
      "No, Python uses Lexical (Static) Scoping based on where code is written, not where it is called",
      "Yes, Python uses dynamic scoping",
      "Only with eval()",
      "Only in classes"
    ],
    "correctAnswer": 0,
    "explanation": "Python uses lexical (static) scoping determined by source code structure.",
    "hint": "Lexical static scoping."
  },
  {
    "id": 18,
    "question": "What is the output of: `a = 1; def f(): return a; def g(): a = 2; return f(); print(g())`?",
    "options": [
      "1",
      "2",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Due to lexical scoping, `f()` resolves `a` in its own lexical global scope (`a = 1`), NOT `g`'s local scope.",
    "hint": "Lexical scope vs caller scope."
  },
  {
    "id": 19,
    "question": "What is printed by: `x = 10; def f(): x = 20; print(x); f(); print(x)`?",
    "options": [
      "20 then 10",
      "20 then 20",
      "10 then 20",
      "10 then 10"
    ],
    "correctAnswer": 0,
    "explanation": "Inside `f()`, local `x = 20` is printed. In global scope, `x` remains 10.",
    "hint": "Local vs Global output."
  },
  {
    "id": 20,
    "question": "Which scope contains keywords like `if`, `def`, `while`?",
    "options": [
      "Keywords do not belong to any LEGB namespace—they are syntactic tokens recognized by the parser",
      "Built-in scope",
      "Global scope",
      "System scope"
    ],
    "correctAnswer": 0,
    "explanation": "Keywords are grammatical tokens parsed by the tokenizer, not variables in namespaces.",
    "hint": "Tokens vs Namespace objects."
  },
  {
    "id": 21,
    "question": "What is the output of: `def f(): a = 10; return a; print(f()); print(a)`?",
    "options": [
      "Prints 10, then raises NameError: name 'a' is not defined",
      "Prints 10 twice",
      "Prints None",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`f()` returns 10. `print(a)` in global scope crashes with `NameError` because `a` was local to `f()`.",
    "hint": "Local variable out of scope."
  },
  {
    "id": 22,
    "question": "What is the output of: `x = [1]; def f(): x.append(2); f(); print(x)`?",
    "options": [
      "[1, 2]",
      "[1]",
      "UnboundLocalError",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`x.append(2)` does not rebind `x` (no `=` assignment); it mutates the global list in-place.",
    "hint": "In-place mutation of global object."
  },
  {
    "id": 23,
    "question": "Why does `x.append(2)` work on global `x` without `global x`, but `x += [2]` can cause errors?",
    "options": [
      "append() is a method mutating the object; augmented assignment `+=` rebinds the target variable `x`",
      "They are identical",
      "append is faster",
      "Python forbids lists"
    ],
    "correctAnswer": 0,
    "explanation": "`x += [2]` is an assignment statement (`x = x + [2]`), which marks `x` as local unless `global` is declared.",
    "hint": "Rebinding vs in-place method call."
  },
  {
    "id": 24,
    "question": "What does `import builtins; dir(builtins)` show?",
    "options": [
      "All built-in functions, exceptions, and constants in the Built-in (B) scope",
      "File directories",
      "CPU memory",
      "History"
    ],
    "correctAnswer": 0,
    "explanation": "It lists all standard built-in identifiers provided by Python.",
    "hint": "Builtins directory list."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, why is LEGB rule tested in Section A MCQ questions?",
    "options": [
      "To evaluate whether students understand how Python searches nested scopes and avoids unintended variable shadowing",
      "It is easy to grade",
      "Only 1 mark is at stake",
      "Examiners prefer acronyms"
    ],
    "correctAnswer": 0,
    "explanation": "LEGB understanding is essential for writing bug-free modular code and accurately predicting output.",
    "hint": "Core pedagogical goal."
  }
];

export default questions;
