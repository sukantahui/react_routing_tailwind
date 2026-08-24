// src/components/study/python/topics/003_005_advance-comprehensions/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Readability guidelines: When to use comprehensions vs loops

const questions = [
  {
    question: "What core 'Zen of Python' aphorism is most frequently cited when evaluating comprehensions?",
    shortAnswer: "'Readability counts.' If a comprehension is difficult to read, understand, or debug at a glance, it should be refactored into a clear procedural loop.",
    explanation: "Readability takes precedence over clever one-liners.",
    hint: "Readability counts; simple is better than complex.",
    level: "basic",
    codeExample: "# Prioritize readability over cleverness"
  },
  {
    question: "What is the '2-Clause Threshold Rule' for writing maintainable comprehensions?",
    shortAnswer: "A comprehension should generally have at most 2 clauses (e.g. 1 'for' and 1 'if', or 2 'for' loops); anything exceeding 2 clauses should be refactored into a procedural loop.",
    explanation: "Empirical software engineering guideline.",
    hint: "Limit to max 2 clauses (1 for + 1 if, or 2 for loops).",
    level: "basic",
    codeExample: "[x * 2 for x in seq if x > 0] # Good: 2 clauses max"
  },
  {
    question: "Why is using a list comprehension solely for side-effects (e.g. '[print(x) for x in seq]') considered an anti-pattern?",
    shortAnswer: "Because it constructs and stores an unnecessary list of '[None, None, ...]' in memory that is immediately discarded, wasting RAM and confusing readers who expect comprehensions to produce usable data.",
    explanation: "Comprehensions are for constructing data, not executing side-effects.",
    hint: "It wastes memory building a useless list of [None, None, ...] that is immediately discarded.",
    level: "basic",
    codeExample: "# BAD: [audit(x) for x in items] -> GOOD: for x in items: audit(x)"
  },
  {
    question: "Can a Python comprehension contain a 'try...except' block directly?",
    shortAnswer: "No. Python grammar does not permit statements like 'try...except' inside expressions; to handle exceptions, you must either use a helper function or refactor to a standard 'for' loop.",
    explanation: "Comprehensions are pure expressions, not statement blocks.",
    hint: "No, try...except cannot be used inside comprehension expressions.",
    level: "basic",
    codeExample: "# def safe_cast(x): try: return float(x) except: return None"
  },
  {
    question: "How does PEP 8 recommend formatting a comprehension that spans multiple lines?",
    shortAnswer: "Break each clause onto its own indented line with the opening and closing brackets on separate lines for visual symmetry and readability.",
    explanation: "PEP 8 multi-line comprehension formatting guidelines.",
    hint: "Indent each for and if clause on its own line with matching bracket indentation.",
    level: "moderate",
    codeExample: "honors = [\n    s['name']\n    for s in students\n    if s['score'] >= 90\n]"
  },
  {
    question: "When should you prefer a Generator Expression over a List Comprehension?",
    shortAnswer: "When you only need to iterate over the data once (e.g. passing to 'sum()', 'max()', 'any()', or streaming to a file) and do not need indexing, length, or multiple passes.",
    explanation: "Saves massive amounts of heap memory via O(1) lazy evaluation.",
    hint: "Use generator when iterating once, streaming large files, or calculating aggregates like sum().",
    level: "moderate",
    codeExample: "total = sum(s['fee'] for s in students) # O(1) memory generator"
  },
  {
    question: "How do you measure the memory allocation difference between a list comprehension and a generator?",
    shortAnswer: "Using 'sys.getsizeof(my_object)': a 1,000,000-element list consumes ~8.5 MB of RAM, while the equivalent generator expression consumes only ~104 bytes.",
    explanation: "Demonstrates memory conservation of lazy iteration.",
    hint: "Use sys.getsizeof() to compare object byte allocations.",
    level: "moderate",
    codeExample: "import sys\nsys.getsizeof([x for x in range(1000000)]) # ~8.5 MB\nsys.getsizeof((x for x in range(1000000))) # ~104 bytes"
  },
  {
    question: "What is the 'Walrus Operator' (':=') and how can it prevent redundant computations in comprehensions?",
    shortAnswer: "The assignment expression operator (':=') binds intermediate results to a variable within the comprehension, avoiding calling an expensive function twice in the expression and filter guard.",
    explanation: "Optimizes expensive filtering and transformation pipelines.",
    hint: "Use := to compute expensive expressions once and reuse in expression and filter.",
    level: "complex",
    codeExample: "[res for x in seq if (res := expensive_func(x)) > threshold]"
  },
  {
    question: "Why should you avoid nesting multiple ternary 'if-else' expressions inside a comprehension?",
    shortAnswer: "Nested ternary expressions ('A if c1 else B if c2 else C') create cryptic, unreadable code that obscures business logic; a helper function or dictionary mapping is much clearer.",
    explanation: "Prevents ternary ladder cognitive overload.",
    hint: "Chained ternary expressions become unreadable; use helper functions instead.",
    level: "basic",
    codeExample: "# BAD: [A if c1 else B if c2 else C for x in seq]"
  },
  {
    question: "When is a standard 'for' loop strictly better than a comprehension?",
    shortAnswer: "When the loop requires logging/debugging statements, multi-step mutations with intermediate variables, complex branching ('elif'), or early exit conditions ('break'/'continue').",
    explanation: "Procedural control flow strengths.",
    hint: "When logic needs logging, exception handling, early break/continue, or multiple elif branches.",
    level: "basic",
    codeExample: "# Use for loop when debugging or early break is required"
  },
  {
    question: "How do you refactor a comprehension that needs to skip items based on dynamic validation?",
    shortAnswer: "Use a procedural 'for' loop with 'continue' statements and quarantine logging for invalid records.",
    explanation: "Provides clear tracing and debugging in production.",
    hint: "Use a procedural loop with 'continue' and quarantine logging.",
    level: "moderate",
    codeExample: "for raw in data:\n    if not is_valid(raw): continue\n    clean.append(raw)"
  },
  {
    question: "Can comprehensions contain 'break' or 'continue' statements?",
    shortAnswer: "No. 'break' and 'continue' are statements, not expressions, and cannot be used inside comprehensions (though 'if' filters act similarly to 'continue').",
    explanation: "Control flow statement restrictions in comprehensions.",
    hint: "No, break and continue are statements and cannot exist in comprehensions.",
    level: "basic",
    codeExample: "# SyntaxError: [x for x in seq if break]"
  },
  {
    question: "What is the 'Hybrid Architecture' pattern in production data pipelines?",
    shortAnswer: "Using defensive procedural 'for' loops with 'try...except' to clean and quarantine dirty raw I/O data, followed by clean, idiomatic comprehensions for pure data transformations and indexing.",
    explanation: "Best-of-both-worlds enterprise software design.",
    hint: "Defensive loops for dirty I/O parsing, then pure comprehensions for analytics.",
    level: "moderate",
    codeExample: "# Defensive loop -> Clean data -> Pure comprehensions"
  },
  {
    question: "What is the impact of list comprehensions on code reviews and pull request velocity?",
    shortAnswer: "Clean 1-line comprehensions improve code review speed by making intent immediately obvious, whereas 4-line monster comprehensions increase review time and hide potential bugs.",
    explanation: "Software engineering readability impact.",
    hint: "Clear comprehensions accelerate reviews; monster comprehensions slow down reviews.",
    level: "basic",
    codeExample: "# Keep comprehensions readable for smooth code reviews"
  },
  {
    question: "How does mutating an external variable inside a comprehension violate functional programming principles?",
    shortAnswer: "Comprehensions should be pure functions that compute a new collection; mutating external global or closure variables introduces hidden side-effects and bugs.",
    explanation: "Functional purity invariants.",
    hint: "Mutating external state inside comprehensions introduces hidden side-effects.",
    level: "moderate",
    codeExample: "# BAD: total = 0; [total := total + x for x in seq]"
  },
  {
    question: "Why is 'map(func, iterable)' sometimes less readable than '[func(x) for x in iterable]'?",
    shortAnswer: "List comprehensions avoid the need for 'lambda' expressions and explicitly display the data transformation without wrapping in 'list(map(...))'.",
    explanation: "Idiomatic Python style preference for comprehensions over lambda maps.",
    hint: "Comprehensions avoid lambda syntax and explicit list() wrapping.",
    level: "basic",
    codeExample: "[x * 2 for x in seq] # Cleaner than list(map(lambda x: x * 2, seq))"
  },
  {
    question: "How do you test and debug a complex comprehension when it produces incorrect results?",
    shortAnswer: "Refactor it temporarily into a standard 'for' loop with 'print()' statements or breakpoints, verify the logic, and decide whether to keep the loop for clarity.",
    explanation: "Standard debugging methodology for comprehensions.",
    hint: "Temporarily expand to a procedural loop with print statements or breakpoints.",
    level: "basic",
    codeExample: "# Expand comprehension to for loop with print() for debugging"
  },
  {
    question: "What is the maximum recommended physical line length for comprehensions under PEP 8?",
    shortAnswer: "79 characters (or 88 characters under Black/Flake8); if a comprehension exceeds this limit, break it across multiple indented lines.",
    explanation: "Standard PEP 8 line length limits.",
    hint: "79 characters (or 88 in Black formatter).",
    level: "basic",
    codeExample: "# Break across multiple lines if > 79 characters"
  },
  {
    question: "How do you calculate a readability index for Python code?",
    shortAnswer: "Using tools like 'radon' or 'flake8' to compute Cyclomatic Complexity (McCabe metric) and Halstead volume metrics.",
    explanation: "Automated static analysis tooling.",
    hint: "Use radon or flake8 to measure Cyclomatic Complexity.",
    level: "complex",
    codeExample: "# radon cc my_script.py -a"
  },
  {
    question: "What happens if an exception is raised halfway through evaluating a list comprehension?",
    shortAnswer: "The comprehension immediately terminates, the call stack unwinds, and any elements computed before the error are discarded with nothing returned.",
    explanation: "All-or-nothing execution semantics of comprehensions.",
    hint: "Execution halts immediately and all partially computed elements are discarded.",
    level: "moderate",
    codeExample: "# [1 / x for x in [2, 1, 0, 3]] -> Raises ZeroDivisionError"
  },
  {
    question: "How can a helper function restore readability to a comprehension with complex logic?",
    shortAnswer: "Encapsulate the multi-line conditional or transformation logic inside a descriptive helper function ('[categorize_student(s) for s in students]').",
    explanation: "Decomposition into named domain abstractions.",
    hint: "Extract complex logic into a named helper function and call inside comprehension.",
    level: "basic",
    codeExample: "[evaluate_scholarship(s) for s in students if is_eligible(s)]"
  },
  {
    question: "Why should you avoid creating throwaway list comprehensions just to pass to 'len()'?",
    shortAnswer: "Writing 'len([x for x in seq if cond])' allocates an entire list in memory; using 'sum(1 for x in seq if cond)' or a loop avoids list allocation.",
    explanation: "Memory-efficient counting.",
    hint: "Use sum(1 for x in seq if cond) to count items without allocating full lists.",
    level: "moderate",
    codeExample: "count = sum(1 for s in students if s['score'] >= 90) # O(1) memory"
  },
  {
    question: "What is the cognitive danger of 'code golf' with comprehensions?",
    shortAnswer: "Writing overly condensed, cryptic single-line comprehensions solely to minimize line count increases tech debt and makes maintenance difficult for teammates.",
    explanation: "Software maintainability over brevity.",
    hint: "Minimizing line count at the expense of readability creates tech debt.",
    level: "basic",
    codeExample: "# Avoid code golf in production software"
  },
  {
    question: "How does type hinting improve the readability of complex comprehensions?",
    shortAnswer: "Explicitly annotating variable types (e.g. 'honors: List[str] = [...]') documents the expected container and element types for maintainers and IDEs.",
    explanation: "Static typing clarity.",
    hint: "Add type annotations like List[str] or Dict[str, float] to document output type.",
    level: "basic",
    codeExample: "honors: List[str] = [s['name'] for s in students if s['score'] >= 90]"
  },
  {
    question: "What is the ultimate golden rule for When to Use Comprehensions vs Loops in Python?",
    shortAnswer: "Use comprehensions for clear, declarative, pure data transformations (max 2 clauses) without side-effects; use procedural loops when side-effects, exception handling, complex branching, or debugging are required.",
    explanation: "The complete enterprise architecture guideline for idiomatic Python programming.",
    hint: "Comprehensions for pure data transforms (max 2 clauses); procedural loops for side-effects, I/O, and exceptions.",
    level: "basic",
    codeExample: "# Python Readability & Comprehension Mastery"
  }
];

export default questions;
