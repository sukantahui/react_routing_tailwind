// src/components/study/python/topics/003_002_basic-exception-handling/topic9_files/topic9_questions.js
// Comprehensive Master Review Questions for Topic 9: Exception Chaining (raise ... from ...)

const questions = [
  {
    question: "What is Exception Chaining in Python (PEP 3134)?",
    shortAnswer: "A language feature that links a newly raised exception to the original root-cause exception that triggered it, preserving complete causal diagnostic history in tracebacks.",
    explanation: "Introduced in Python 3 to provide full visibility into multi-tiered errors.",
    hint: "Linking a new exception to its original root cause.",
    level: "basic",
    codeExample: "raise DomainError('Transaction failed') from root_socket_error"
  },
  {
    question: "What attribute does Python populate on the new exception when using 'raise NewException from OriginalException'?",
    shortAnswer: "It populates the '__cause__' attribute ('new_err.__cause__ = OriginalException').",
    explanation: "Allows programmatic inspection of the root cause.",
    hint: "The __cause__ attribute.",
    level: "basic",
    codeExample: "print(err.__cause__)  # The original exception instance"
  },
  {
    question: "What is the difference between explicit chaining and implicit chaining?",
    shortAnswer: "Explicit chaining uses 'raise New from Orig' (sets '__cause__', traceback displays 'direct cause'); implicit chaining occurs automatically when an error is raised inside an 'except' block without 'from' (sets '__context__', traceback displays 'During handling of the above exception').",
    explanation: "Explicit chaining indicates deliberate causal wrapping; implicit indicates secondary errors during recovery.",
    hint: "Explicit uses 'from' (__cause__); implicit happens automatically (__context__).",
    level: "moderate",
    codeExample: "# Explicit: raise B from A\n# Implicit: except A: raise B"
  },
  {
    question: "What is the purpose of 'raise NewException from None'?",
    shortAnswer: "To explicitly suppress and hide the original root-cause exception and its traceback, setting '__suppress_context__ = True' to show only the new clean exception.",
    explanation: "Essential for creating clean user-facing error messages without leaking internal implementation details.",
    hint: "Suppresses the underlying traceback to present a clean single error.",
    level: "basic",
    codeExample: "raise CardDeclinedError('Card declined') from None"
  },
  {
    question: "Why is 'from None' crucial for security in public web APIs?",
    shortAnswer: "Because it prevents sensitive internal implementation details (such as raw SQL queries, database hostnames, file paths, or API secret keys) from leaking into client-visible error responses.",
    explanation: "A core principle of secure application design.",
    hint: "Prevents internal database schemas or credentials from leaking in tracebacks.",
    level: "moderate",
    codeExample: "# Hides internal SQL schema from client:\nraise PublicAPIError('User not found') from None"
  },
  {
    question: "What is the 'Subsystem Exception Translation Layer' pattern?",
    shortAnswer: "An architectural pattern where a high-level service catches low-level driver or third-party exceptions (e.g. psycopg2, urllib, requests) and wraps them into domain exceptions (e.g. DatabaseTimeoutError) chained with 'from e'.",
    explanation: "Decouples application logic from specific vendor libraries while preserving forensic root causes.",
    hint: "Wrapping third-party library errors into clean domain exceptions.",
    level: "moderate",
    codeExample: "except sqlite3.OperationalError as e:\n    raise LedgerStorageError from e"
  },
  {
    question: "How does traceback formatting differ between explicit and implicit chaining?",
    shortAnswer: "Explicit chaining displays: 'The above exception was the direct cause of the following exception:'; implicit chaining displays: 'During handling of the above exception, another exception occurred:'.",
    explanation: "Allows engineers reading logs to distinguish deliberate wrapping from unexpected crashes.",
    hint: "Explicit = 'direct cause'; Implicit = 'During handling...'.",
    level: "moderate",
    codeExample: "# CPython traceback rendering distinction"
  },
  {
    question: "Can you chain an exception that was created dynamically without catching it first?",
    shortAnswer: "Yes. You can instantiate an exception object and chain it directly: 'raise HighLevelError() from ValueError(\"Initial reason\")'.",
    explanation: "Any instance or subclass of BaseException (or None) can follow 'from'.",
    hint: "Yes, any exception instance or class can follow 'from'.",
    level: "complex",
    codeExample: "raise ApplicationError('Failed') from TimeoutError('3000ms')"
  },
  {
    question: "What happens if you pass an object that does NOT inherit from BaseException to 'from' (e.g. 'raise MyError from \"bad string\"')?",
    shortAnswer: "Python raises 'TypeError: exception causes must derive from BaseException or be None'.",
    explanation: "Enforced by Python's runtime exception machinery.",
    hint: "Raises TypeError: causes must derive from BaseException or be None.",
    level: "moderate",
    codeExample: "# TypeError: exception causes must derive from BaseException"
  },
  {
    question: "How can centralized monitoring tools (like Sentry or Datadog) utilize chained exceptions?",
    shortAnswer: "They inspect the '__cause__' and '__context__' recursive tree to display multi-layered stack traces, linking high-level business failures to low-level socket or query crashes.",
    explanation: "Provides instant end-to-end root cause diagnostics.",
    hint: "Inspects __cause__ tree to display multi-layered causal stack traces.",
    level: "moderate",
    codeExample: "# Sentry groups errors by root __cause__"
  },
  {
    question: "Can an exception chain have more than two levels (e.g. A caused B which caused C)?",
    shortAnswer: "Yes. Python supports arbitrary depth causal chains: 'err_c.__cause__ = err_b', and 'err_b.__cause__ = err_a', printing all causal links in sequence.",
    explanation: "Reflects deep multi-tier microservice call chains accurately.",
    hint: "Yes, exception chains can be nested to arbitrary depths.",
    level: "basic",
    codeExample: "# Level 1 -> Level 2 -> Level 3 full causal chain"
  },
  {
    question: "How do you access the original root cause programmatically in Python code?",
    shortAnswer: "By reading the 'err.__cause__' attribute on the caught exception instance.",
    explanation: "Returns the original exception instance (or None if unchained).",
    hint: "Read the err.__cause__ attribute.",
    level: "basic",
    codeExample: "except HighLevelError as e:\n    root = e.__cause__"
  },
  {
    question: "What happens if both '__cause__' and '__context__' are present on an exception?",
    shortAnswer: "If '__cause__' is explicitly set (even to None), Python ignores '__context__' and renders only the explicit cause (or suppresses it if None).",
    explanation: "Explicit '__cause__' always takes priority over implicit '__context__'.",
    hint: "Explicit __cause__ overrides implicit __context__.",
    level: "complex",
    codeExample: "# __cause__ takes precedence over __context__"
  },
  {
    question: "Why should you NOT use bare 'raise NewError' inside an 'except' block when translating exceptions?",
    shortAnswer: "Because it relies on implicit chaining ('__context__'), which displays confusing 'During handling...' messages instead of clear causal 'direct cause' relationships.",
    explanation: "Always use explicit 'raise NewError from old_error' for intentional translation.",
    hint: "Use explicit 'from e' to signal intentional causal translation.",
    level: "moderate",
    codeExample: "# Prefer: raise DomainError from e\n# Over: raise DomainError"
  },
  {
    question: "Can you iterate through an entire exception causal chain programmatically?",
    shortAnswer: "Yes. Use a simple while loop: 'current = err; while current.__cause__: current = current.__cause__' to find the primordial root cause.",
    explanation: "Common utility function in enterprise error reporting libraries.",
    hint: "Traverse current = current.__cause__ in a loop.",
    level: "complex",
    codeExample: "def get_root(e):\n    while e.__cause__: e = e.__cause__\n    return e"
  },
  {
    question: "How does exception chaining interact with 'sys.exc_info()'?",
    shortAnswer: "'sys.exc_info()' returns only the topmost active exception; chained ancestors are accessed via the returned exception's '__cause__' or '__context__' attributes.",
    explanation: "Keeps sys.exc_info() focused on the currently active event.",
    hint: "sys.exc_info() returns topmost exception; inspect its __cause__.",
    level: "complex",
    codeExample: "exc_type, exc_val, tb = sys.exc_info()\nroot = exc_val.__cause__"
  },
  {
    question: "What is the relationship between PEP 3134 and Python 2 vs Python 3?",
    shortAnswer: "PEP 3134 introduced exception chaining in Python 3; Python 2 had no native 'raise ... from ...' syntax and would lose or overwrite root tracebacks when new exceptions were raised.",
    explanation: "A major evolutionary upgrade in Python 3's error handling model.",
    hint: "PEP 3134 added native chaining in Python 3; Python 2 lacked 'raise from'.",
    level: "basic",
    codeExample: "# Python 3 native feature: raise B from A"
  },
  {
    question: "Can you chain exceptions inside an asynchronous coroutine ('async def')?",
    shortAnswer: "Yes. Exception chaining works identically in synchronous functions, asynchronous coroutines, and generator functions.",
    explanation: "Standard part of the Python runtime core.",
    hint: "Yes, fully supported in async/await coroutines.",
    level: "basic",
    codeExample: "async def fetch():\n    raise APIError from timeout_err"
  },
  {
    question: "What is the difference between 'raise' and 'raise err from err'?",
    shortAnswer: "'raise' re-raises the active exception as-is; 'raise err from err' creates a confusing circular self-referencing causal loop (err.__cause__ = err) and should never be done.",
    explanation: "Always use bare 'raise' to re-raise.",
    hint: "Use bare 'raise' to re-raise; never chain an exception to itself.",
    level: "complex",
    codeExample: "# Anti-pattern: raise e from e -> Circular chain!"
  },
  {
    question: "How does the 'traceback' module print chained exceptions?",
    shortAnswer: "'traceback.print_exc()' and 'traceback.format_exc()' automatically traverse '__cause__' and '__context__' chains, printing the complete multi-tier traceback by default.",
    explanation: "Provides complete forensic visibility out of the box.",
    hint: "traceback module automatically prints the entire chained hierarchy.",
    level: "moderate",
    codeExample: "import traceback\ntraceback.print_exc()  # Prints all chained tracebacks"
  },
  {
    question: "Can you attach custom metadata to an exception before chaining it?",
    shortAnswer: "Yes. You can populate attributes on the new domain exception (e.g. 'new_err.txn_id = 99') and then execute 'raise new_err from old_err'.",
    explanation: "Combines rich domain payloads with root cause tracing.",
    hint: "Yes, set attributes on the new exception and chain with 'from'.",
    level: "basic",
    codeExample: "err = DomainError('Failed'); err.txn_id = 99; raise err from e"
  },
  {
    question: "What is a 'Causal Audit Log'?",
    shortAnswer: "A structured log entry that records both the high-level business operation failure and the exact low-level technical root cause extracted from '__cause__'.",
    explanation: "Bridges the gap between business reporting and technical debugging.",
    hint: "Logging both high-level business error and technical root cause.",
    level: "basic",
    codeExample: "logger.error(f'{err} caused by {err.__cause__}')"
  },
  {
    question: "How does 'pytest' handle testing chained exceptions?",
    shortAnswer: "You catch the outer exception with 'with pytest.raises(OuterError) as exc_info:', and then assert 'isinstance(exc_info.value.__cause__, InnerError)'.",
    explanation: "Enables precise unit testing of translation layers.",
    hint: "Assert isinstance(exc_info.value.__cause__, InnerError).",
    level: "moderate",
    codeExample: "with pytest.raises(PortalError) as exc:\n    service.query()\nassert isinstance(exc.value.__cause__, KeyError)"
  },
  {
    question: "When should you prefer 'raise ... from None' over 'raise ... from e'?",
    shortAnswer: "Use 'from None' when the underlying error is an internal implementation detail that adds noise or leaks sensitive data; use 'from e' when the underlying error provides vital forensic context for debugging.",
    explanation: "Balances security/cleanliness with diagnostic transparency.",
    hint: "Use 'from None' to hide noise/secrets; use 'from e' for forensic debugging.",
    level: "moderate",
    codeExample: "# Clean UI: from None\n# Internal backend debugging: from e"
  },
  {
    question: "What is the ultimate golden rule for Exception Chaining in Python?",
    shortAnswer: "Always use explicit 'raise DomainError(...) from original_err' when translating low-level errors into high-level domain exceptions, use 'from None' to sanitize public-facing errors, and inspect '__cause__' for telemetry and debugging.",
    explanation: "Maintains pristine abstraction boundaries while preserving complete forensic traceability.",
    hint: "Use 'from e' for domain translation, 'from None' for sanitized UI errors, and inspect __cause__.",
    level: "basic",
    codeExample: "# Complete, professional Python exception chaining"
  }
];

export default questions;
