// src/components/study/python/topics/003_003_decorators-generators/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Writing custom decorators (logging, timing execution, authentication)

const questions = [
  {
    question: "What is the primary architectural purpose of writing Custom Decorators in Python?",
    shortAnswer: "To encapsulate cross-cutting concerns (such as logging, execution timing, authentication, rate limiting, and caching) into reusable modules without polluting business logic.",
    explanation: "Adheres to the Single Responsibility Principle and DRY.",
    hint: "Separates cross-cutting concerns (logging, auth, timing) from core business logic.",
    level: "basic",
    codeExample: "@audit_log\n@require_auth\ndef process_payment(): pass"
  },
  {
    question: "Why is 'time.perf_counter()' preferred over 'time.time()' for execution timing decorators?",
    shortAnswer: "'time.perf_counter()' uses a high-resolution monotonic hardware clock that is immune to system clock adjustments and NTP syncs, providing microsecond-accurate benchmarking.",
    explanation: "'time.time()' can jump backward or forward if system time changes.",
    hint: "perf_counter() is monotonic and provides high-resolution hardware timing.",
    level: "basic",
    codeExample: "t0 = time.perf_counter()\nres = func(*args)\nelapsed = time.perf_counter() - t0"
  },
  {
    question: "How can a decorator track the invocation count of a function across its lifetime?",
    shortAnswer: "By attaching a state counter attribute directly to the wrapper function object (e.g. 'wrapper.calls += 1' with 'wrapper.calls = 0' defined on wrapper creation).",
    explanation: "Leverages the fact that functions in Python are mutable objects with a __dict__.",
    hint: "Attach a counter attribute directly to the wrapper function object.",
    level: "moderate",
    codeExample: "def counter(fn):\n    def wrapper(*a, **kw):\n        wrapper.calls += 1\n        return fn(*a, **kw)\n    wrapper.calls = 0\n    return wrapper"
  },
  {
    question: "What is an 'RBAC' (Role-Based Access Control) security decorator?",
    shortAnswer: "A decorator that checks the active user's role against a list of authorized roles before allowing the decorated function to execute, raising 'PermissionError' if unauthorized.",
    explanation: "Standard pattern for securing endpoints in Django, FastAPI, and Flask.",
    hint: "A decorator that restricts function execution to specific user roles.",
    level: "basic",
    codeExample: "@require_role('ADMIN', 'MANAGER')\ndef delete_record(): pass"
  },
  {
    question: "How does a Rate-Limiting decorator prevent API abuse?",
    shortAnswer: "By maintaining a sliding window of recent invocation timestamps (or token bucket) in its closure, raising an exception if calls exceed the maximum allowed threshold within a time window.",
    explanation: "Protects against brute-force login attempts and DDOS.",
    hint: "Tracks timestamps in a closure window to block excessive calls.",
    level: "moderate",
    codeExample: "@rate_limit(max_per_minute=5)\ndef submit_login(): pass"
  },
  {
    question: "Can a custom decorator capture both positional and keyword arguments for structured logging?",
    shortAnswer: "Yes. By formatting 'args' (tuple) and 'kwargs' (dict) inside the wrapper: 'f\"args={args}, kwargs={kwargs}\"'.",
    explanation: "Provides complete forensic visibility into input parameters.",
    hint: "Yes, by inspecting args and kwargs directly in the wrapper body.",
    level: "basic",
    codeExample: "logger.info(f'{func.__name__} called with {args}, {kwargs}')"
  },
  {
    question: "How can a timing decorator emit warnings only when a function runs slower than a specified threshold?",
    shortAnswer: "By calculating elapsed time and comparing it against a threshold: 'if elapsed_ms > threshold_ms: logger.warning(...)'.",
    explanation: "Reduces log noise by alerting only on performance degradation.",
    hint: "Compare elapsed time against a threshold and log a warning if exceeded.",
    level: "basic",
    codeExample: "if elapsed > 0.050:\n    logger.warning(f'Slow execution: {elapsed}s')"
  },
  {
    question: "What is the 'Retry on Failure' decorator pattern?",
    shortAnswer: "A decorator that executes 'func(*args, **kwargs)' inside a loop with 'try...except', catching transient network/database errors and retrying up to N times before giving up.",
    explanation: "Crucial for microservice network resilience.",
    hint: "Catches exceptions and retries function execution up to N times.",
    level: "moderate",
    codeExample: "for attempt in range(3):\n    try: return func()\n    except TransientError: sleep(1)"
  },
  {
    question: "How can an authentication decorator extract user session info in web frameworks?",
    shortAnswer: "By inspecting 'request.user' or session tokens passed via keyword arguments, thread-local storage, or context variables ('contextvars').",
    explanation: "Standard integration with web request contexts.",
    hint: "Inspects request.user or context variables passed in args/kwargs.",
    level: "moderate",
    codeExample: "user = kwargs.get('user') or request.user"
  },
  {
    question: "Why should custom decorators never swallow exceptions unless explicitly designed as a fallback handler?",
    shortAnswer: "Because swallowing exceptions hides system bugs, masks database write failures, and prevents callers from handling errors properly.",
    explanation: "Follows Python's 'Errors should never pass silently' Zen rule.",
    hint: "Swallowing exceptions hides bugs and corrupts application state.",
    level: "basic",
    codeExample: "# Anti-pattern: except Exception: pass in decorator"
  },
  {
    question: "Can a decorator log the return value of a function?",
    shortAnswer: "Yes. Capture 'result = func(*args, **kwargs)', log 'result', and then return 'result' to the caller.",
    explanation: "Enables comprehensive request/response audit trails.",
    hint: "Capture the return value in a variable, log it, and return it.",
    level: "basic",
    codeExample: "res = func(*args, **kwargs)\nlogger.info(f'Return: {res}')\nreturn res"
  },
  {
    question: "How can a decorator sanitize sensitive arguments (like passwords or credit card numbers) before logging?",
    shortAnswer: "By filtering 'kwargs' to mask sensitive keys (e.g. replacing 'password' value with '***') before writing to logs.",
    explanation: "Essential for GDPR and PCI-DSS compliance.",
    hint: "Mask sensitive keys (password, cvv) in kwargs before logging.",
    level: "moderate",
    codeExample: "clean_kwargs = {k: '***' if 'pass' in k else v for k, v in kwargs.items()}"
  },
  {
    question: "How does a caching decorator differ from a timing decorator?",
    shortAnswer: "A timing decorator always invokes 'func()' and measures duration; a caching decorator checks if the argument tuple exists in cache, returning immediately on a hit without calling 'func()'.",
    explanation: "Timing adds observation; caching alters control flow to optimize performance.",
    hint: "Caching skips calling func() on cache hits; timing always calls func().",
    level: "basic",
    codeExample: "# Caching short-circuits execution"
  },
  {
    question: "Can a custom decorator be applied to asynchronous 'async def' coroutines?",
    shortAnswer: "Yes, but the inner wrapper must also be declared as 'async def wrapper(*args, **kwargs):' and use 'await func(*args, **kwargs)'.",
    explanation: "Decorating coroutines requires async wrappers.",
    hint: "The inner wrapper must be async def and await the target function.",
    level: "complex",
    codeExample: "async def wrapper(*a, **kw):\n    return await func(*a, **kw)"
  },
  {
    question: "What is the 'Deprecated' warning decorator?",
    shortAnswer: "A decorator that emits a 'warnings.warn(\"deprecated\", DeprecationWarning)' when an obsolete function is invoked, alerting developers during migrations.",
    explanation: "Standard library pattern for API lifecycle management.",
    hint: "Emits a DeprecationWarning when an old function is called.",
    level: "basic",
    codeExample: "warnings.warn(f'{func.__name__} is deprecated', DeprecationWarning)"
  },
  {
    question: "How do you test a custom decorator in pytest?",
    shortAnswer: "Apply the decorator to a dummy mock function and assert that pre/post conditions (logs, timing metrics, exceptions) behave as expected when calling the decorated mock.",
    explanation: "Verifies wrapper behavior in isolation.",
    hint: "Decorate a test function and assert on return value, timing, or side-effects.",
    level: "moderate",
    codeExample: "def test_timer():\n    @timer\n    def sample(): sleep(0.01)\n    sample()"
  },
  {
    question: "What is a 'Type Validation' decorator?",
    shortAnswer: "A decorator that inspects function type annotations ('__annotations__') and verifies that passed runtime argument types match declared type hints, raising TypeError on mismatch.",
    explanation: "Enforces strict type contracts in dynamic Python code.",
    hint: "Checks runtime argument types against __annotations__.",
    level: "complex",
    codeExample: "@type_check\ndef calc(x: int, y: float): ..."
  },
  {
    question: "Can a decorator store historical execution statistics across multiple runs?",
    shortAnswer: "Yes. By appending metrics (e.g. durations, timestamps) to a list stored in the decorator's closure or wrapper attributes.",
    explanation: "Enables in-memory profiling and latency tracking.",
    hint: "Yes, by storing metrics in a closure list or wrapper attribute.",
    level: "moderate",
    codeExample: "wrapper.history.append(duration)"
  },
  {
    question: "How do you handle keyword-only arguments in custom decorators?",
    shortAnswer: "'*args, **kwargs' automatically captures all keyword-only arguments in the 'kwargs' dictionary, preserving their keyword-only nature when forwarded.",
    explanation: "Universal forwarding handles all argument styles.",
    hint: "**kwargs captures all keyword-only arguments automatically.",
    level: "basic",
    codeExample: "func(*args, **kwargs)  # Forwards keyword-only arguments"
  },
  {
    question: "Why is placing authorization logic in a decorator better than inside the function body?",
    shortAnswer: "It makes security declarative, auditable at a glance, prevents developers from forgetting auth checks, and decouples permissions from core business calculations.",
    explanation: "Reduces security vulnerabilities across enterprise backends.",
    hint: "Declarative security prevents human error and keeps business logic clean.",
    level: "basic",
    codeExample: "# @require_admin makes permissions immediately visible"
  },
  {
    question: "What is the 'Thread-Safety' consideration for stateful decorators in multithreaded apps?",
    shortAnswer: "When mutating shared closure state (like call counters or sliding rate-limit windows), access must be synchronized using 'threading.Lock()' to avoid race conditions.",
    explanation: "Critical for concurrent production web services (Gunicorn/FastAPI).",
    hint: "Use threading.Lock() when mutating shared state in multithreaded environments.",
    level: "complex",
    codeExample: "with lock:\n    wrapper.calls += 1"
  },
  {
    question: "Can a decorator modify global variables?",
    shortAnswer: "Yes, but modifying globals inside decorators is an anti-pattern; state should be encapsulated in closures or wrapper attributes instead.",
    explanation: "Avoid global state pollution.",
    hint: "Possible, but encapsulating state in closures is vastly preferred.",
    level: "basic",
    codeExample: "# Prefer closure state over global variables"
  },
  {
    question: "What is the 'Singleton Class' decorator pattern?",
    shortAnswer: "A class decorator that wraps a class and ensures only one instance is ever created, returning the cached instance on subsequent instantiations.",
    explanation: "Implements the classic Creational Singleton Pattern.",
    hint: "Ensures only one instance of a class is created.",
    level: "complex",
    codeExample: "instances = {}\ndef singleton(cls):\n    def get(): return instances.setdefault(cls, cls())\n    return get"
  },
  {
    question: "How can decorators be chained to build a multi-layered security and monitoring pipeline?",
    shortAnswer: "By stacking them above the target function: '@audit_log', '@measure_latency', '@rate_limit', '@require_role', creating a sequential interceptor pipeline.",
    explanation: "The hallmark of clean, modular middleware architecture.",
    hint: "Stack decorators sequentially: @audit @timer @rate_limit @require_role.",
    level: "basic",
    codeExample: "@audit\n@timer\n@require_admin\ndef delete_student(): pass"
  },
  {
    question: "What is the ultimate golden rule for writing Custom Decorators in Python?",
    shortAnswer: "Keep each decorator focused on a single cross-cutting concern, always use '@functools.wraps(func)', accept and forward '*args, **kwargs', return the original evaluated result, and handle security/timing cleanly without side-effect pollution.",
    explanation: "The foundation of maintainable, high-performance Python architectures.",
    hint: "Single responsibility, use @functools.wraps, forward *args/**kwargs, return result.",
    level: "basic",
    codeExample: "# Production-grade custom decorator mastery"
  }
];

export default questions;
