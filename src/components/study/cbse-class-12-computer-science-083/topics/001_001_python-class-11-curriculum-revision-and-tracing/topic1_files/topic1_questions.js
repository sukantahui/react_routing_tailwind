// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "What does 'Dynamic Typing' mean in Python?",
    "options": [
      "Variables must be declared with their types before assignment",
      "A variable can hold values of different data types at different times during execution",
      "Data types change automatically during arithmetic operations",
      "Variables cannot change their types once assigned"
    ],
    "correctAnswer": 1,
    "explanation": "Python variables are references to objects. Reassigning a variable simply points it to a new object of potentially a different type.",
    "hint": "No type declarations needed."
  },
  {
    "id": 2,
    "question": "Which of the following assignment statements violates the l-value requirement in Python?",
    "options": [
      "a = b + 10",
      "x + y = 25",
      "total[0] = 95",
      "name = 'Rohit'"
    ],
    "correctAnswer": 1,
    "explanation": "'x + y = 25' places an arithmetic expression on the left-hand side, raising 'SyntaxError: cannot assign to expression'.",
    "hint": "Expression on left of =."
  },
  {
    "id": 3,
    "question": "What will be the output of: `a, b = 5, 10; a, b = b, a + b; print(a, b)`?",
    "options": [
      "10 15",
      "10 20",
      "5 15",
      "15 10"
    ],
    "correctAnswer": 0,
    "explanation": "Python evaluates right-hand expressions first: b is 10, a + b is 5 + 10 = 15. Then it assigns: a = 10, b = 15.",
    "hint": "Evaluate RHS before binding LHS."
  },
  {
    "id": 4,
    "question": "Which built-in function returns the memory address (identity) of an object in Python?",
    "options": [
      "address()",
      "memory()",
      "id()",
      "location()"
    ],
    "correctAnswer": 2,
    "explanation": "`id()` returns the identity of an object, guaranteed to be unique and constant for this object during its lifetime.",
    "hint": "Two-letter function name."
  },
  {
    "id": 5,
    "question": "What is the result of `10 = x` in Python?",
    "options": [
      "Assigns 10 to variable x",
      "Raises SyntaxError: cannot assign to literal",
      "Raises ValueError",
      "Assigns None to x"
    ],
    "correctAnswer": 1,
    "explanation": "A numeric literal is not a valid l-value and cannot appear on the left of an assignment operator.",
    "hint": "Literal on LHS."
  },
  {
    "id": 6,
    "question": "What is the output of `x = 256; y = 256; print(x is y)` in standard Python?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "CPython pre-allocates and caches small integers between -5 and 256, so both x and y reference the same cached object.",
    "hint": "Integer caching range."
  },
  {
    "id": 7,
    "question": "Which statement is valid for simultaneous assignment?",
    "options": [
      "a = b = c = 50",
      "a, b = 10",
      "a, b, c = 1, 2",
      "a, b = 1, 2, 3"
    ],
    "correctAnswer": 0,
    "explanation": "`a = b = c = 50` is a chained assignment binding all three names to the same object. The others raise ValueError due to unpacking mismatches.",
    "hint": "Chained assignment syntax."
  },
  {
    "id": 8,
    "question": "What error occurs if you run `p, q = 10, 20, 30`?",
    "options": [
      "TypeError",
      "ValueError: too many values to unpack (expected 2)",
      "SyntaxError",
      "IndexError"
    ],
    "correctAnswer": 1,
    "explanation": "The right-hand side tuple has 3 elements but only 2 variables are provided on the left, causing ValueError.",
    "hint": "Unpacking count mismatch."
  },
  {
    "id": 9,
    "question": "Which of the following is an augmented assignment equivalent to `k = k * (x + y)`?",
    "options": [
      "k *= x + y",
      "k =* x + y",
      "k **= x + y",
      "k = k * x + y"
    ],
    "correctAnswer": 0,
    "explanation": "`k *= x + y` groups the entire RHS expression before multiplication.",
    "hint": "Operator precedence in augmented assignment."
  },
  {
    "id": 10,
    "question": "When does an unreferenced object in Python get cleaned up from memory?",
    "options": [
      "When Python crashes",
      "By Python's automatic garbage collector when reference count reaches 0",
      "At midnight",
      "Only when explicitly calling delete()"
    ],
    "correctAnswer": 1,
    "explanation": "Python uses reference counting and a cyclic garbage collector to reclaim memory when an object's reference count drops to 0.",
    "hint": "Automatic memory management."
  },
  {
    "id": 11,
    "question": "What is the output of `x = 10; x += 5; print(x)`?",
    "options": [
      "15",
      "10",
      "5",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "x += 5 increments x by 5, resulting in 15.",
    "hint": "Basic augmented addition."
  },
  {
    "id": 12,
    "question": "Can a list element be used as an l-value (e.g. `L[0] = 100`)?",
    "options": [
      "Yes, because lists are mutable and support item assignment",
      "No, lists are immutable",
      "Only if L has length 1",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Lists are mutable and their items are valid assignable l-values.",
    "hint": "Mutable subscript assignment."
  },
  {
    "id": 13,
    "question": "What is the output of: `a = [1, 2]; b = a; b.append(3); print(a)`?",
    "options": [
      "[1, 2]",
      "[1, 2, 3]",
      "SyntaxError",
      "[3]"
    ],
    "correctAnswer": 1,
    "explanation": "`b = a` assigns the reference. Both `a` and `b` point to the exact same list in memory. Modifying `b` reflects in `a`.",
    "hint": "Shared reference in mutable objects."
  },
  {
    "id": 14,
    "question": "What is the result of `a = 10; b = a; b = 20; print(a)`?",
    "options": [
      "20",
      "10",
      "None",
      "Raises UnboundLocalError"
    ],
    "correctAnswer": 1,
    "explanation": "Integers are immutable. Reassigning `b = 20` binds `b` to a new integer object, leaving `a` referencing `10`.",
    "hint": "Immutable reassignment."
  },
  {
    "id": 15,
    "question": "Which keyword is used to delete a variable reference in Python?",
    "options": [
      "remove",
      "del",
      "clear",
      "dispose"
    ],
    "correctAnswer": 1,
    "explanation": "`del` statement removes a variable binding from the namespace.",
    "hint": "3-letter keyword."
  },
  {
    "id": 16,
    "question": "What happens if you use a variable before assigning it any value in Python?",
    "options": [
      "It defaults to None",
      "It defaults to 0",
      "Raises NameError: name '...' is not defined",
      "Raises SyntaxError"
    ],
    "correctAnswer": 2,
    "explanation": "Python variables must be assigned a value before use. Referencing an unassigned name raises NameError.",
    "hint": "Not defined exception."
  },
  {
    "id": 17,
    "question": "Which statement evaluates to True if `x` and `y` reference the same memory address?",
    "options": [
      "x == y",
      "x is y",
      "x equals y",
      "id(x) != id(y)"
    ],
    "correctAnswer": 1,
    "explanation": "The `is` identity operator returns True if and only if `id(x) == id(y)`.",
    "hint": "Identity comparison."
  },
  {
    "id": 18,
    "question": "What will `a = b = 10; b += 5; print(a, b)` print?",
    "options": [
      "10 15",
      "15 15",
      "10 10",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Integers are immutable. `b += 5` creates a new integer 15 and re-binds `b`. `a` still points to 10.",
    "hint": "Immutable reassignment."
  },
  {
    "id": 19,
    "question": "What does `type(x) == int` check?",
    "options": [
      "Checks whether the variable x is an integer object",
      "Converts x to integer",
      "Raises error",
      "Checks if x is positive"
    ],
    "correctAnswer": 0,
    "explanation": "It checks if the runtime type of the object referred to by x is 'int'.",
    "hint": "Type checking."
  },
  {
    "id": 20,
    "question": "What error is produced by `a, b = 10`?",
    "options": [
      "ValueError: cannot unpack non-iterable int object",
      "TypeError",
      "SyntaxError",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "An integer is not iterable, so multiple assignment unpacking raises TypeError/ValueError.",
    "hint": "Cannot unpack non-iterable."
  },
  {
    "id": 21,
    "question": "In `x = y = z = [10]`, how many list objects are created in memory?",
    "options": [
      "1",
      "3",
      "0",
      "Depends on OS"
    ],
    "correctAnswer": 0,
    "explanation": "Only one list object `[10]` is created; `x`, `y`, and `z` all point to this single list reference.",
    "hint": "Single object allocation."
  },
  {
    "id": 22,
    "question": "If `x = 5`, what happens to the integer 5 when `x = 20`?",
    "options": [
      "It is permanently erased",
      "Its reference count decrements by 1",
      "It becomes a float",
      "It is stored in x"
    ],
    "correctAnswer": 1,
    "explanation": "The reference count of the integer object 5 decrements by 1. Since it's a small integer, Python keeps it cached.",
    "hint": "Reference counting."
  },
  {
    "id": 23,
    "question": "What is an r-value?",
    "options": [
      "A variable name",
      "A read-value or expression that produces a value",
      "A reserved keyword",
      "A function definition"
    ],
    "correctAnswer": 1,
    "explanation": "An r-value is an expression or literal that evaluates to a value and can be assigned to an l-value.",
    "hint": "Right-hand side value."
  },
  {
    "id": 24,
    "question": "Which statement will swap two variables `p` and `q` in one line?",
    "options": [
      "swap(p, q)",
      "p, q = q, p",
      "p = q; q = p",
      "p == q"
    ],
    "correctAnswer": 1,
    "explanation": "`p, q = q, p` leverages tuple packing and unpacking to swap values without a temporary variable.",
    "hint": "Pythonic tuple swap."
  },
  {
    "id": 25,
    "question": "Why does `print(id(5) == id(5))` evaluate to True?",
    "options": [
      "Because both represent the identical integer literal in CPython memory pool",
      "Because id returns a string",
      "By random chance",
      "Because 5 is a prime number"
    ],
    "correctAnswer": 0,
    "explanation": "Literal integers have a fixed memory address during program runtime.",
    "hint": "Constant memory address."
  }
];

export default questions;
