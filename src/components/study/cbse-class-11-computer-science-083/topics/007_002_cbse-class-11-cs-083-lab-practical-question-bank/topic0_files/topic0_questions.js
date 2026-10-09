const questions = [
  {
    id: 1,
    question: "What is the official CBSE Class XI Computer Science (083) practical examination marks distribution?",
    options: [
      "Total 30 Marks: Lab Test (Python Program: 12 Marks) + Report File (min 20 programs: 7 Marks) + Project (3 Marks) + Viva Voce (8 Marks)",
      "Total 50 Marks: Theory only",
      "Total 20 Marks: Viva only",
      "Total 100 Marks: Lab exam only"
    ],
    correctAnswer: 0,
    explanation: "CBSE prescribes a 30-mark practical examination: 12 Marks for Lab Test (Python Problem Solving), 7 Marks for Practical Report File (minimum 20 programs), 3 Marks for Term Project, and 8 Marks for Viva Voce.",
    hint: "12M Lab Program + 7M Report File + 3M Project + 8M Viva = 30 Marks."
  },
  {
    id: 2,
    question: "How many Python programs are statutory required in the CBSE Class XI practical report file?",
    options: [
      "Minimum 20 Python programs as prescribed by CBSE",
      "Only 5 programs",
      "Exactly 50 programs",
      "No programs required"
    ],
    correctAnswer: 0,
    explanation: "CBSE regulations mandate that every Class XI CS student must submit a signed laboratory report file containing a minimum of 20 verified Python programs.",
    hint: "Minimum 20 Python programs."
  },
  {
    id: 3,
    question: "Viva Question: Why is Euclid's Algorithm faster than brute-force divisor checking for finding the GCD of two large integers?",
    options: [
      "Because Euclid's Algorithm replaces subtraction with the modulo operator ($a \\pmod b$), reducing the problem size logarithmically in $O(\\log(\\min(a, b)))$ time",
      "Because it skips all odd numbers",
      "Because it uses multi-threading on GPUs",
      "Because it runs in hardware ROM"
    ],
    correctAnswer: 0,
    explanation: "Euclid's Modulo Algorithm rapidly converges by replacing $(a, b)$ with $(b, a \pmod b)$, achieving $O(\log N)$ logarithmic time complexity compared to $O(N)$ linear trial division.",
    hint: "Logarithmic time complexity via modulo reduction."
  },
  {
    id: 4,
    question: "Viva Question: What is an Armstrong Number?",
    options: [
      "A number that equals the sum of its own digits each raised to the power of the total number of digits (e.g., $153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$)",
      "A prime number with 10 digits",
      "A negative integer",
      "A number divisible by 7"
    ],
    correctAnswer: 0,
    explanation: "An $n$-digit integer is an Armstrong number if the sum of the $n$-th power of its digits equals the number itself (e.g. 153, 370, 371, 407).",
    hint: "Sum of digits raised to the power of total digits."
  },
  {
    id: 5,
    question: "Viva Question: What is a Perfect Number?",
    options: [
      "A positive integer that is equal to the sum of its proper positive divisors (excluding the number itself, e.g. $6 = 1 + 2 + 3$, $28 = 1 + 2 + 4 + 7 + 14$)",
      "A number divisible by 10",
      "Any floating point number",
      "A prime number"
    ],
    correctAnswer: 0,
    explanation: "A Perfect Number is a number that equals the sum of its proper positive divisors (e.g. $28 = 1 + 2 + 4 + 7 + 14$).",
    hint: "Sum of proper divisors equals the number itself."
  },
  {
    id: 6,
    question: "Viva Question: How does string slicing `s[::-1]` reverse a string in Python?",
    options: [
      "By setting the step size to `-1`, Python traverses the sequence in reverse direction from the last element to the first",
      "By inverting the binary memory bits",
      "By sorting the characters in descending order",
      "By calling an external C library"
    ],
    correctAnswer: 0,
    explanation: "In extended slice syntax `[start:stop:step]`, omitting start and stop with a step of `-1` instructs the interpreter to traverse backward from the end to the beginning.",
    hint: "Negative step traverses backward."
  },
  {
    id: 7,
    question: "Viva Question: What is the difference between a shallow copy and a deep copy in Python lists?",
    options: [
      "A shallow copy (`list.copy()`) creates a new container but references the same nested objects; a deep copy (`copy.deepcopy()`) recursively clones all nested objects independently.",
      "A shallow copy only copies strings; a deep copy copies numbers.",
      "There is no difference in Python.",
      "A shallow copy is faster but deletes the original list."
    ],
    correctAnswer: 0,
    explanation: "Shallow copies clone outer list structure only (nested lists still share references); deep copies clone the full recursive object hierarchy.",
    hint: "Shallow copies outer structure; deep copies recursive nested objects."
  },
  {
    id: 8,
    question: "Viva Question: What is the time complexity of searching an element in a Python dictionary by key?",
    options: [
      "O(1) Average Constant Time (due to hash table indexing)",
      "O(N) Linear Time",
      "O(N²) Quadratic Time",
      "O(log N) Logarithmic Time"
    ],
    correctAnswer: 0,
    explanation: "Python dictionaries use hash tables where key lookup computes the hash directly to locate the memory bucket in average $O(1)$ constant time.",
    hint: "O(1) average constant time via hash tables."
  },
  {
    id: 9,
    question: "Viva Question: Why are tuples preferred over lists for dictionary keys in Python?",
    options: [
      "Because tuples are immutable and therefore hashable, whereas lists are mutable and cannot be hashed (`TypeError: unhashable type: 'list'`)",
      "Because tuples take more RAM",
      "Because tuples sort faster",
      "Because lists cannot hold numbers"
    ],
    correctAnswer: 0,
    explanation: "Dictionary keys must be hashable (immutable). Tuples are immutable and hashable, while mutable lists raise a `TypeError` if used as keys.",
    hint: "Dictionary keys must be immutable and hashable."
  },
  {
    id: 10,
    question: "Viva Question: What is the role of `math.isqrt(n)` in prime checking algorithms?",
    options: [
      "It computes the exact integer square root $\\lfloor \\sqrt{n} \\rfloor$, establishing the maximum necessary trial factor limit",
      "It multiplies numbers by 2",
      "It converts floats to strings",
      "It generates prime numbers automatically"
    ],
    correctAnswer: 0,
    explanation: "If a composite number $n$ has a factor, at least one factor must be $\le \sqrt{n}$. Limiting the loop to $\\text{isqrt}(n)$ reduces loop iterations from $n$ to $\sqrt{n}$.",
    hint: "Limits trial division to sqrt(n)."
  },
  {
    id: 11,
    question: "Viva Question: What is the difference between `list.append(x)` and `list.extend(iterable)`?",
    options: [
      "`append(x)` adds $x$ as a single element at the end; `extend(iterable)` iterates over the argument and appends each element individually.",
      "`append` works only on numbers; `extend` works on strings.",
      "`append` creates a new list; `extend` modifies in place.",
      "They are identical aliases."
    ],
    correctAnswer: 0,
    explanation: "`append([1, 2])` creates a nested sublist `[..., [1, 2]]`, whereas `extend([1, 2])` unpacks and adds elements individually `[..., 1, 2]`.",
    hint: "append adds item as-is; extend unpacks and appends each element."
  },
  {
    id: 12,
    question: "Viva Question: How does Python's `math.gcd(a, b)` function handle negative input values?",
    options: [
      "It returns the greatest common divisor as a positive integer (the absolute GCD)",
      "It raises a ValueError",
      "It returns a negative number",
      "It returns zero"
    ],
    correctAnswer: 0,
    explanation: "In Python standard library `math.gcd()`, GCD is defined as the greatest positive common divisor, so `math.gcd(-48, 18)` returns positive `6`.",
    hint: "Always returns a positive integer."
  },
  {
    id: 13,
    question: "Viva Question: What is the output of `dict.get(key, default)` if the key is missing from the dictionary?",
    options: [
      "It returns the provided `default` value without raising a KeyError",
      "It raises a KeyError crash",
      "It deletes the dictionary",
      "It inserts a None key"
    ],
    correctAnswer: 0,
    explanation: "`dict.get('missing', 0)` returns `0` safely without raising a `KeyError`.",
    hint: "get() returns the fallback default value safely."
  },
  {
    id: 14,
    question: "Viva Question: What is the purpose of the `random.seed()` function in testing simulation programs?",
    options: [
      "It initializes the pseudorandom number generator with a deterministic seed, ensuring reproducible random sequences for testing and grading",
      "It speeds up CPU clock cycles",
      "It encrypts random numbers",
      "It generates prime numbers"
    ],
    correctAnswer: 0,
    explanation: "Setting `random.seed(42)` makes pseudorandom number generation deterministic and reproducible across multiple test runs.",
    hint: "Produces deterministic, reproducible random sequences."
  },
  {
    id: 15,
    question: "Viva Question: What is the difference between `str.isdigit()` and `str.isnumeric()`?",
    options: [
      "`isdigit()` checks for standard digits 0–9; `isnumeric()` also includes Unicode numeric characters (fractions, subscripts, Roman numerals)",
      "They are identical functions.",
      "`isdigit()` works on floats; `isnumeric()` on integers.",
      "`isdigit()` is deprecated in Python 3."
    ],
    correctAnswer: 0,
    explanation: "`isnumeric()` is broader and returns True for Unicode superscript digits, vulgar fractions (½), and specialized numeric symbols.",
    hint: "isnumeric() supports broader Unicode numeric glyphs."
  },
  {
    id: 16,
    question: "Viva Question: How does list comprehension improve code compared to traditional `for` loops?",
    options: [
      "It provides a concise, readable one-line syntax for creating lists and executes faster at the C-level bytecode optimization in CPython",
      "It uses less RAM",
      "It makes lists immutable",
      "It prevents index errors"
    ],
    correctAnswer: 0,
    explanation: "List comprehensions `[x**2 for x in nums]` are concise and execute faster than explicit loop `.append()` calls because bytecode loop construction is optimized in C.",
    hint: "Concise syntax and faster C-level bytecode execution."
  },
  {
    id: 17,
    question: "Viva Question: What does the built-in `zip()` function do when passed two lists of unequal length?",
    options: [
      "It pairs elements until the shortest list is exhausted and truncates any excess elements",
      "It raises a ValueError",
      "It pads missing elements with None",
      "It crashes with IndexError"
    ],
    correctAnswer: 0,
    explanation: "Standard `zip(list1, list2)` terminates as soon as the shortest iterable is exhausted.",
    hint: "Stops at the length of the shortest iterable."
  },
  {
    id: 18,
    question: "Viva Question: What is the difference between `list.sort()` and the built-in `sorted(iterable)` function?",
    options: [
      "`list.sort()` sorts the list in place and returns `None`; `sorted(iterable)` returns a new sorted list without modifying the original iterable.",
      "`list.sort()` works on tuples; `sorted()` on lists.",
      "`list.sort()` sorts descending; `sorted()` sorts ascending.",
      "They are identical."
    ],
    correctAnswer: 0,
    explanation: "`lst.sort()` is an in-place mutating method returning `None`; `sorted(lst)` is a built-in function returning a brand new list.",
    hint: "list.sort() modifies in place; sorted() returns a new list."
  },
  {
    id: 19,
    question: "Viva Question: How do you swap two variables in Python without using a third temporary variable?",
    options: [
      "`a, b = b, a` (using tuple packing and unpacking)",
      "`a = b; b = a`",
      "`swap(a, b)`",
      "`a + b = b + a`"
    ],
    correctAnswer: 0,
    explanation: "`a, b = b, a` evaluates the right side into a temporary tuple `(b, a)` and unpacks simultaneously into `a` and `b`.",
    hint: "a, b = b, a."
  },
  {
    id: 20,
    question: "Viva Question: What is the time complexity of linear search on a list of N elements?",
    options: ["O(N) in the worst case (target at the end or not present)", "O(1)", "O(N²)", "O(log N)"],
    correctAnswer: 0,
    explanation: "Linear search checks each element one by one from index 0 to N-1, requiring $N$ comparisons in the worst case ($O(N)$).",
    hint: "O(N) linear time complexity."
  },
  {
    id: 21,
    question: "Viva Question: What happens if you pass a negative step value to `range()` without adjusting start and stop values (`range(10, 0, -2)`)?",
    options: [
      "It generates integers stepping downwards: `[10, 8, 6, 4, 2]`",
      "It raises a ValueError",
      "It generates an empty range",
      "It crashes the interpreter"
    ],
    correctAnswer: 0,
    explanation: "With start=10, stop=0, step=-2, it counts downward: 10, 8, 6, 4, 2.",
    hint: "Generates decreasing sequence down to stop + 1."
  },
  {
    id: 22,
    question: "Viva Question: What is an algorithm's Space Complexity?",
    options: [
      "The total amount of memory (RAM storage) required by an algorithm to execute to completion relative to the input size N",
      "The disk storage size of the .py file",
      "The number of lines of code",
      "The monitor screen resolution"
    ],
    correctAnswer: 0,
    explanation: "Space Complexity measures total auxiliary memory and data structures required as input size grows.",
    hint: "Auxiliary memory required during execution."
  },
  {
    id: 23,
    question: "Viva Question: What is the result of `statistics.mean([10, 20, 30, 40, 50])`?",
    options: ["30", "25", "35", "150"],
    correctAnswer: 0,
    explanation: "The arithmetic mean is $(10+20+30+40+50)/5 = 150/5 = 30$.",
    hint: "Sum divided by count = 150/5 = 30."
  },
  {
    id: 24,
    question: "Viva Question: How do you remove duplicate elements from a Python list while ignoring order?",
    options: [
      "`list(set(original_list))`",
      "`original_list.unique()`",
      "`original_list.distinct()`",
      "`delete duplicates`"
    ],
    correctAnswer: 0,
    explanation: "Converting a list to a `set` eliminates all duplicate items automatically, and converting back to `list` produces a deduplicated collection.",
    hint: "Convert to set and back to list."
  },
  {
    id: 25,
    question: "Viva Question: Why is code modularization into functions (`def`) recommended in CBSE practical lab programming?",
    options: [
      "It enhances code readability, facilitates unit testing, enables code reusability, and isolates variables within local scope",
      "It makes the program run on GPUs",
      "It eliminates the need for Python variables",
      "It bypasses the Python interpreter"
    ],
    correctAnswer: 0,
    explanation: "Functions break complex tasks into modular, reusable, testable blocks with localized scope.",
    hint: "Readability, reusability, modular testing, and clean scoping."
  }
];

export default questions;
