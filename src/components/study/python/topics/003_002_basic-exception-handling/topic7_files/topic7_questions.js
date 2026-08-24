// src/components/study/python/topics/003_002_basic-exception-handling/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Raising exceptions intentionally using raise keyword

const questions = [
  {
    question: "What is the purpose of the 'raise' keyword in Python?",
    shortAnswer: "To intentionally trigger and propagate an exception at a specific point in code when an error condition or invariant violation occurs.",
    explanation: "Halts normal execution and transfers control to the nearest matching except handler.",
    hint: "Keyword used to intentionally trigger and throw an exception.",
    level: "basic",
    codeExample: "if age < 0:\n    raise ValueError('Age cannot be negative!')"
  },
  {
    question: "What is the difference between 'raise ValueError(\"message\")' and 'raise ValueError'?",
    shortAnswer: "'raise ValueError(\"message\")' instantiates the exception with a descriptive error message; 'raise ValueError' instantiates the class with no arguments (equivalent to 'raise ValueError()').",
    explanation: "Always provide descriptive error messages in production code.",
    hint: "Passing a string provides a descriptive message for logs and tracebacks.",
    level: "basic",
    codeExample: "# Best practice:\nraise ValueError('Invalid PAN card format: must be 10 characters')"
  },
  {
    question: "What does a bare 'raise' statement do when executed inside an 'except' block?",
    shortAnswer: "It re-raises the currently active exception that was caught, preserving the exact original traceback without resetting line numbers.",
    explanation: "Crucial for intermediate layers that need to log or clean up before propagating the error.",
    hint: "Re-raises the active exception preserving the original traceback.",
    level: "basic",
    codeExample: "except DatabaseError as e:\n    logger.error(e)\n    rollback()\n    raise"
  },
  {
    question: "What happens if you execute a bare 'raise' statement outside of any active 'except' handler?",
    shortAnswer: "Python raises a 'RuntimeError: No active exception to reraise'.",
    explanation: "Because Python has no active exception context to re-throw.",
    hint: "Raises RuntimeError: No active exception to reraise.",
    level: "moderate",
    codeExample: "# RuntimeError if executed outside an except block"
  },
  {
    question: "Why is raising exceptions considered far superior to returning error codes (e.g. 'return -1' or 'return None')?",
    shortAnswer: "Because error codes are easily ignored by calling code, leading to silent data corruption; exceptions cannot be ignored and enforce fail-fast application integrity.",
    explanation: "A core principle of robust software engineering.",
    hint: "Exceptions cannot be silently ignored and prevent downstream data corruption.",
    level: "basic",
    codeExample: "# Bad: return -1\n# Good: raise ValueError('Invalid input')"
  },
  {
    question: "What error occurs if you attempt to raise an object that does NOT inherit from 'BaseException' (e.g. 'raise \"error string\"')?",
    shortAnswer: "Python raises 'TypeError: exceptions must derive from BaseException' (in Python 3, string exceptions are illegal).",
    explanation: "All raised objects must be subclasses or instances of BaseException.",
    hint: "Raises TypeError: exceptions must derive from BaseException.",
    level: "moderate",
    codeExample: "# TypeError: raise 'Fatal Error' -> Invalid in Python 3!"
  },
  {
    question: "When should you raise a 'TypeError' vs a 'ValueError'?",
    shortAnswer: "Raise 'TypeError' when an argument receives an unexpected data type (e.g., string instead of int); raise 'ValueError' when the data type is correct but the value is invalid or out of range (e.g., negative age).",
    explanation: "Standard PEP 8 guideline for standard exception semantics.",
    hint: "TypeError = wrong type; ValueError = right type, invalid value.",
    level: "basic",
    codeExample: "# TypeError: not isinstance(x, int)\n# ValueError: x < 0"
  },
  {
    question: "What is the 'Fail-Fast' principle in software engineering?",
    shortAnswer: "The design practice of checking preconditions and immediately raising exceptions at the earliest point of failure, rather than continuing execution with corrupted data.",
    explanation: "Pinpoints the exact origin of bugs and prevents cascading failures.",
    hint: "Validate inputs immediately and fail before executing further operations.",
    level: "basic",
    codeExample: "def transfer(amount):\n    if amount <= 0: raise ValueError  # Fail fast!"
  },
  {
    question: "Can you raise an exception inside a 'finally' block?",
    shortAnswer: "Yes, but doing so will permanently suppress and discard any previous active exception that was being handled, replacing it with the new exception.",
    explanation: "Exercise caution when executing risky operations in finally blocks.",
    hint: "Yes, but it overwrites and suppresses any earlier active exception.",
    level: "complex",
    codeExample: "finally:\n    raise CleanupError  # Overwrites earlier exceptions"
  },
  {
    question: "How does 'raise' interact with 'try...except...else' blocks?",
    shortAnswer: "If a 'raise' occurs inside the 'try' block, the 'else' block is completely skipped, and execution jumps directly to matching 'except' blocks.",
    explanation: "'else' executes only when the 'try' block completes without raising any exceptions.",
    hint: "Raising an exception skips the 'else' block immediately.",
    level: "basic",
    codeExample: "try: raise ValueError\nelse: print('Never executed')"
  },
  {
    question: "What is the 'Log, Cleanup & Re-Raise' middleware pattern?",
    shortAnswer: "A pattern where intermediate middleware catches an exception, records a forensic audit log, rolls back transactions or releases locks, and calls bare 'raise' to pass the error to upstream callers.",
    explanation: "Standard pattern in enterprise web frameworks and database drivers.",
    hint: "Catch -> Log -> Rollback -> bare raise.",
    level: "moderate",
    codeExample: "except Exception as e:\n    log(e); rollback(); raise"
  },
  {
    question: "Can an exception object be assigned to a variable before raising it?",
    shortAnswer: "Yes: 'err = ValueError(\"bad value\"); raise err' is completely valid and functionally identical to inline raising.",
    explanation: "Useful when building dynamic exception objects with custom metadata.",
    hint: "Yes, exception instances can be assigned to variables before raising.",
    level: "basic",
    codeExample: "err = ValueError('Timeout'); raise err"
  },
  {
    question: "What is the danger of catching an exception and silently doing 'pass' instead of handling or re-raising it?",
    shortAnswer: "It creates a 'Silent Failure' bug, hiding crashes, masking corrupt state, and making root-cause diagnosis nearly impossible.",
    explanation: "The infamous 'silent except' anti-pattern.",
    hint: "Masks errors, hides bugs, and causes silent state corruption.",
    level: "basic",
    codeExample: "# Anti-pattern:\nexcept Exception: pass"
  },
  {
    question: "When should you raise a 'PermissionError'?",
    shortAnswer: "When an operation is attempted by a user or process that lacks required authorization, credentials, or filesystem access rights.",
    explanation: "Built-in exception inheriting from OSError.",
    hint: "For authorization, access control, and credential failures.",
    level: "basic",
    codeExample: "if not user.is_admin:\n    raise PermissionError('Admin privilege required!')"
  },
  {
    question: "When should you raise a 'NotImplementedError'?",
    shortAnswer: "In abstract base methods or interface stubs to indicate that a derived subclass has not yet provided the mandatory implementation.",
    explanation: "Signals that a concrete implementation is required.",
    hint: "Indicates that an abstract method has not been implemented by a subclass.",
    level: "basic",
    codeExample: "def calculate_tax(self):\n    raise NotImplementedError('Subclasses must implement calculate_tax!')"
  },
  {
    question: "What is the difference between 'raise NotImplementedError' and 'return NotImplemented'?",
    shortAnswer: "'raise NotImplementedError' is an exception indicating an unfinished method; 'return NotImplemented' is a special singleton used in magic operator methods (__add__) to prompt Python to try reflected operators.",
    explanation: "Never raise NotImplemented (which is not an exception class).",
    hint: "NotImplementedError is an exception; NotImplemented is a return singleton for operators.",
    level: "complex",
    codeExample: "# Magic methods: return NotImplemented\n# Abstract stubs: raise NotImplementedError"
  },
  {
    question: "Can you pass multiple arguments to an exception constructor when raising it?",
    shortAnswer: "Yes. All arguments passed to 'raise MyException(arg1, arg2)' are stored as a tuple in the exception's 'args' attribute ('err.args').",
    explanation: "Allows passing structured diagnostic metadata.",
    hint: "Yes, arguments are stored in the exception's .args tuple.",
    level: "moderate",
    codeExample: "raise CustomError('Invalid Code', 404, {'user': 'Sourav'})"
  },
  {
    question: "How does raising an exception inside a generator or coroutine behave?",
    shortAnswer: "It immediately terminates generator iteration, propagating the exception to the caller (or triggering 'StopIteration' if unhandled).",
    explanation: "You can also inject exceptions into generators using 'gen.throw(Exception)'.",
    hint: "Terminates generator iteration and propagates the error to the caller.",
    level: "complex",
    codeExample: "def my_gen():\n    raise ValueError('Aborted'); yield 1"
  },
  {
    question: "Can you catch an exception, modify its message or attributes, and re-raise it?",
    shortAnswer: "Yes. You can mutate 'err.args' or attach custom attributes (e.g. 'err.failed_at = time.time()') before calling bare 'raise'.",
    explanation: "Enriches error context without losing original traceback.",
    hint: "Yes, attach attributes to the exception instance before calling bare raise.",
    level: "moderate",
    codeExample: "except ValueError as e:\n    e.extra_info = 42\n    raise"
  },
  {
    question: "Why should error messages in 'raise' statements be specific rather than generic?",
    shortAnswer: "Because generic messages like 'Invalid input' force engineers to guess what failed, whereas 'Expected age between 14-80, got 10' enables instant diagnosis in production logs.",
    explanation: "Drastically reduces Mean Time to Resolution (MTTR).",
    hint: "Specific messages provide immediate diagnostic context in production logs.",
    level: "basic",
    codeExample: "raise ValueError(f'Invalid withdrawal INR {amt}: balance is INR {bal}')"
  },
  {
    question: "What is the difference between 'raise' and 'assert'?",
    shortAnswer: "'raise' is for production error handling and input validation that should always execute; 'assert' is for internal debugging invariants and can be globally disabled with the Python '-O' flag.",
    explanation: "Topic 10 in this module explores assertions in detail.",
    hint: "raise is for production validation; assert can be disabled in optimized mode (-O).",
    level: "moderate",
    codeExample: "# Production validation: raise ValueError\n# Internal debug invariant: assert x > 0"
  },
  {
    question: "Can you raise exceptions inside Python property setters?",
    shortAnswer: "Yes! Raising ValueError or TypeError inside '@property.setter' methods is the standard Pythonic mechanism for enforcing data validation invariants on attribute assignment.",
    explanation: "Prevents objects from entering invalid states.",
    hint: "Yes, standard mechanism for validating attribute assignment.",
    level: "basic",
    codeExample: "@price.setter\ndef price(self, val):\n    if val < 0: raise ValueError"
  },
  {
    question: "What happens if an exception is raised inside a constructor ('__init__')?",
    shortAnswer: "Object initialization is aborted immediately, no reference is returned to the caller, and the half-constructed object is scheduled for garbage collection.",
    explanation: "Prevents callers from holding references to corrupted objects.",
    hint: "Aborts initialization and prevents corrupted object creation.",
    level: "moderate",
    codeExample: "def __init__(self, val):\n    if val < 0: raise ValueError"
  },
  {
    question: "How does raising exceptions help with writing unit tests with 'pytest' or 'unittest'?",
    shortAnswer: "Testing frameworks can assert that specific invalid inputs correctly raise expected exception types using 'pytest.raises(ValueError)' or 'self.assertRaises()'.",
    explanation: "Essential for comprehensive test-driven development (TDD).",
    hint: "Enables testing invalid input scenarios using pytest.raises().",
    level: "basic",
    codeExample: "with pytest.raises(ValueError):\n    wallet.withdraw(999999)"
  },
  {
    question: "What is the ultimate rule for using the 'raise' statement in Python?",
    shortAnswer: "Raise standard, specific exceptions (TypeError, ValueError, PermissionError) early to fail-fast on invalid inputs, include rich diagnostic messages, and use bare 'raise' when intermediate logging or cleanup is required.",
    explanation: "Ensures clean, maintainable, and crash-proof Python applications.",
    hint: "Fail fast with specific exceptions, write rich messages, and re-raise with bare raise.",
    level: "basic",
    codeExample: "# Fail-fast with rich messages: raise ValueError(f'Invalid {arg}')"
  }
];

export default questions;
