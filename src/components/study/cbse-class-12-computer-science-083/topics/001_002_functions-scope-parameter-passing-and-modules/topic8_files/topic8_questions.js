// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "Which keyword allows modifying a global variable from inside a function?",
    "options": [
      "global",
      "nonlocal",
      "extern",
      "public"
    ],
    "correctAnswer": 0,
    "explanation": "The `global` statement tells Python that an identifier refers to the module-level global variable.",
    "hint": "global keyword."
  },
  {
    "id": 2,
    "question": "What error occurs in: `x = 10; def f(): print(x); x = 20; f()`?",
    "options": [
      "UnboundLocalError: cannot access local variable 'x'",
      "10",
      "20",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "The assignment `x = 20` marks `x` as local. Reading `x` in `print(x)` before assignment raises `UnboundLocalError`.",
    "hint": "Classic UnboundLocalError."
  },
  {
    "id": 3,
    "question": "Can a global variable be modified without the `global` keyword if it is an immutable integer?",
    "options": [
      "No, rebinding an immutable variable requires the global keyword",
      "Yes, using +=",
      "Only inside loops",
      "Yes, always"
    ],
    "correctAnswer": 0,
    "explanation": "Rebinding an immutable variable requires an assignment operator (`=`), which creates a local variable unless `global` is declared.",
    "hint": "Rebinding requires global."
  },
  {
    "id": 4,
    "question": "What will `a = 5; def f(): global a; a = 10; f(); print(a)` output?",
    "options": [
      "10",
      "5",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The `global a` statement instructs Python to modify the global variable `a`, changing it from 5 to 10.",
    "hint": "Global modification."
  },
  {
    "id": 5,
    "question": "Can a function create a brand-new global variable from inside its body?",
    "options": [
      "Yes, declaring `global new_var` inside a function creates it in global scope upon assignment",
      "No, globals must be declared at top-level",
      "Only in Python 2",
      "Causes NameError"
    ],
    "correctAnswer": 0,
    "explanation": "If `global x` is declared and assigned inside a function, `x` is added directly to the module's global namespace.",
    "hint": "Dynamic global creation."
  },
  {
    "id": 6,
    "question": "Where must the `global` statement be positioned inside a function?",
    "options": [
      "At the beginning of the function body before the variable is used or assigned",
      "At the very end of the function",
      "In the function header",
      "Outside the function"
    ],
    "correctAnswer": 0,
    "explanation": "The `global` declaration must precede any usage or assignment of the specified identifier in that suite.",
    "hint": "Prior declaration."
  },
  {
    "id": 7,
    "question": "What is printed by: `x = 10; def f(): global x; x += 5; f(); f(); print(x)`?",
    "options": [
      "20",
      "15",
      "10",
      "25"
    ],
    "correctAnswer": 0,
    "explanation": "Initial x=10. First call adds 5 -> x=15. Second call adds 5 -> x=20.",
    "hint": "Cumulative global modification."
  },
  {
    "id": 8,
    "question": "Can multiple global variables be declared in one statement?",
    "options": [
      "Yes, separated by commas (e.g. `global a, b, c`)",
      "No, each requires a separate line",
      "Only up to 2",
      "Causes SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Comma-separated identifiers are valid in a single global declaration: `global a, b, c`.",
    "hint": "Comma-separated global names."
  },
  {
    "id": 9,
    "question": "What will `def f(): global x; x = 99; f(); print(x)` output?",
    "options": [
      "99",
      "NameError",
      "None",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`x` is created as a global variable with value 99 and is accessible outside `f()`.",
    "hint": "Created global accessed outside."
  },
  {
    "id": 10,
    "question": "What is the output of: `x = 5; def f(x): global x; x = 10; f(20)`?",
    "options": [
      "SyntaxError: name 'x' is parameter and global",
      "10",
      "5",
      "20"
    ],
    "correctAnswer": 0,
    "explanation": "A formal parameter cannot be declared `global` in the same function; Python raises `SyntaxError: name 'x' is parameter and global`.",
    "hint": "Parameter and global conflict."
  },
  {
    "id": 11,
    "question": "What will `total = 0; def add(n): global total; total += n; add(10); add(20); print(total)` output?",
    "options": [
      "30",
      "10",
      "20",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "`total` accumulates 10 + 20 = 30 across calls.",
    "hint": "Global accumulator."
  },
  {
    "id": 12,
    "question": "Is `global` required to read the value of a global list (e.g. `print(my_list[0])`)?",
    "options": [
      "No, reading does not require the global statement",
      "Yes, all access requires global",
      "Only if list is empty",
      "Causes TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Reading global objects never requires the `global` keyword.",
    "hint": "Read access doesn't need global."
  },
  {
    "id": 13,
    "question": "Is `global` required to append an element to a global list (e.g. `my_list.append(10)`)?",
    "options": [
      "No, because append() mutates the list in-place and does not rebind the variable name",
      "Yes, because the list changes",
      "Only if called in a loop",
      "Raises UnboundLocalError"
    ],
    "correctAnswer": 0,
    "explanation": "In-place mutating methods modify the existing object without re-binding the name, so `global` is not required.",
    "hint": "Mutation vs Rebinding."
  },
  {
    "id": 14,
    "question": "What will happen if you write `global a = 10` in a single line?",
    "options": [
      "SyntaxError: invalid syntax",
      "Assigns 10 to global a",
      "Creates local a",
      "Passes silently"
    ],
    "correctAnswer": 0,
    "explanation": "The `global` statement does not permit assignment on the same declaration line; `global a; a = 10` is required.",
    "hint": "No assignment in global statement."
  },
  {
    "id": 15,
    "question": "What is the output of: `p = 2; def f(): p = 4; print(p, end=' '); f(); print(p)`?",
    "options": [
      "4 2",
      "4 4",
      "2 4",
      "2 2"
    ],
    "correctAnswer": 0,
    "explanation": "Local `p = 4` is printed inside `f()`. Global `p` remains 2 in the outer scope: output is `4 2`.",
    "hint": "Local shadowing trace."
  },
  {
    "id": 16,
    "question": "Can a `global` declaration be used at the module top level outside any function?",
    "options": [
      "Yes, but it is redundant since top-level variables are already global",
      "No, causes SyntaxError",
      "It crashes the interpreter",
      "Makes variables private"
    ],
    "correctAnswer": 0,
    "explanation": "Using `global` at top level is harmlessly redundant; the variable is already in global scope.",
    "hint": "Top-level redundancy."
  },
  {
    "id": 17,
    "question": "What will `a = 1; def f(): a = 2; def g(): global a; a = 3; g(); f(); print(a)` output?",
    "options": [
      "3",
      "1",
      "2",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`g()` modifies global `a` to 3. `f()`'s local `a` does not affect global `a`. Global `a` is 3.",
    "hint": "Nested function global rebinding."
  },
  {
    "id": 18,
    "question": "What is the output of: `x = 10; def f(): x = 20; return x; print(f(), x)`?",
    "options": [
      "20 10",
      "20 20",
      "10 10",
      "10 20"
    ],
    "correctAnswer": 0,
    "explanation": "`f()` returns local `x` (20), while global `x` remains 10.",
    "hint": "Return value vs global state."
  },
  {
    "id": 19,
    "question": "Why should software engineers minimize modifying global variables from functions?",
    "options": [
      "Functions with side-effects on global state are unpredictable, hard to test, and non-modular",
      "Globals use too much RAM",
      "Globals are deprecated in Python 3.12",
      "Globals cannot store numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Modifying global state creates hidden side-effects and breaks functional purity.",
    "hint": "Side-effects & testing."
  },
  {
    "id": 20,
    "question": "What is printed by: `x = 5; def f(): global x; del x; f(); print('x' in globals())`?",
    "options": [
      "False",
      "True",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`del x` inside `f()` deletes global variable `x`, so `'x' in globals()` is False.",
    "hint": "Deleting global variable."
  },
  {
    "id": 21,
    "question": "What is the output of: `val = 1; def f(): global val; val += 1; def g(): global val; val *= 2; f(); g(); print(val)`?",
    "options": [
      "4",
      "2",
      "3",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "val starts at 1; `f()` increments to 2; `g()` multiplies by 2 to 4.",
    "hint": "Sequential global modifications."
  },
  {
    "id": 22,
    "question": "What does `UnboundLocalError` specifically indicate in CBSE exam questions?",
    "options": [
      "A local variable was referenced before it was assigned a value",
      "A file was not found",
      "A module was missing",
      "A syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "It indicates that a variable marked local in a function was accessed before any local assignment.",
    "hint": "Referenced before assignment."
  },
  {
    "id": 23,
    "question": "What is the output of: `x = 7; def f(): return x; x = 9; print(f())`?",
    "options": [
      "9",
      "7",
      "NameError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "When `f()` is executed, global `x` has already been updated to 9, so it returns 9.",
    "hint": "Runtime global resolution."
  },
  {
    "id": 24,
    "question": "Can a function have both local and global variables with different names?",
    "options": [
      "Yes, functions routinely combine local variables with global references",
      "No, all variables must be of same scope",
      "Only 1 local variable allowed",
      "Causes NameCollision"
    ],
    "correctAnswer": 0,
    "explanation": "A function can freely use local variables alongside global variable declarations.",
    "hint": "Standard mixed usage."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the #1 question asked about the `global` keyword?",
    "options": [
      "'What keyword is used to modify a global variable from inside a function?' -> Answer: global",
      "'How to delete variables'",
      "'What is print'",
      "'How to write loops'"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE board question papers routinely test the exact definition and usage of the `global` keyword.",
    "hint": "Essential 1-mark question."
  }
];

export default questions;
