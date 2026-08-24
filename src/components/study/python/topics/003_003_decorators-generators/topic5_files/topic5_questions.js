// src/components/study/python/topics/003_003_decorators-generators/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Chaining multiple decorators

const questions = [
  {
    question: "What is Decorator Chaining in Python?",
    shortAnswer: "Applying multiple stacked decorators to a single function or method to compose multiple cross-cutting behaviors (e.g. auth, caching, logging, timing) into a sequential processing pipeline.",
    explanation: "Core mechanism of Python middleware architecture.",
    hint: "Stacking multiple @decorators above a single function definition.",
    level: "basic",
    codeExample: "@auth\n@cache\n@timer\ndef get_data(): pass"
  },
  {
    question: "In what order are stacked decorators evaluated at definition time?",
    shortAnswer: "From BOTTOM to TOP (closest to the function first). Writing '@A @B def f()' is evaluated as 'f = A(B(f))'.",
    explanation: "B wraps f first, then A wraps the result of B(f).",
    hint: "Bottom to top: closest decorator wraps first.",
    level: "basic",
    codeExample: "# @A\n# @B\n# def f(): ... -> f = A(B(f))"
  },
  {
    question: "In what order do stacked decorators execute at runtime invocation?",
    shortAnswer: "From TOP to BOTTOM on function entry (outermost layer runs first), and BOTTOM to TOP on function exit (outermost layer returns last) — exactly like an Onion.",
    explanation: "The classic Decorator Onion Layer Model.",
    hint: "Top to bottom on entry; bottom to top on exit (Onion model).",
    level: "basic",
    codeExample: "# Entry: A -> B -> Core; Exit: Core -> B -> A"
  },
  {
    question: "What is the Critical Security Hazard when chaining '@require_auth' and '@cache' in the wrong order?",
    shortAnswer: "If you place '@cache' above '@require_auth' ('@cache @require_auth'), an unauthenticated attacker can query the endpoint and receive cached private data from a previous admin's session without ever triggering the auth check!",
    explanation: "A severe production vulnerability caused by decorator misordering.",
    hint: "@require_auth must be on TOP so unauthenticated requests are blocked before cache lookup.",
    level: "complex",
    codeExample: "# DANGEROUS: @cache @auth def secret(): pass\n# SECURE: @auth @cache def secret(): pass"
  },
  {
    question: "What is the rule when stacking custom decorators with built-in '@classmethod' or '@staticmethod'?",
    shortAnswer: "'@classmethod' and '@staticmethod' MUST be the outermost decorator (placed on the very top of the stack).",
    explanation: "Built-in classmethod objects do not have standard function attributes needed by custom wrappers.",
    hint: "@classmethod / @staticmethod must always be placed on the very top.",
    level: "moderate",
    codeExample: "@classmethod\n@custom_audit\ndef make(cls): pass"
  },
  {
    question: "What happens if one decorator in the middle of a chain raises an unhandled exception?",
    shortAnswer: "The chain execution halts immediately; downstream decorators and the core function are skipped, and the exception bubbles upward through upstream decorators' 'except' / 'finally' blocks.",
    explanation: "Standard Python exception propagation through call frames.",
    hint: "Downstream decorators and core function are skipped; error propagates up.",
    level: "basic",
    codeExample: "# If Layer 1 fails, Layers 2, 3, and Core never execute"
  },
  {
    question: "How does '@functools.wraps' handle multiple chained decorators?",
    shortAnswer: "Each wrapper records the previous wrapper in its '__wrapped__' attribute, creating an unwrappable chain linked all the way down to the original raw function.",
    explanation: "Enables multi-layer inspection and unwrapped unit testing.",
    hint: "Creates a linked chain of __wrapped__ attributes.",
    level: "complex",
    codeExample: "raw_func = decorated.__wrapped__.__wrapped__"
  },
  {
    question: "How many decorators can be stacked on a single function in Python?",
    shortAnswer: "There is no fixed language limit in Python; you can chain as many decorators as needed, though 3 to 5 is recommended for maintainability and readability.",
    explanation: "Limited only by Python's recursion / stack frame limits.",
    hint: "No hard limit; 3-5 is typical for clean software engineering.",
    level: "basic",
    codeExample: "# Can stack 10+ decorators if needed"
  },
  {
    question: "Can decorators in a chain pass context or metadata to each other?",
    shortAnswer: "Yes. By adding custom metadata to 'kwargs', setting attributes on request/session objects, or using Python's 'contextvars' module.",
    explanation: "Standard pattern for pipeline context propagation.",
    hint: "Via kwargs, shared request context objects, or contextvars.",
    level: "moderate",
    codeExample: "kwargs['audit_id'] = 'TX-101'\nreturn func(*args, **kwargs)"
  },
  {
    question: "What is the recommended ordering for a full-stack web endpoint decorator chain?",
    shortAnswer: "1. Rate Limiting -> 2. Authentication / RBAC -> 3. Input Validation -> 4. Caching -> 5. Latency Profiling -> Core Controller.",
    explanation: "Fails fast at the cheapest security layer before expending resources.",
    hint: "RateLimit -> Auth -> Validation -> Cache -> Timing -> Core.",
    level: "complex",
    codeExample: "@rate_limit\n@require_auth\n@validate\n@cache\n@timer\ndef api(): pass"
  },
  {
    question: "How do you unwrap all decorator layers to access the primordial function using 'inspect.unwrap'?",
    shortAnswer: "'inspect.unwrap(decorated_function)' follows the entire '__wrapped__' chain recursively and returns the original base function.",
    explanation: "Standard library tool for testing decorated functions.",
    hint: "Use inspect.unwrap(decorated_func).",
    level: "moderate",
    codeExample: "import inspect\nraw = inspect.unwrap(stacked_func)"
  },
  {
    question: "What is the performance overhead of chaining 5 decorators on a function?",
    shortAnswer: "Approximately 5 extra function call frame allocations (~500-1000 nanoseconds total), which is virtually undetectable compared to database or network I/O.",
    explanation: "Extremely lightweight runtime footprint.",
    hint: "~1 microsecond total overhead; negligible compared to I/O.",
    level: "basic",
    codeExample: "# Nanosecond overhead"
  },
  {
    question: "Can a decorator in a chain alter the return value before subsequent outer decorators receive it?",
    shortAnswer: "Yes. The return value passes upward through the exit phase of each wrapper, allowing each outer decorator to transform or format the output sequentially.",
    explanation: "Sequential output transformation pipeline.",
    hint: "Yes, each wrapper receives the return value of the inner wrapper on exit.",
    level: "basic",
    codeExample: "# Innermost returns dict -> Middle converts to JSON -> Outer adds headers"
  },
  {
    question: "Can stacked decorators be applied to async 'async def' functions?",
    shortAnswer: "Yes, provided every decorator wrapper in the chain is declared as 'async def wrapper(*args, **kwargs):' and uses 'await func(*args, **kwargs)'.",
    explanation: "Async decorator stacking in FastAPI and AIOHTTP.",
    hint: "Yes, if all wrappers in the stack are async def and await the inner call.",
    level: "complex",
    codeExample: "@async_auth\n@async_cache\nasync def handler(): pass"
  },
  {
    question: "What is the 'Pyramid of Decorators' antipattern?",
    shortAnswer: "Stacking 8-10+ disparate decorators on every function, causing high cognitive complexity and confusing execution order; better solved by composing them into a single composite decorator.",
    explanation: "Solve excessive stacking using composite macro decorators.",
    hint: "Excessive stacking (8+ decorators); solve using composite decorators.",
    level: "moderate",
    codeExample: "# Bundle multiple decorators into @standard_api_endpoint"
  },
  {
    question: "How do you write a 'Composite Decorator' that bundles 3 decorators into one?",
    shortAnswer: "By defining a function that applies each decorator in sequence: 'def composite(f): return dec1(dec2(dec3(f)))'.",
    explanation: "Simplifies syntax across hundreds of microservice endpoints.",
    hint: "return dec1(dec2(dec3(func))).",
    level: "complex",
    codeExample: "def secured_endpoint(f):\n    return require_auth(rate_limit(audit_log(f)))"
  },
  {
    question: "What happens if an inner decorator forgets to use '@functools.wraps' in a chain of 4 decorators?",
    shortAnswer: "The '__wrapped__' introspection chain is broken at that level, and all outer decorators will receive the generic name 'wrapper' instead of the true function name.",
    explanation: "Breaks the metadata inheritance chain.",
    hint: "Breaks the __wrapped__ chain and corrupts function metadata.",
    level: "moderate",
    codeExample: "# Always apply @functools.wraps at EVERY level in the chain"
  },
  {
    question: "Can a decorator in the chain modify positional 'args' while another modifies keyword 'kwargs'?",
    shortAnswer: "Yes. Each wrapper has full read/write access to '*args' and '**kwargs' before forwarding them down to the next layer in the stack.",
    explanation: "Enables modular argument preprocessing.",
    hint: "Yes, each wrapper can manipulate args and kwargs independently.",
    level: "basic",
    codeExample: "# Layer 1 casts args; Layer 2 injects session into kwargs"
  },
  {
    question: "How does Django use decorator chaining in view routing?",
    shortAnswer: "Django views frequently chain '@login_required', '@permission_required', '@require_POST', and '@csrf_protect' above view controller functions.",
    explanation: "Classic production example of chained decorators.",
    hint: "Chains @login_required, @permission_required, @require_http_methods.",
    level: "basic",
    codeExample: "@login_required\n@require_POST\ndef delete_view(request): pass"
  },
  {
    question: "What is the interaction between Decorator Chaining and Context Managers ('with' statements)?",
    shortAnswer: "Decorators can encapsulate context managers (e.g. 'with db_transaction(): return func(*args)') so every function in the pipeline automatically runs inside an atomic transaction.",
    explanation: "Combines context manager safety with declarative decorator syntax.",
    hint: "Decorators can wrap func calls inside 'with' blocks for transactions/locks.",
    level: "moderate",
    codeExample: "def atomic_db(func):\n    def wrapper(*a, **kw):\n        with transaction(): return func(*a, **kw)\n    return wrapper"
  },
  {
    question: "Can a decorator chain be configured conditionally at runtime?",
    shortAnswer: "Yes, by defining custom decorator factory logic or using helper wrapper functions that check environment flags before dispatching to specific layers.",
    explanation: "Enables dynamic feature flagging.",
    hint: "Yes, by adding conditional branches inside decorator factory functions.",
    level: "moderate",
    codeExample: "if feature_enabled: return full_pipeline(f)\nreturn f"
  },
  {
    question: "Why does Python evaluate decorator factories BEFORE applying decorator wrapping?",
    shortAnswer: "Because Python must first resolve expressions (evaluating factory arguments to obtain decorator functions) before it can compose the resulting callables in bottom-up order.",
    explanation: "Standard expression evaluation precedence in Python grammar.",
    hint: "Factory calls are expressions evaluated to produce decorator objects first.",
    level: "complex",
    codeExample: "# dec_a() and dec_b() evaluate first, then wrapping occurs"
  },
  {
    question: "How do you debug a bug in a 4-decorator chain?",
    shortAnswer: "By printing execution logs at the entry and exit points of each wrapper, or using 'inspect.unwrap()' to test each decorator layer in isolation.",
    explanation: "Systematic isolation and tracing.",
    hint: "Trace entry/exit logs per layer or test each decorator in isolation with inspect.unwrap.",
    level: "moderate",
    codeExample: "# Place entry/exit logs in each wrapper to trace flow"
  },
  {
    question: "What is the 'Short-Circuiting' behavior in chained decorators?",
    shortAnswer: "When an outer decorator (like auth or rate-limiting) rejects a request and returns an error or cached response early, preventing all subsequent inner decorators and the core function from running.",
    explanation: "Saves computational resources on rejected requests.",
    hint: "Outer decorators return early or raise errors, skipping inner layers entirely.",
    level: "basic",
    codeExample: "if not authenticated: return 401 # Skips inner decorators"
  },
  {
    question: "What is the ultimate golden rule for Chaining Multiple Decorators in Python?",
    shortAnswer: "Always wrap bottom-up but design for top-down onion layer execution: place Gatekeepers & Auth outermost, Caching second, Profiling/Logging innermost, and always use '@functools.wraps' at every single level.",
    explanation: "The bedrock principle of robust Python enterprise software engineering.",
    hint: "Gatekeepers outermost, caching second, profiling innermost, use @functools.wraps.",
    level: "basic",
    codeExample: "# Enterprise-grade decorator chaining mastery"
  }
];

export default questions;
