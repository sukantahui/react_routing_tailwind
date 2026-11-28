export default [
  {
    "id": 1,
    "question": "In a 20-mark periodic test on Functions and Scope, what is the best strategy for tackling Section D (6-mark question)?",
    "options": [
      "Spend 15 minutes: write modular functions with clean names, docstrings, proper parameter handling, and return statements",
      "Skip Section D",
      "Write all code in one single line",
      "Only write comments"
    ],
    "correctAnswer": 0,
    "explanation": "Section D carries 30% of the paper marks; disciplined modular function design guarantees top marks.",
    "hint": "Modular functions with clean parameter handling and return statements."
  },
  {
    "id": 2,
    "question": "What is the difference between a Void Function and a Fruitful Function in Python?",
    "options": [
      "Fruitful functions return a meaningful value via 'return'; void functions do not return a value (implicitly returning None)",
      "Void functions run faster",
      "Fruitful functions only work with numbers",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Fruitful functions return values to the caller; void functions perform actions and return None.",
    "hint": "Returns a value vs returns None."
  },
  {
    "id": 3,
    "question": "Why should mutable default arguments (like def f(l=[])) be avoided in production Python code?",
    "options": [
      "Default argument objects are evaluated once at definition time, so mutations persist across subsequent calls unexpectedly",
      "They cause computer hardware crashes",
      "Python removes mutable arguments",
      "They only work on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "Mutable default arguments retain modifications across function calls, creating subtle state bugs.",
    "hint": "Default argument is evaluated once at definition time."
  },
  {
    "id": 4,
    "question": "What is the LEGB rule for identifier lookup order in Python?",
    "options": [
      "Local -> Enclosing -> Global -> Built-in",
      "Global -> Local -> Built-in -> Enclosing",
      "Built-in -> Global -> Enclosing -> Local",
      "Logical -> Equal -> Greater -> Below"
    ],
    "correctAnswer": 0,
    "explanation": "Python searches namespaces in strict LEGB order: Local, Enclosing, Global, Built-in.",
    "hint": "Local, Enclosing, Global, Built-in."
  },
  {
    "id": 5,
    "question": "What built-in function imports a module dynamically or inspects loaded modules?",
    "options": [
      "__import__() / importlib",
      "math.load()",
      "pickle.dump()",
      "sys.exit()"
    ],
    "correctAnswer": 0,
    "explanation": "__import__() and the importlib module handle programmatic module loading in Python.",
    "hint": "__import__() or importlib."
  },
  {
    "id": 6,
    "question": "What does the 'global' statement declare inside a function?",
    "options": [
      "It tells the compiler that a variable name refers to the module-level global namespace rather than creating a local variable",
      "It shares code over the internet",
      "It makes the function accessible from other computers",
      "It formats the hard disk"
    ],
    "correctAnswer": 0,
    "explanation": "'global x' binds x to the module-level global scope, allowing reassignments inside functions.",
    "hint": "Binds identifier to module-level global scope."
  },
  {
    "id": 7,
    "question": "What exception is raised when importing a non-existent module?",
    "options": [
      "ModuleNotFoundError",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to import a module that cannot be found on sys.path raises ModuleNotFoundError.",
    "hint": "ModuleNotFoundError."
  },
  {
    "id": 8,
    "question": "What is the result of random.randrange(1, 10, 2)?",
    "options": [
      "An odd integer among {1, 3, 5, 7, 9}",
      "An even integer among {2, 4, 6, 8, 10}",
      "Any float between 1.0 and 10.0",
      "Always 1"
    ],
    "correctAnswer": 0,
    "explanation": "randrange(start, stop, step) generates numbers following range() rules: step 2 gives odd numbers up to 9.",
    "hint": "Odd integer up to 9."
  },
  {
    "id": 9,
    "question": "What does statistics.median([10, 20, 30, 40]) return?",
    "options": [
      "25.0 (the average of the two middle values 20 and 30)",
      "20",
      "30",
      "100"
    ],
    "correctAnswer": 0,
    "explanation": "For an even number of elements, median returns the mean of the two middle values: (20 + 30) / 2 = 25.0.",
    "hint": "(20 + 30) / 2 = 25.0."
  },
  {
    "id": 10,
    "question": "What is the return type of a function that executes: return a, b, c?",
    "options": [
      "tuple",
      "list",
      "dict",
      "set"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple comma-separated return expressions are packed into a tuple.",
    "hint": "Tuple packing."
  },
  {
    "id": 11,
    "question": "In Python parameter matching, which of the following orders is legally valid?",
    "options": [
      "Positional arguments, followed by Default arguments, followed by *args",
      "Default arguments first, then positional arguments",
      "Keyword arguments first, then positional arguments",
      "*args first, then positional arguments"
    ],
    "correctAnswer": 0,
    "explanation": "Positional parameters must precede default parameters in function headers.",
    "hint": "Positional must precede default arguments."
  },
  {
    "id": 12,
    "question": "What happens when a list is passed into a function and modified with .pop()?",
    "options": [
      "The caller's original list is modified in-place because lists are mutable objects",
      "A new list is created",
      "The function crashes",
      "The list is deleted permanently"
    ],
    "correctAnswer": 0,
    "explanation": "In-place mutating methods like .pop() or .append() affect the caller's list object directly.",
    "hint": "Caller's list is modified in-place."
  },
  {
    "id": 13,
    "question": "What does the special attribute __name__ equal when a script is executed from the command line?",
    "options": [
      "'__main__'",
      "'main'",
      "'module'",
      "'script'"
    ],
    "correctAnswer": 0,
    "explanation": "When run directly, Python sets __name__ = '__main__'.",
    "hint": "'__main__'."
  },
  {
    "id": 14,
    "question": "What does math.factorial(5) return?",
    "options": [
      "120",
      "24",
      "720",
      "25"
    ],
    "correctAnswer": 0,
    "explanation": "5! = 5 * 4 * 3 * 2 * 1 = 120.",
    "hint": "5! = 120."
  },
  {
    "id": 15,
    "question": "What error occurs if you pass 3 arguments to a function defined as: def add(a, b): pass?",
    "options": [
      "TypeError: add() takes 2 positional arguments but 3 were given",
      "ValueError",
      "SyntaxError",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "Passing too many positional arguments triggers a TypeError.",
    "hint": "TypeError."
  },
  {
    "id": 16,
    "question": "What is a lambda function primarily used for?",
    "options": [
      "Short, throwaway anonymous functions used as keys in sorting or with map/filter",
      "Replacing all Python code",
      "Connecting to SQL databases",
      "Writing HTML pages"
    ],
    "correctAnswer": 0,
    "explanation": "Lambdas provide concise inline function objects, ideal for sorting keys and functional transforms.",
    "hint": "Short inline anonymous functions."
  },
  {
    "id": 17,
    "question": "What does math.sqrt(16) return?",
    "options": [
      "4.0 (a float)",
      "4 (an int)",
      "16",
      "2"
    ],
    "correctAnswer": 0,
    "explanation": "math.sqrt() returns a floating-point number (4.0).",
    "hint": "Returns a float 4.0."
  },
  {
    "id": 18,
    "question": "What is recursion?",
    "options": [
      "A programming technique where a function calls itself directly or indirectly to solve smaller subproblems",
      "A loop that never ends",
      "A function that has no parameters",
      "An operating system error"
    ],
    "correctAnswer": 0,
    "explanation": "Recursion is the process of a function calling itself until reaching a base condition.",
    "hint": "Function calling itself."
  },
  {
    "id": 19,
    "question": "What is the maximum default recursion limit in Python?",
    "options": [
      "Typically 1000 calls (customizable via sys.setrecursionlimit())",
      "10 calls",
      "100,000 calls",
      "Infinite"
    ],
    "correctAnswer": 0,
    "explanation": "Python sets a safeguard recursion depth of 1000 to prevent stack overflows.",
    "hint": "Around 1000 calls."
  },
  {
    "id": 20,
    "question": "What function in the random module returns a random element from a non-empty sequence?",
    "options": [
      "random.choice(seq)",
      "random.pick(seq)",
      "random.select(seq)",
      "random.sample(seq)"
    ],
    "correctAnswer": 0,
    "explanation": "random.choice(seq) selects and returns one random element from a sequence.",
    "hint": "random.choice(seq)."
  },
  {
    "id": 21,
    "question": "In CBSE board papers, why are students asked to underline corrected errors in debugging questions?",
    "options": [
      "To clearly show the examiner which syntax errors were fixed for step-marking credit",
      "To make the paper colorful",
      "Because CBSE requires it for scanning",
      "It is optional"
    ],
    "correctAnswer": 0,
    "explanation": "Underlining highlights fixes, ensuring the evaluator awards full step-marks without overlooking corrections.",
    "hint": "Ensures step-marks are awarded without ambiguity."
  },
  {
    "id": 22,
    "question": "What does the 'nonlocal' keyword do in Python 3?",
    "options": [
      "Binds an identifier to the nearest enclosing (outer non-global) scope",
      "Makes a variable global",
      "Deletes a variable",
      "Sends data over Wi-Fi"
    ],
    "correctAnswer": 0,
    "explanation": "'nonlocal' allows modifying variables in enclosing outer functions without making them global.",
    "hint": "Binds to nearest enclosing outer function scope."
  },
  {
    "id": 23,
    "question": "What does math.trunc(-3.7) return?",
    "options": [
      "-3",
      "-4",
      "-3.0",
      "3"
    ],
    "correctAnswer": 0,
    "explanation": "math.trunc() truncates the fractional part towards zero, returning -3.",
    "hint": "Truncates towards zero: -3."
  },
  {
    "id": 24,
    "question": "How does solving 10 timed periodic question sets prepare a student for the CBSE Board exam?",
    "options": [
      "Builds rigorous pacing, prevents careless syntax errors, reinforces marking scheme rubrics, and ensures a perfect 20/20",
      "Guarantees no more homework",
      "Replaces the board exam",
      "None of the above"
    ],
    "correctAnswer": 0,
    "explanation": "Repeated timed practice builds speed, precision, and alignment with official CBSE rubrics.",
    "hint": "Builds pacing, precision, and alignment with rubrics."
  },
  {
    "id": 25,
    "question": "What is the single most important rule when writing user-defined functions in board exams?",
    "options": [
      "Always verify parameter names, return types, indentation, and docstrings/comments",
      "Write everything inside a single while loop",
      "Never return values",
      "Avoid using function names"
    ],
    "correctAnswer": 0,
    "explanation": "Clean modular structure with proper parameters, indentation, and return types guarantees maximum marks.",
    "hint": "Clean parameters, return types, and indentation."
  }
];
