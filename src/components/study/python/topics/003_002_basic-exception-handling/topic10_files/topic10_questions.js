// src/components/study/python/topics/003_002_basic-exception-handling/topic10_files/topic10_questions.js
// Comprehensive Master Review Questions for Topic 10: Using assertions with assert for internal invariant checks

const questions = [
  {
    question: "What is the primary purpose of the 'assert' statement in Python?",
    shortAnswer: "To verify internal programmer consistency, algorithm postconditions, and debugging invariants, signaling a bug in the code itself if the condition evaluates to False.",
    explanation: "Asserts should check conditions that should theoretically NEVER happen if the code is correct.",
    hint: "Used for internal developer sanity checks and algorithm invariants.",
    level: "basic",
    codeExample: "assert balance >= 0, 'Internal math bug: balance cannot be negative'"
  },
  {
    question: "What exception type is raised when an assertion condition evaluates to False?",
    shortAnswer: "Python raises an 'AssertionError' containing the optional error message string.",
    explanation: "Inherits from standard built-in Exception.",
    hint: "Raises an AssertionError.",
    level: "basic",
    codeExample: "# Raises: AssertionError: Vector length mismatch"
  },
  {
    question: "What is the single most important difference between 'assert' and 'raise'?",
    shortAnswer: "'raise' is for runtime input validation and expected operational failures that must always execute; 'assert' is for internal development invariants and can be completely stripped from bytecode by Python optimization flags.",
    explanation: "Never use assert where raise is required.",
    hint: "raise always executes; assert can be disabled by Python optimization flags.",
    level: "basic",
    codeExample: "# User input: if x < 0: raise ValueError\n# Internal check: assert len(arr) > 0"
  },
  {
    question: "What happens when Python runs with the '-O' (Optimize) or '-OO' command-line flag?",
    shortAnswer: "Python sets '__debug__ = False' and completely strips and removes all 'assert' statements from the compiled bytecode.",
    explanation: "Any logic inside assert statements will never execute in optimized mode.",
    hint: "All assert statements are stripped from bytecode and ignored.",
    level: "moderate",
    codeExample: "python -O my_script.py  # All asserts are disabled!"
  },
  {
    question: "Why is using 'assert' for user authentication or authorization a critical security vulnerability?",
    shortAnswer: "Because if the application is deployed in production with 'python -O', the 'assert user.is_admin' check is completely omitted, allowing unauthenticated or non-admin users full access!",
    explanation: "A famous CWE-617 software security flaw.",
    hint: "In -O mode, the assert check vanishes, granting unauthorized access.",
    level: "moderate",
    codeExample: "# DANGEROUS: assert user == 'ADMIN'\n# SECURE: if user != 'ADMIN': raise PermissionError"
  },
  {
    question: "What is the 'Assert Tuple Trap' in Python?",
    shortAnswer: "Writing 'assert (condition, \"message\")' with parentheses creates a 2-element tuple; since non-empty tuples are always truthy in Python, the assertion will NEVER fail, even if the condition is False!",
    explanation: "One of the most insidious syntax traps in Python.",
    hint: "Parentheses create a non-empty tuple which is always True, so the assert never fails.",
    level: "complex",
    codeExample: "# BUG: assert (x > 0, 'Error') -> Always True!\n# FIX: assert x > 0, 'Error'"
  },
  {
    question: "What is a 'Postcondition Invariant'?",
    shortAnswer: "A condition that must be true after a complex algorithm or calculation finishes (e.g. verifying normalized weights sum to 1.0 or output list is sorted).",
    explanation: "Catches subtle mathematical or algorithmic bugs during execution.",
    hint: "Verifying mathematical properties after an algorithm executes.",
    level: "moderate",
    codeExample: "weights = normalize(scores)\nassert abs(sum(weights) - 1.0) < 1e-6"
  },
  {
    question: "How can 'assert False' be used legitimately in code?",
    shortAnswer: "As an unreachable branch sentinel in 'else' blocks or exhaustive pattern matching to ensure unexpected unhandled cases are caught immediately during development.",
    explanation: "Signals that control flow reached an impossible state.",
    hint: "Acts as a sentinel for unreachable code branches.",
    level: "moderate",
    codeExample: "else:\n    assert False, f'Unreachable branch: unrecognized action {action}'"
  },
  {
    question: "Can an 'AssertionError' be caught with 'try...except AssertionError:'?",
    shortAnswer: "Yes, but catching AssertionError in production code is generally an anti-pattern because assertions represent internal programmer bugs that should be fixed, not caught.",
    explanation: "Testing frameworks (like pytest) catch AssertionError to report test failures.",
    hint: "Yes, but generally only testing frameworks should catch it.",
    level: "moderate",
    codeExample: "try: assert x > 0\nexcept AssertionError: ..."
  },
  {
    question: "What is the value of the built-in constant '__debug__' by default?",
    shortAnswer: "It is 'True' under normal execution and 'False' when Python is invoked with '-O' or '-OO' flags.",
    explanation: "It is a read-only constant and cannot be reassigned at runtime.",
    hint: "__debug__ is True by default and False in optimized mode.",
    level: "basic",
    codeExample: "if __debug__:\n    print('Running in debug mode')"
  },
  {
    question: "Why should you never execute side-effects inside an assert expression (e.g. 'assert pop_item() == 5')?",
    shortAnswer: "Because in optimized mode ('-O'), the entire assert statement is stripped, meaning 'pop_item()' will never be called, altering program logic and corrupting state!",
    explanation: "Asserts must be side-effect free.",
    hint: "Stripping the assert in -O mode would prevent the side-effect from executing.",
    level: "complex",
    codeExample: "# BAD: assert queue.pop() == 5\n# GOOD: item = queue.pop(); assert item == 5"
  },
  {
    question: "When should you use 'assert' on private internal helper methods?",
    shortAnswer: "To verify that calling code within your own module is passing valid arguments, documenting internal assumptions during refactoring.",
    explanation: "Helps developers catch internal contract violations during maintenance.",
    hint: "To verify internal assumptions on private methods.",
    level: "basic",
    codeExample: "def _internal_calc(self, _raw_matrix):\n    assert _raw_matrix is not None"
  },
  {
    question: "How does 'pytest' leverage the 'assert' statement?",
    shortAnswer: "Pytest uses AST bytecode rewriting to intercept standard 'assert' expressions and generate rich, detailed failure reports showing variable values on failure without requiring specialized assertion methods.",
    explanation: "Eliminates the need for self.assertEqual() boilerplate.",
    hint: "Pytest rewrites bytecode to provide rich failure diffs on standard assert statements.",
    level: "moderate",
    codeExample: "def test_calc():\n    assert add(2, 3) == 5"
  },
  {
    question: "What is the difference between '-O' and '-OO' flags in Python?",
    shortAnswer: "'-O' strips assert statements and sets __debug__ to False; '-OO' does everything '-O' does PLUS strips docstrings ('__doc__') from bytecode.",
    explanation: "Used to minimize .pyc bytecode file sizes in embedded systems.",
    hint: "-OO strips docstrings in addition to assert statements.",
    level: "moderate",
    codeExample: "python -OO app.py  # Strips asserts AND docstrings"
  },
  {
    question: "Can an assertion message be dynamically formatted with f-strings?",
    shortAnswer: "Yes: 'assert len(items) == expected, f\"Expected {expected} items, got {len(items)}\"' is standard practice.",
    explanation: "Provides clear contextual values when debugging failures.",
    hint: "Yes, f-strings provide dynamic diagnostic values on failure.",
    level: "basic",
    codeExample: "assert x == y, f'Mismatch: {x} != {y}'"
  },
  {
    question: "Why is 'assert isinstance(user_input, int)' on a public API an anti-pattern?",
    shortAnswer: "Because invalid user input is an expected operational occurrence (not a developer logic bug) and should raise 'TypeError' so callers can handle it cleanly.",
    explanation: "Public APIs must provide predictable exception contracts.",
    hint: "Public APIs must raise TypeError/ValueError, not AssertionError.",
    level: "basic",
    codeExample: "if not isinstance(user_input, int):\n    raise TypeError('Expected int')"
  },
  {
    question: "What is 'Defensive Programming' in relation to assertions?",
    shortAnswer: "The practice of placing internal assertions at key state transitions to catch corrupt data or broken assumptions immediately before errors propagate into downstream systems.",
    explanation: "Guarantees system integrity by failing fast at the exact point of logic deviation.",
    hint: "Placing assertions at key state transitions to catch corrupt data immediately.",
    level: "moderate",
    codeExample: "# Defensive check after complex sort\nassert is_sorted(arr)"
  },
  {
    question: "Can you assign a custom exception class to an assert statement?",
    shortAnswer: "No. The 'assert' keyword always raises 'AssertionError'; you cannot make it raise a different exception type (use 'if not cond: raise CustomError' instead).",
    explanation: "The syntax of assert is hardcoded to raise AssertionError.",
    hint: "No, assert always raises AssertionError.",
    level: "basic",
    codeExample: "# Assert cannot raise custom exception types"
  },
  {
    question: "What is a 'Class Invariant'?",
    shortAnswer: "A condition regarding an object's internal state that must hold true after every method finishes (e.g. 'assert 0 <= self._balance <= self._credit_limit').",
    explanation: "Guarantees that objects never reside in corrupted or illegal states.",
    hint: "A condition that must always remain true for an object instance.",
    level: "moderate",
    codeExample: "def deposit(self, amt):\n    ...\n    assert self._balance >= 0"
  },
  {
    question: "How do assertions help during major codebase refactoring?",
    shortAnswer: "They act as active internal documentation and tripwires, immediately alerting developers if an architectural refactoring breaks an unwritten mathematical or logical assumption.",
    explanation: "Provides high confidence when restructuring legacy systems.",
    hint: "They act as tripwires alerting engineers if refactoring breaks assumptions.",
    level: "basic",
    codeExample: "# Tripwire assertion catches broken invariants during refactor"
  },
  {
    question: "What is the runtime performance cost of assertions in development mode?",
    shortAnswer: "Assertions evaluate the condition expression on every execution, adding minor CPU overhead in development, but with zero overhead in production when run with '-O'.",
    explanation: "Allows extensive checking in testing without production performance penalty.",
    hint: "Minor check in dev mode; zero cost when compiled with -O.",
    level: "basic",
    codeExample: "# Zero cost in production with python -O"
  },
  {
    question: "Can assertions be used to validate database query invariants?",
    shortAnswer: "Yes. For example, when querying by a unique primary key, asserting 'assert len(results) <= 1, \"Duplicate primary key in DB!\"' checks database consistency.",
    explanation: "Catches relational integrity corruption immediately.",
    hint: "Yes, to verify relational consistency assumptions (e.g. <= 1 row for unique key).",
    level: "moderate",
    codeExample: "rows = db.query_by_id(101)\nassert len(rows) <= 1"
  },
  {
    question: "Why should you never write 'assert False' to handle expected missing files or network drops?",
    shortAnswer: "Because network drops and missing files are external environment runtime errors (which should raise 'FileNotFoundError' or 'ConnectionError'), not programmer code bugs.",
    explanation: "Distinguishes environmental failures from software bugs.",
    hint: "Environmental errors require FileNotFoundError/ConnectionError, not AssertionError.",
    level: "basic",
    codeExample: "# Bad: if not file.exists(): assert False\n# Good: if not file.exists(): raise FileNotFoundError"
  },
  {
    question: "How do linters like Flake8 or Ruff detect the Assert Tuple Trap?",
    shortAnswer: "They inspect AST nodes for 'Assert(test=Tuple(...))' and emit warning 'F631: assert tuple is always true'.",
    explanation: "Static analysis catches this syntax trap automatically.",
    hint: "Linters emit F631 warning when an assert statement tests a tuple.",
    level: "complex",
    codeExample: "# Linter warning: F631 assert tuple is always true"
  },
  {
    question: "What is the ultimate golden rule for the 'assert' statement in Python?",
    shortAnswer: "Use 'assert' exclusively for internal developer sanity checks, algorithm postconditions, and debugging invariants that should never fail in correct code; use 'raise' for all user inputs, API validations, and operational errors.",
    explanation: "Ensures secure, robust, and maintainable software architecture.",
    hint: "Assert for internal developer sanity checks; raise for user inputs and operational errors.",
    level: "basic",
    codeExample: "# Clear, correct separation of assert vs raise"
  }
];

export default questions;
