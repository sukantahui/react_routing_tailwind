// src/components/study/python/topics/003_002_basic-exception-handling/topic12_files/topic12_questions.js
// Comprehensive Master Review Questions for Topic 12: Best practices: Fail fast, log errors, defensive programming

const questions = [
  {
    question: "What is the 'Fail-Fast' principle in Python programming?",
    shortAnswer: "The practice of validating inputs immediately at function/API boundaries and raising descriptive exceptions upon the very first invalid condition, preventing corrupt data from propagating into downstream systems.",
    explanation: "Eliminates hard-to-trace bugs caused by corrupted variables bubbling through deep call stacks.",
    hint: "Validate inputs immediately and halt execution on the first sign of invalid data.",
    level: "basic",
    codeExample: "if not isinstance(user_id, str):\n    raise TypeError('user_id must be a string')"
  },
  {
    question: "What is a 'Guard Clause' and how does it prevent the 'Pyramid of Doom'?",
    shortAnswer: "A guard clause is an early return or early raise check at the top of a function; it eliminates deeply nested 'if...else' ladders (the Pyramid of Doom) by exiting immediately, keeping the main happy-path logic unindented and flat.",
    explanation: "Improves code readability, testability, and cognitive clarity.",
    hint: "Early validation checks at function tops that keep the main code flat.",
    level: "basic",
    codeExample: "def process(data):\n    if not data: raise ValueError\n    if not data.is_valid: raise ValidationError\n    # Flat happy path!"
  },
  {
    question: "Why is 'except Exception: pass' considered one of the worst anti-patterns in software engineering?",
    shortAnswer: "Because it silently swallows all exceptions, hiding critical crashes, database failures, and corrupt states while giving the caller a false illusion of success.",
    explanation: "Causes silent data loss that can go undetected for weeks.",
    hint: "Silently masks severe crashes and causes undetected data loss.",
    level: "basic",
    codeExample: "# CATASTROPHIC ANTI-PATTERN:\nexcept Exception:\n    pass"
  },
  {
    question: "What does 'EAFP' stand for in Python philosophy?",
    shortAnswer: "'Easier to Ask for Forgiveness than Permission' — the idiomatic Python practice of assuming valid keys/files exist and catching the resulting exception (KeyError, FileNotFoundError) if they do not, rather than checking beforehand.",
    explanation: "Contrasts with LBYL (Look Before You Leap).",
    hint: "Easier to Ask for Forgiveness than Permission.",
    level: "basic",
    codeExample: "try:\n    return config['timeout']\nexcept KeyError:\n    return 30"
  },
  {
    question: "What does 'LBYL' stand for and what is its main drawback in concurrent systems?",
    shortAnswer: "'Look Before You Leap' — checking preconditions before acting (e.g. 'if key in dict: return dict[key]'); its main drawback in concurrent systems is the TOCTOU (Time-of-Check to Time-of-Use) race condition where another thread modifies state between the check and the use.",
    explanation: "EAFP avoids TOCTOU by performing the operation atomically.",
    hint: "Look Before You Leap; vulnerable to TOCTOU race conditions.",
    level: "moderate",
    codeExample: "# LBYL: if file.exists(): open(file) -> Race condition if deleted in between!"
  },
  {
    question: "What is a 'TOCTOU' (Time-of-Check to Time-of-Use) race hazard?",
    shortAnswer: "A concurrency bug where a condition verified during a check (e.g. 'if os.path.exists(path)') becomes invalid before the resource is used (e.g. file is deleted by another process before 'open()').",
    explanation: "EAFP's 'try open() except FileNotFoundError' is immune to this hazard.",
    hint: "State changes between the check step and the execution step.",
    level: "complex",
    codeExample: "# TOCTOU Hazard: checking if a file exists before opening it"
  },
  {
    question: "What are Preconditions, Postconditions, and Class Invariants?",
    shortAnswer: "Preconditions are requirements that must hold before a method executes (e.g. fee > 0); Postconditions are guarantees that must hold when a method finishes (e.g. output sum == 1.0); Class Invariants are truths that must hold for an object at all times (e.g. balance >= 0).",
    explanation: "The foundation of Design by Contract (DbC) and defensive programming.",
    hint: "Pre = before execution; Post = after completion; Invariant = always true for object.",
    level: "moderate",
    codeExample: "# Precondition: raise ValueError\n# Postcondition: assert math_valid\n# Invariant: assert self._bal >= 0"
  },
  {
    question: "How do you implement an 'Atomic Rollback' pattern in Python when an operation fails?",
    shortAnswer: "By taking a snapshot of the original state before mutation, executing the operation inside a 'try' block, and restoring the original snapshot inside the 'except' block before re-raising or logging the error.",
    explanation: "Guarantees that objects never remain in corrupted half-mutated states.",
    hint: "Snapshot state before mutation and restore it in the except handler.",
    level: "moderate",
    codeExample: "old_state = state.copy()\ntry: mutate()\nexcept Exception:\n    state = old_state; raise"
  },
  {
    question: "When should you use 'logger.warning()' vs 'logger.error()'?",
    shortAnswer: "Use 'logger.warning()' when an unexpected event occurs but the system successfully handled it or degraded gracefully; use 'logger.error()' when an operation failed and could not fulfill its primary goal.",
    explanation: "Maintains clear signal-to-noise ratio in monitoring dashboards.",
    hint: "Warning = recovered/degraded; Error = operation failed.",
    level: "basic",
    codeExample: "# Warning: logger.warning('Cache miss, fetching DB')\n# Error: logger.error('DB query failed')"
  },
  {
    question: "Why should you never catch 'BaseException' directly in application code?",
    shortAnswer: "Because 'BaseException' catches 'KeyboardInterrupt' (Ctrl+C), 'SystemExit', and 'GeneratorExit', preventing users from terminating the program or killing worker processes cleanly.",
    explanation: "Always catch 'Exception' instead.",
    hint: "BaseException catches Ctrl+C (KeyboardInterrupt) and SystemExit.",
    level: "basic",
    codeExample: "except Exception:  # Correct!\n# except BaseException:  # Dangerous!"
  },
  {
    question: "What is 'Graceful Degradation' in microservice exception handling?",
    shortAnswer: "The capability of an application to continue operating in a limited or fallback capacity (e.g. serving cached data or enqueuing to offline buffers) when a primary dependency or database fails.",
    explanation: "Prevents total system outages during partial infrastructure failures.",
    hint: "Continuing operation in a fallback mode when dependencies fail.",
    level: "moderate",
    codeExample: "except DatabaseError:\n    return fetch_stale_cache_fallback()"
  },
  {
    question: "Why should error messages never expose raw SQL queries or passwords?",
    shortAnswer: "Because error messages often get propagated to logs, error monitoring tools, or API responses, where exposed credentials or database schemas represent a major security risk (OWASP Top 10).",
    explanation: "Sanitize logs and use 'from None' on public boundaries.",
    hint: "Prevents credential leaks and schema disclosure in logs/APIs.",
    level: "basic",
    codeExample: "# Sanitize credentials before logging or raising"
  },
  {
    question: "What is the 'Circuit Breaker' pattern?",
    shortAnswer: "A stability pattern that detects repeated failures to an external service and temporarily stops sending requests (tripping the circuit) to give the downstream service time to recover and avoid cascading timeouts.",
    explanation: "Commonly implemented in production API gateways and microservices.",
    hint: "Temporarily halts requests to a failing service to prevent cascading crashes.",
    level: "complex",
    codeExample: "# Circuit breaker trips after 5 consecutive timeouts"
  },
  {
    question: "What does the 'else' block in a 'try...except...else...finally' construct accomplish?",
    shortAnswer: "The 'else' block executes ONLY when the 'try' block completes without raising any exceptions, keeping code that shouldn't be protected by the try block separate from the try body.",
    explanation: "Reduces the amount of code in the try block, preventing accidental catching of unrelated bugs.",
    hint: "Runs only when no exception occurs in the try block.",
    level: "basic",
    codeExample: "try: data = load()\nexcept Error: handle()\nelse: process_data(data) # Clean!"
  },
  {
    question: "What is the purpose of the 'finally' block?",
    shortAnswer: "To guarantee that resource cleanup (closing files, releasing locks, terminating database sessions) executes 100% of the time, regardless of whether exceptions were raised or caught.",
    explanation: "Essential for leak-free resource management.",
    hint: "Guarantees cleanup code executes under all circumstances.",
    level: "basic",
    codeExample: "finally:\n    db_connection.close()"
  },
  {
    question: "Why is the 'with' statement (Context Manager) preferred over manual 'try...finally'?",
    shortAnswer: "Because Context Managers encapsulate '__enter__' and '__exit__' mechanics automatically, preventing human error from forgetting to close resources or release locks.",
    explanation: "The Pythonic standard for resource management.",
    hint: "Automates resource cleanup and prevents forgetting to close files/locks.",
    level: "basic",
    codeExample: "with open('file.txt') as f:\n    data = f.read()  # Auto-closed!"
  },
  {
    question: "How should you handle unexpected exceptions at the very top level of a CLI or web application?",
    shortAnswer: "Catch 'Exception' at the top-level boundary, log the full traceback with 'logger.exception()', emit a clean user-facing error message or HTTP 500 status code, and exit cleanly with non-zero exit code.",
    explanation: "Prevents ugly raw tracebacks from splashing across user terminals while retaining full forensic logs.",
    hint: "Catch at boundary, log full traceback, show friendly error, exit cleanly.",
    level: "moderate",
    codeExample: "except Exception as e:\n    logger.exception('Fatal crash'); sys.exit(1)"
  },
  {
    question: "What is the difference between 'logging.error()' and 'logging.exception()'?",
    shortAnswer: "'logging.exception()' automatically appends the current exception's full traceback to the log message (exc_info=True); 'logging.error()' logs only the text message unless exc_info is explicitly passed.",
    explanation: "Always use logger.exception() inside except blocks.",
    hint: "logging.exception() automatically includes the full exception traceback.",
    level: "basic",
    codeExample: "# Inside except block:\nlogger.exception('Operation failed')"
  },
  {
    question: "What is 'Defensive Copying'?",
    shortAnswer: "Creating a shallow or deep copy of mutable input data structures (lists, dicts) before operating on them, ensuring external caller objects are not unintentionally mutated or corrupted.",
    explanation: "Prevents spooky action-at-a-distance bugs.",
    hint: "Copying mutable input arguments before modifying them internally.",
    level: "moderate",
    codeExample: "def process(data):\n    internal_copy = list(data)"
  },
  {
    question: "How do you test that an exception is raised with the correct message in pytest?",
    shortAnswer: "Using 'with pytest.raises(ExpectedError, match=r\"regex_pattern\"):' or by inspecting 'exc_info.value'.",
    explanation: "Verifies both exception type and diagnostic message accuracy.",
    hint: "Use pytest.raises(ExpectedError, match='pattern').",
    level: "basic",
    codeExample: "with pytest.raises(ValueError, match='Invalid age'):\n    enroll(age=-5)"
  },
  {
    question: "Why should you avoid creating a giant 'try' block that wraps an entire 200-line function?",
    shortAnswer: "Because a giant try block makes it impossible to know which specific line triggered the exception, and can accidentally catch and mask unrelated bugs in other parts of the function.",
    explanation: "Keep try blocks tight, focused, and small.",
    hint: "Keep try blocks small and focused to avoid masking unrelated bugs.",
    level: "basic",
    codeExample: "# Wrap only the specific risky line in try...except"
  },
  {
    question: "What is a 'Sentinel Value' and when is raising an exception better?",
    shortAnswer: "A sentinel value is a special return value (like None or -1) representing failure; raising an exception is better whenever returning a sentinel could be ignored or confused with a valid return value (e.g. 0 or None).",
    explanation: "Exceptions enforce explicit handling.",
    hint: "Exceptions prevent sentinel values from being confused with valid data.",
    level: "moderate",
    codeExample: "# Raising exception is unambiguous compared to returning None"
  },
  {
    question: "How does type hinting with 'Optional[T]' relate to exception handling?",
    shortAnswer: "Functions that return 'Optional[T]' signal that returning None is a normal valid possibility; functions that should always return 'T' should raise exceptions on failure rather than returning None.",
    explanation: "Clarifies function contracts in modern statically-typed Python.",
    hint: "Use Optional when None is a valid outcome; raise exceptions for actual failures.",
    level: "moderate",
    codeExample: "def find_student(id: str) -> Student: ... # Raises StudentNotFound"
  },
  {
    question: "What are the 5 Cardinal Rules of Python Exception Handling?",
    shortAnswer: "1. Never silently swallow exceptions (`except: pass`). 2. Order except blocks from most specific to most general. 3. Validate public inputs with `raise` (Fail-Fast); verify internal math with `assert`. 4. Use `raise from e` to preserve causal chains. 5. Maintain atomic rollback guarantees on failure.",
    explanation: "The comprehensive summary of professional Python error engineering.",
    hint: "No silent swallow, specific first, fail fast, chain with from, atomic rollback.",
    level: "basic",
    codeExample: "# The 5 Cardinal Rules of Python Exception Handling"
  },
  {
    question: "What is the ultimate golden rule for Defensive Programming in Python?",
    shortAnswer: "Design systems that fail fast at boundaries, communicate failures through specific typed exceptions, preserve forensic root causes with structured logging and chaining, and guarantee that no failure leaves the application in a corrupted state.",
    explanation: "The foundation of crash-proof, enterprise-ready Python software.",
    hint: "Fail fast, use specific exceptions, log structured telemetry, and protect state integrity.",
    level: "basic",
    codeExample: "# Master defensive programming architecture"
  }
];

export default questions;
