// src/components/study/python/topics/003_005_advance-comprehensions/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Pure functions & immutable programming principles in Python

const questions = [
  {
    question: "What are the two mandatory criteria that define a 'Pure Function' in Python?",
    shortAnswer: "1. Determinism: Given the same arguments, it ALWAYS returns the exact same result. 2. Zero Side-Effects: It does not mutate input arguments, global variables, or external system state (I/O, files, network).",
    explanation: "The formal definition of mathematical functional purity.",
    hint: "1. Deterministic output for same inputs. 2. No side-effects on external state or input arguments.",
    level: "basic",
    codeExample: "def pure_add(a, b): return a + b # 100% Pure"
  },
  {
    question: "What is 'Referential Transparency' in functional programming?",
    shortAnswer: "An expression or function call is referentially transparent if it can be replaced with its evaluated return value anywhere in the program without altering the program's behavior.",
    explanation: "Enables safe compiler optimizations, memoization, and mathematical reasoning.",
    hint: "The function call can be replaced directly with its return value without altering behavior.",
    level: "moderate",
    codeExample: "# pure_square(4) can be replaced with 16 anywhere in the codebase"
  },
  {
    question: "Why is mutating an input dictionary or list in-place inside a function considered dangerous?",
    shortAnswer: "Because it alters the caller's data without their knowledge, introducing subtle side-effects, breaking concurrency safety, and making functions unpredictable.",
    explanation: "The hidden mutable state bug.",
    hint: "It destroys the caller's data unexpectedly and causes concurrency bugs.",
    level: "basic",
    codeExample: "# BAD: def add_item(d): d['key'] = 1 # In-place mutation!"
  },
  {
    question: "How does '@dataclass(frozen=True)' enforce immutability on domain model instances?",
    shortAnswer: "It generates '__setattr__' and '__delattr__' methods that raise a 'FrozenInstanceError' whenever any code attempts to modify or delete an attribute on the instance.",
    explanation: "Standard library dataclass immutability enforcement.",
    hint: "Raises FrozenInstanceError on any attribute assignment attempt.",
    level: "basic",
    codeExample: "@dataclass(frozen=True)\nclass User: name: str\nu = User('Alice'); u.name = 'Bob' # FrozenInstanceError!"
  },
  {
    question: "How do you perform a 'Copy-on-Write' update on a frozen dataclass instance?",
    shortAnswer: "Using 'dataclasses.replace(instance, **changes)', which returns a brand new frozen instance containing the modified fields while leaving the original untouched.",
    explanation: "Pure non-mutating update pattern for dataclasses.",
    hint: "Use dataclasses.replace(instance, **changes).",
    level: "basic",
    codeExample: "updated_user = dataclasses.replace(user, name='Bob')"
  },
  {
    question: "Why MUST list fields in a frozen dataclass be typed as 'Tuple' instead of 'List'?",
    shortAnswer: "'frozen=True' only prevents reassigning the attribute reference ('obj.badges = ...'); if 'badges' is a mutable 'list', its contents can still be mutated in-place ('obj.badges.append(...)').",
    explanation: "Shallow immutability vs deep immutability.",
    hint: "Lists can still be mutated in-place with .append(); tuples are fully immutable.",
    level: "moderate",
    codeExample: "badges: Tuple[str, ...] = () # Safe; List[str] is mutable!"
  },
  {
    question: "What is 'types.MappingProxyType' and when should you use it?",
    shortAnswer: "A standard library wrapper that provides an immutable, read-only view of a dictionary, preventing external callers from modifying internal configuration or lookup maps.",
    explanation: "Read-only dictionary encapsulation.",
    hint: "Provides a read-only view over a dictionary.",
    level: "moderate",
    codeExample: "from types import MappingProxyType\nread_only = MappingProxyType({'api_key': 'secret'})"
  },
  {
    question: "How do Pure Functions eliminate race conditions in multi-threaded concurrent Python applications?",
    shortAnswer: "Because pure functions operate exclusively on immutable data and never modify shared state, multiple threads can execute the function simultaneously without locks ('threading.Lock').",
    explanation: "Lock-free concurrency through immutability.",
    hint: "Threads never mutate shared state, eliminating lock contention and race conditions.",
    level: "moderate",
    codeExample: "# Concurrent threads can read immutable data safely without locks"
  },
  {
    question: "What is the 'Functional State Reducer' pattern ('(state, action) -> new_state')?",
    shortAnswer: "A design pattern where state transitions are computed by a pure reducer function that receives the previous state and an action, returning a new immutable state dictionary without mutating the previous state.",
    explanation: "Redux / Elm architecture for predictable state management.",
    hint: "A pure function taking (old_state, action) and returning new_state.",
    level: "moderate",
    codeExample: "def reducer(state, action): return {**state, 'count': state['count'] + 1}"
  },
  {
    question: "Why is 'random.random()' or 'time.time()' inside a function considered impure?",
    shortAnswer: "Because they introduce non-determinism: calling the function with the exact same arguments produces different return values across successive invocations.",
    explanation: "Non-deterministic side-effects.",
    hint: "They produce different results on every call, violating determinism.",
    level: "basic",
    codeExample: "def get_id(): return time.time() # Impure (non-deterministic)"
  },
  {
    question: "How do you refactor an impure timestamp-dependent function into a pure function?",
    shortAnswer: "Inject the timestamp as an explicit argument ('def generate_receipt(order, timestamp=None):') rather than calling 'time.time()' internally.",
    explanation: "Dependency injection for functional purity.",
    hint: "Pass the timestamp in as an argument instead of calling time.time() internally.",
    level: "moderate",
    codeExample: "def create_log(msg, current_time): return {'msg': msg, 'ts': current_time}"
  },
  {
    question: "What is 'Memoization' and why does it require pure functions?",
    shortAnswer: "Memoization caches return values indexed by function arguments; if a function is impure or relies on external state, the cached value will become stale or incorrect.",
    explanation: "Caching optimization enabled by referential transparency.",
    hint: "Caching results based on inputs requires deterministic pure functions.",
    level: "basic",
    codeExample: "import functools\n@functools.lru_cache\ndef fib(n): ..."
  },
  {
    question: "How do you add an element to an immutable tuple without mutating the original?",
    shortAnswer: "Using tuple unpacking / concatenation: 'new_tuple = (*old_tuple, new_item)' (or 'old_tuple + (new_item,)').",
    explanation: "Non-mutating tuple extension.",
    hint: "Use (*old_tuple, new_item) or old_tuple + (new_item,).",
    level: "basic",
    codeExample: "badges = ('PY', 'AI'); new_badges = (*badges, 'DS')"
  },
  {
    question: "What is a 'frozenset' in Python?",
    shortAnswer: "An immutable version of a Python 'set'; once created, elements cannot be added or removed, making 'frozenset' hashable and usable as dictionary keys or set members.",
    explanation: "Immutable hashable set collection.",
    hint: "An immutable, hashable set that can be used as a dictionary key.",
    level: "basic",
    codeExample: "valid_codes = frozenset(['PY-AI', 'DS-ML'])"
  },
  {
    question: "How do you update a nested key in an immutable dictionary using dictionary unpacking?",
    shortAnswer: "Using nested dictionary unpacking: '{**state, 'user': {**state['user'], 'name': 'Bob'}}'.",
    explanation: "Deep copy-on-write with dictionary unpacking.",
    hint: "Nest {**dict, key: new_val} unpacking expressions.",
    level: "moderate",
    codeExample: "{**state, 'user': {**state['user'], 'status': 'ACTIVE'}}"
  },
  {
    question: "What is 'Time-Travel Debugging' in immutable architectures?",
    shortAnswer: "Because every state transition produces a new immutable snapshot while keeping previous states intact, developers can inspect, replay, or roll back to any historical point in time.",
    explanation: "Auditing and debugging superpowers of immutable state.",
    hint: "Inspecting or replaying past immutable state snapshots without data destruction.",
    level: "moderate",
    codeExample: "history = [state_v0, state_v1, state_v2]"
  },
  {
    question: "Why should default mutable arguments (e.g. 'def func(items=[])') NEVER be used in Python?",
    shortAnswer: "Default arguments are evaluated ONCE at function definition time; mutating 'items.append()' alters the shared default object across all subsequent function calls.",
    explanation: "The infamous Python mutable default argument trap.",
    hint: "Default lists are shared across all invocations; use None as default instead.",
    level: "basic",
    codeExample: "# BAD: def f(x, l=[]): l.append(x) -> GOOD: def f(x, l=None): l = l or []"
  },
  {
    question: "What is the performance tradeoff of immutable data structures in pure Python?",
    shortAnswer: "Creating new object copies on every mutation introduces slight memory allocation and garbage collection overhead compared to in-place mutation, though it eliminates locking overhead.",
    explanation: "Memory allocation vs concurrency safety tradeoff.",
    hint: "Slight allocation overhead for new copies vs massive concurrency and debugging gains.",
    level: "moderate",
    codeExample: "# Tradeoff: Object copies vs lock-free thread safety"
  },
  {
    question: "What third-party libraries provide high-performance persistent immutable data structures in Python?",
    shortAnswer: "'pyrsistent' (providing PVector, PMap, PSet) and 'immutables' (used by Python's asyncio contextvars).",
    explanation: "Production immutable data structure libraries.",
    hint: "pyrsistent and immutables (HAMT trie-based persistent structures).",
    level: "complex",
    codeExample: "from pyrsistent import pvector, pmap"
  },
  {
    question: "How does immutability prevent 'Torn Reads' in concurrent multi-producer environments?",
    shortAnswer: "Readers always receive a complete, unchangeable snapshot; writers create new versions without modifying the version currently being read by other threads.",
    explanation: "Snapshot isolation in RAM.",
    hint: "Readers see an immutable snapshot that is never modified out from under them.",
    level: "moderate",
    codeExample: "# Lock-free snapshot isolation"
  },
  {
    question: "How do you verify whether a function is pure during automated unit testing?",
    shortAnswer: "Call the function multiple times with the same input to verify deterministic outputs, and assert that input argument objects remain identical and unmutated before and after the call.",
    explanation: "Testing purity invariants.",
    hint: "Verify same output on repeat calls and assert input arguments are unchanged.",
    level: "basic",
    codeExample: "assert func(data) == func(data); assert data == original_snapshot"
  },
  {
    question: "What is the difference between shallow copy ('copy.copy') and deep copy ('copy.deepcopy') in immutable workflows?",
    shortAnswer: "Shallow copy duplicates only the outer container; nested mutable objects (e.g. inner lists) remain shared. Deep copy recursively duplicates all nested objects.",
    explanation: "Container copying boundaries.",
    hint: "Shallow copies outer container; deep copy duplicates all nested sub-objects.",
    level: "moderate",
    codeExample: "import copy\ndeep = copy.deepcopy(nested_state)"
  },
  {
    question: "How do you implement a cryptographic audit hash on an immutable record?",
    shortAnswer: "Compute a SHA-256 hash over the deterministic string representation of the record's attributes: 'hashlib.sha256(repr.encode()).hexdigest()'.",
    explanation: "Tamper-proof cryptographic state verification.",
    hint: "Hash the deterministic string representation of the immutable fields with sha256.",
    level: "moderate",
    codeExample: "hashlib.sha256(f'{self.id}|{self.fee}'.encode()).hexdigest()"
  },
  {
    question: "Why are immutable dataclasses automatically hashable if all their fields are hashable?",
    shortAnswer: "Setting 'frozen=True' causes Python to automatically generate a '__hash__' method based on the field values, allowing the dataclass instance to be stored in sets or used as dictionary keys.",
    explanation: "Automatic hash generation in frozen dataclasses.",
    hint: "frozen=True auto-generates __hash__, allowing use in sets and as dict keys.",
    level: "basic",
    codeExample: "@dataclass(frozen=True)\nclass Point: x: int; y: int\npoint_set = {Point(1, 2), Point(3, 4)}"
  },
  {
    question: "What is the ultimate golden rule for Pure Functions and Immutability in Python?",
    shortAnswer: "Write pure functions with zero side-effects and deterministic outputs, model domain entities with '@dataclass(frozen=True)', and manage state transitions via '(state, action) -> new_state' copy-on-write reducers.",
    explanation: "The complete enterprise guideline for pure functional and immutable architecture in Python.",
    hint: "Pure deterministic functions, frozen dataclasses, and copy-on-write state reducers.",
    level: "basic",
    codeExample: "# Python Pure Functional & Immutability Mastery"
  }
];

export default questions;
