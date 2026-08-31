// src/components/study/python/topics/004_004_capstone-projects/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Top Python Technical Interview Questions & Coding Challenges

const questions = [
  {
    question: "How does CPython manage memory and reclaim unused objects?",
    shortAnswer: "CPython uses Reference Counting as its primary memory management mechanism (deallocating an object immediately when its reference count drops to 0), supplemented by a Generational Cyclic Garbage Collector (Generations 0, 1, 2) to detect and reclaim isolated circular references.",
    explanation: "Reference counting combined with generational cyclic garbage collection.",
    hint: "Reference counting for immediate deallocation + cyclic generational GC for circular loops.",
    level: "moderate",
    codeExample: "import sys, gc\nsys.getrefcount(obj) # Inspect ref count\ngc.collect() # Trigger cyclic GC"
  },
  {
    question: "What is the Global Interpreter Lock (GIL) and how does it affect multi-threaded Python programs?",
    shortAnswer: "The GIL is a mutex that protects access to Python objects, preventing multiple native OS threads from executing Python bytecodes simultaneously; CPU-bound tasks do not achieve parallelism with threading, whereas I/O-bound tasks release the GIL during network/disk wait times.",
    explanation: "The GIL mutex and its concurrency implications.",
    hint: "Mutex allowing only one thread to execute bytecodes at a time; affects CPU-bound concurrency.",
    level: "moderate",
    codeExample: "# CPU-bound: use multiprocessing.Pool | I/O-bound: use threading or asyncio"
  },
  {
    question: "What is the 'Mutable Default Argument' trap in Python and how do you fix it?",
    shortAnswer: "Default parameter values are evaluated once when the function definition is executed, not at each call; passing a mutable object (e.g. 'def add(item, target=[])') shares that exact same list instance across all future function invocations. Fix it using 'target=None' and initializing inside the body.",
    explanation: "Function definition-time evaluation of default parameters.",
    hint: "Default arguments are evaluated once at definition time; use 'def f(x, target=None):' instead.",
    level: "basic",
    codeExample: "def append_item(item, target=None):\n    if target is None: target = []\n    target.append(item)\n    return target"
  },
  {
    question: "How is Method Resolution Order (MRO) computed in Python 3 multiple inheritance?",
    shortAnswer: "Python uses the C3 Linearization algorithm to compute a deterministic, monotonic class hierarchy order that respects local precedence ordering and monotonicity; inspect it via 'ClassName.__mro__' or 'ClassName.mro()'.",
    explanation: "C3 Linearization algorithm and multiple inheritance order.",
    hint: "Uses C3 Linearization; inspect with ClassName.__mro__.",
    level: "complex",
    codeExample: "class D(B, C): pass\nprint(D.__mro__) # (D, B, C, A, object)"
  },
  {
    question: "What is the difference between 'is' and '==' in Python?",
    shortAnswer: "'is' checks identity (whether two references point to the exact same memory address, 'id(a) == id(b)'); '==' checks equality (whether two objects have the same value, evaluated via '__eq__').",
    explanation: "Identity comparison vs value equality.",
    hint: "'is' checks memory address (identity); '==' checks value equality.",
    level: "basic",
    codeExample: "a = [1, 2]; b = [1, 2]\na == b # True (values match)\na is b # False (different heap objects)"
  },
  {
    question: "How do you implement an O(1) LRU (Least Recently Used) Cache in Python?",
    shortAnswer: "Using 'collections.OrderedDict' (combining hash map lookups with doubly-linked list ordering) or a custom dictionary paired with a Doubly Linked List; lookups move the accessed key to the end, and evictions remove from the head ('popitem(last=False)').",
    explanation: "LRU Cache architecture and constant time operations.",
    hint: "Use collections.OrderedDict with move_to_end() and popitem(last=False).",
    level: "moderate",
    codeExample: "from collections import OrderedDict\ncache = OrderedDict()\ncache.move_to_end(key) # Mark as recently used\ncache.popitem(last=False) # Evict oldest"
  },
  {
    question: "What is the difference between 'copy.copy()' (shallow) and 'copy.deepcopy()' in Python?",
    shortAnswer: "'copy.copy()' creates a new container object but inserts references to the original child objects; 'copy.deepcopy()' recursively duplicates the container and all nested objects, creating completely independent copies.",
    explanation: "Shallow vs deep object duplication.",
    hint: "Shallow copies the top container only; deepcopy recursively copies all nested objects.",
    level: "basic",
    codeExample: "import copy\nshallow = copy.copy(nested_list)\ndeep = copy.deepcopy(nested_list)"
  },
  {
    question: "What is the 'Late Binding Closures' trap in Python loops and how do you resolve it?",
    shortAnswer: "Variables in closures are looked up when the inner function is called, not when defined; creating lambdas in a loop ('[lambda: i for i in range(3)]') makes all functions return the final loop value (2). Fix by capturing current value as a default argument: 'lambda i=i: i'.",
    explanation: "Late binding closure scope resolution.",
    hint: "Closures resolve variables when called; use default parameter capture 'lambda i=i: i * 2'.",
    level: "moderate",
    codeExample: "funcs = [lambda i=i: i * 2 for i in range(3)]\n[f() for f in funcs] # [0, 2, 4]"
  },
  {
    question: "What are Python Generators and why do they save memory over lists?",
    shortAnswer: "Generators produce items on demand one at a time using 'yield' rather than allocating all elements in memory simultaneously, allowing lazy evaluation of infinite or massive datasets in O(1) space.",
    explanation: "Lazy evaluation and constant space streaming via generators.",
    hint: "Produce values on demand via 'yield', maintaining state with O(1) memory overhead.",
    level: "basic",
    codeExample: "def count_up():\n    n = 1\n    while True: yield n; n += 1"
  },
  {
    question: "How do Context Managers ('with' statement) work under the hood?",
    shortAnswer: "Context managers implement the Context Management Protocol: '__enter__()' runs upon entering the block, returning a resource; '__exit__(exc_type, exc_val, exc_tb)' guarantees cleanup and handles exceptions even if an error occurs inside the block.",
    explanation: "The Context Management protocol (__enter__ and __exit__).",
    hint: "Implements __enter__() for setup and __exit__() for guaranteed cleanup/exception handling.",
    level: "basic",
    codeExample: "class ManagedFile:\n    def __enter__(self): return self\n    def __exit__(self, exc_type, exc_val, tb): pass"
  },
  {
    question: "What is the difference between Threading, Multiprocessing, and Asyncio in Python?",
    shortAnswer: "Threading uses OS threads (ideal for I/O-bound concurrency, limited by GIL for CPU); Multiprocessing spawns separate OS processes with separate memory and GILs (ideal for CPU-bound tasks); Asyncio uses a single-threaded cooperative event loop (ideal for high-concurrency network I/O with minimal memory overhead).",
    explanation: "Concurrency paradigm tradeoffs in Python.",
    hint: "Threading (I/O, shared memory), Multiprocessing (CPU, isolated memory), Asyncio (cooperative I/O event loop).",
    level: "moderate",
    codeExample: "# Multiprocessing: CPU-bound | Asyncio: Network/Web servers"
  },
  {
    question: "What are '__slots__' in Python classes and when should they be used?",
    shortAnswer: "'__slots__' replaces the default dynamic instance '__dict__' dictionary with a fixed-size array of attribute descriptors, reducing memory footprint by ~60% and speeding up attribute access when creating millions of small objects.",
    explanation: "Memory optimization via __slots__.",
    hint: "Replaces __dict__ with a fixed tuple, reducing instance memory by ~60%.",
    level: "moderate",
    codeExample: "class Student:\n    __slots__ = ('sid', 'name', 'gpa')"
  },
  {
    question: "How does Python handle integer caching (Small Integer Caching)?",
    shortAnswer: "CPython pre-allocates an array of small integer objects in memory between -5 and 256; any integer in this range shares the same singleton object reference ('a = 100; b = 100; a is b' is True).",
    explanation: "Small integer optimization in CPython (-5 to 256).",
    hint: "Integers between -5 and 256 are cached singletons in CPython.",
    level: "basic",
    codeExample: "x = 256; y = 256; x is y # True\nx = 1000; y = 1000; x is y # False"
  },
  {
    question: "What is the time complexity of common Python dict and list operations?",
    shortAnswer: "Dict: Lookups O(1) average / O(n) worst; Insertion O(1) avg; Deletion O(1) avg. List: Append O(1) amortized; Pop end O(1); Pop index 0 O(n); Search O(n).",
    explanation: "Big-O complexities of core Python data structures.",
    hint: "Dict lookup is O(1) avg; List append is O(1) amortized, but insert/pop at index 0 is O(n).",
    level: "basic",
    codeExample: "# Use collections.deque for O(1) left pop/append operations"
  },
  {
    question: "What is a 'Metaclass' in Python?",
    shortAnswer: "A metaclass is a class whose instances are classes themselves ('type' is the default metaclass); metaclasses allow customizing class creation, validating class attributes, or registering plugins at import time.",
    explanation: "Class instantiation and metamodel customization.",
    hint: "The blueprint that defines how classes are created; 'type' is the base metaclass.",
    level: "complex",
    codeExample: "class Meta(type):\n    def __new__(cls, name, bases, dct): return super().__new__(cls, name, bases, dct)"
  },
  {
    question: "How do Python Decorators work under the hood?",
    shortAnswer: "A decorator is a higher-order function that takes a callable as input and returns a modified wrapper function; the '@decorator' syntax is syntactic sugar for 'fn = decorator(fn)'. Use 'functools.wraps' to preserve original metadata.",
    explanation: "Higher-order functions and syntactic sugar for decorators.",
    hint: "Higher-order function wrapping another function; @dec is sugar for fn = dec(fn).",
    level: "basic",
    codeExample: "from functools import wraps\ndef log(f):\n    @wraps(f)\n    def w(*a, **kw): return f(*a, **kw)\n    return w"
  },
  {
    question: "What is the difference between '__repr__' and '__str__'?",
    shortAnswer: "'__str__' is intended for end-user readable output ('print(obj)'); '__repr__' is intended for unambiguous developer debugging, ideally evaluating back to the object ('eval(repr(obj)) == obj').",
    explanation: "String representation protocols in Python data model.",
    hint: "__str__ is user-friendly; __repr__ is unambiguous developer/debugger representation.",
    level: "basic",
    codeExample: "class Student:\n    def __str__(self): return self.name\n    def __repr__(self): return f'Student(sid={self.sid!r})'"
  },
  {
    question: "What is 'Monkey Patching' in Python and what are its risks?",
    shortAnswer: "Monkey patching is dynamically modifying a module, class, or function at runtime (often used in testing with 'unittest.mock'); in production, it can cause unpredictable side effects, race conditions, and difficult-to-trace bugs.",
    explanation: "Runtime modification of classes and modules.",
    hint: "Modifying classes/modules at runtime; useful in tests but risky in production.",
    level: "moderate",
    codeExample: "import math\nmath.sin = lambda x: 0 # Monkey patching (Risky in prod!)"
  },
  {
    question: "How do you solve the classic 'Two Sum' problem in O(n) time in Python?",
    shortAnswer: "Iterate through the list while maintaining a hash map (dictionary) of 'seen_numbers → index'; for each element, check if 'target - num' exists in the dictionary in O(1) time.",
    explanation: "Two-sum hash map lookup algorithm.",
    hint: "Use a dictionary to store seen numbers and check for 'target - num' in O(1) time.",
    level: "basic",
    codeExample: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i"
  },
  {
    question: "What is the ultimate golden rule for acing Python technical interviews?",
    shortAnswer: "Master CPython internals (reference counting, cyclic GC, GIL, MRO, data model dunders), write clean idiomatic Python (list comprehensions, generators, context managers), optimize algorithmic complexities with Big-O analysis, and communicate design tradeoffs clearly.",
    explanation: "The complete senior Python technical interview mastery standard.",
    hint: "CPython internals + data model dunders + Big-O optimization + clear tradeoff communication.",
    level: "basic",
    codeExample: "# Senior Python Technical Interview Mastery"
  }
];

export default questions;
