// src/components/study/python/topics/004_002_performance-optimization/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Memory profiling and reducing object footprint with __slots__

const questions = [
  {
    question: "What is '__slots__' in Python and what primary problem does it solve?",
    shortAnswer: "'__slots__' is a special class-level attribute that tells Python to allocate a fixed-size C struct array for instance attributes instead of a dynamic '__dict__' dictionary, slashing memory footprint by 60-70% and speeding up attribute access.",
    explanation: "Fixed C struct instance attribute allocation.",
    hint: "Replaces dynamic __dict__ dictionaries with a compact fixed C array of pointers.",
    level: "basic",
    codeExample: "class Student:\n    __slots__ = ('id', 'name', 'fee')"
  },
  {
    question: "Why do standard Python class instances consume significant memory by default?",
    shortAnswer: "Because every standard instance creates a dynamic '__dict__' hash table (~150+ bytes) to allow arbitrary dynamic attribute assignment, which adds massive overhead when instantiating thousands of objects.",
    explanation: "Dynamic instance dictionary overhead.",
    hint: "Every standard object allocates a dynamic __dict__ dictionary taking ~150+ bytes.",
    level: "basic",
    codeExample: "# Standard instance has obj.__dict__ hash table"
  },
  {
    question: "What happens when you attempt to assign an attribute not listed in '__slots__'?",
    shortAnswer: "Python raises an 'AttributeError', preventing accidental typos (e.g. 'student.emial = ...') and enforcing a strict, fixed object schema.",
    explanation: "Dynamic attribute restriction and typo protection.",
    hint: "Raises AttributeError, protecting against misspelled attributes.",
    level: "basic",
    codeExample: "obj.invalid_attr = 10 # Raises AttributeError: 'Student' object has no attribute 'invalid_attr'"
  },
  {
    question: "Why is attribute access faster on a class with '__slots__' than a standard class?",
    shortAnswer: "Because accessing a slotted attribute uses a C descriptor that indexes directly into a fixed memory offset (pointer array indexing), avoiding dynamic dictionary hash lookups.",
    explanation: "Descriptor offset indexing vs hash table resolution.",
    hint: "Uses C descriptors for direct memory offset indexing instead of hash lookups.",
    level: "moderate",
    codeExample: "# ~15-30% faster attribute reads and writes"
  },
  {
    question: "How do you enable '__slots__' in Python 3.10+ dataclasses?",
    shortAnswer: "By passing 'slots=True' to the '@dataclass' decorator: '@dataclass(slots=True)'.",
    explanation: "Modern dataclass slots parameter.",
    hint: "@dataclass(slots=True)",
    level: "basic",
    codeExample: "from dataclasses import dataclass\n@dataclass(slots=True)\nclass Candidate:\n    sid: str\n    score: float"
  },
  {
    question: "How does inheritance work when the base class defines '__slots__'?",
    shortAnswer: "The subclass inherits the base slots, but MUST also define its own '__slots__ = (...)' (even if empty '()'); otherwise, Python will automatically generate a dynamic '__dict__' on the subclass.",
    explanation: "Subclass slots inheritance requirement.",
    hint: "Subclass must define its own __slots__ (even if empty) to prevent __dict__ generation.",
    level: "complex",
    codeExample: "class Base:\n    __slots__ = ('a',)\nclass Child(Base):\n    __slots__ = ('b',) # Inherits 'a' and adds 'b'"
  },
  {
    question: "Can a class with '__slots__' still support weak references?",
    shortAnswer: "Only if you explicitly include '__weakref__' in the '__slots__' tuple: '__slots__ = (\"name\", \"__weakref__\")'.",
    explanation: "Weak reference slot support.",
    hint: "Include '__weakref__' in the __slots__ tuple.",
    level: "moderate",
    codeExample: "class Tracked:\n    __slots__ = ('name', '__weakref__')"
  },
  {
    question: "Can a class with '__slots__' allow dynamic attributes on specific instances?",
    shortAnswer: "Yes, by explicitly including '__dict__' in the '__slots__' definition ('__slots__ = (\"fixed_a\", \"__dict__\")'), which provides descriptors for fixed attributes while still creating a dictionary for extras.",
    explanation: "Hybrid slots with dynamic dictionary support.",
    hint: "Include '__dict__' in __slots__ to allow dynamic attributes.",
    level: "complex",
    codeExample: "class Hybrid:\n    __slots__ = ('id', '__dict__')"
  },
  {
    question: "What is the primary function of Python's standard 'tracemalloc' module?",
    shortAnswer: "'tracemalloc' traces Python heap memory allocations at the bytecode level, tracking current and peak RAM usage and identifying the exact source code filenames and line numbers responsible.",
    explanation: "Standard library heap memory allocation profiler.",
    hint: "Traces heap memory allocations down to exact filenames and line numbers.",
    level: "basic",
    codeExample: "import tracemalloc\ntracemalloc.start()\n# ... run code ...\ncurr, peak = tracemalloc.get_traced_memory()"
  },
  {
    question: "How do you detect memory leaks between two execution points using 'tracemalloc'?",
    shortAnswer: "Take a baseline snapshot ('snap1 = tracemalloc.take_snapshot()'), run the workload, take a second snapshot ('snap2 = tracemalloc.take_snapshot()'), and compare them: 'diff = snap2.compare_to(snap1, \"lineno\")'.",
    explanation: "Snapshot differential leak detection.",
    hint: "Take two snapshots and use snapshot2.compare_to(snapshot1, 'lineno').",
    level: "moderate",
    codeExample: "top_diffs = snap2.compare_to(snap1, 'lineno')\nfor stat in top_diffs[:5]: print(stat)"
  },
  {
    question: "How much RAM is typically saved for 100,000 objects by switching to '__slots__'?",
    shortAnswer: "Typically reduces memory from ~16-25 MB down to ~6-9 MB (saving 60% to 70% of total heap RAM).",
    explanation: "Scale memory savings empirical reality.",
    hint: "Saves ~60-70% of total heap RAM (~15MB saved per 100k objects).",
    level: "basic",
    codeExample: "# 100k objects: Standard ~20MB vs Slots ~7MB"
  },
  {
    question: "What happens when multiple base classes define non-empty '__slots__' in multiple inheritance?",
    shortAnswer: "Python raises a 'TypeError: multiple bases have instance lay-out conflict', because Python cannot merge multiple distinct C struct pointer layouts into a single instance.",
    explanation: "Multiple inheritance layout conflict with nonempty slots.",
    hint: "Raises TypeError due to instance memory layout conflict.",
    level: "complex",
    codeExample: "# TypeError: multiple bases have instance lay-out conflict"
  },
  {
    question: "Why should you use a tuple rather than a list or set when declaring '__slots__'?",
    shortAnswer: "Because '__slots__' will never be modified after class creation, so using an immutable tuple avoids unnecessary list memory allocation and makes design intent clear.",
    explanation: "Immutable tuple convention for slots.",
    hint: "Use an immutable tuple like __slots__ = ('a', 'b').",
    level: "basic",
    codeExample: "__slots__ = ('id', 'name') # Recommended"
  },
  {
    question: "How do 'collections.namedtuple' memory footprints compare to '__slots__' classes?",
    shortAnswer: "Both have virtually identical, minimal memory footprints because both are implemented as compact C structs without '__dict__'; namedtuples are immutable, while slotted classes can be mutable.",
    explanation: "NamedTuple vs Slotted Class memory equivalence.",
    hint: "Both have minimal RAM footprints without __dict__; namedtuples are immutable.",
    level: "moderate",
    codeExample: "# NamedTuple (immutable) == Slotted Class (mutable) memory"
  },
  {
    question: "What is the danger of setting '__slots__ = \"id\"' (as a single string) instead of '__slots__ = (\"id\",)'?",
    shortAnswer: "Python will treat the string as an iterable of single characters, creating slots for 'i' and 'd' rather than 'id'!",
    explanation: "String iteration trap in slots declaration.",
    hint: "A string is iterated character-by-character; always use a tuple ('id',).",
    level: "basic",
    codeExample: "# BUG: __slots__ = 'id' -> creates slots 'i' and 'd'!\n# FIX: __slots__ = ('id',)"
  },
  {
    question: "Does '__slots__' prevent creating class-level attributes or methods?",
    shortAnswer: "No, '__slots__' only affects instance attributes; class variables, methods, classmethods, and staticmethods operate normally on the class dictionary.",
    explanation: "Instance vs class attribute scope with slots.",
    hint: "No, methods and class variables operate completely normally on the class object.",
    level: "basic",
    codeExample: "class A:\n    __slots__ = ('x',)\n    CLASS_CONST = 100 # Works normally"
  },
  {
    question: "How do you check if a Python object instance has dynamic dictionary overhead at runtime?",
    shortAnswer: "By checking 'hasattr(obj, \"__dict__\")'; returns False for slotted instances and True for standard instances.",
    explanation: "Runtime __dict__ introspection.",
    hint: "hasattr(obj, '__dict__')",
    level: "basic",
    codeExample: "if not hasattr(instance, '__dict__'):\n    print('Slotted object (No __dict__ overhead)')"
  },
  {
    question: "What is the difference between shallow memory ('sys.getsizeof()') and deep memory ('pympler.asizeof')?",
    shortAnswer: "'sys.getsizeof()' only measures the outer container struct without referenced child objects; 'asizeof' recursively inspects all nested heap objects referenced by pointers.",
    explanation: "Shallow struct size vs recursive deep memory tree.",
    hint: "getsizeof measures the top pointer struct; asizeof traverses all child objects.",
    level: "moderate",
    codeExample: "# sys.getsizeof(obj) vs pympler.asizeof.asizeof(obj)"
  },
  {
    question: "Can you pickle and serialize instances of a class that defines '__slots__'?",
    shortAnswer: "Yes, Python's standard 'pickle' module natively supports serializing and deserializing slotted class instances across all modern Python versions.",
    explanation: "Pickle serialization support for slotted classes.",
    hint: "Yes, pickle fully supports slotted classes out of the box.",
    level: "basic",
    codeExample: "import pickle\ndata = pickle.dumps(slotted_obj)"
  },
  {
    question: "When should you NOT use '__slots__' on a Python class?",
    shortAnswer: "When you only instantiate a few objects (premature optimization), when you need dynamic monkey-patching or third-party dynamic plugins, or in complex multiple-inheritance hierarchies with shared state.",
    explanation: "Pragmatic trade-offs and anti-patterns of slots.",
    hint: "Avoid for small object counts, dynamic monkey-patching, or complex multiple inheritance.",
    level: "moderate",
    codeExample: "# Do not use slots for singletons or dynamic plugin classes"
  },
  {
    question: "What is the relationship between '__slots__' and Python's Garbage Collection?",
    shortAnswer: "Slotted instances reduce GC tracking overhead and memory fragmentation because CPython does not have to create and track a separate cyclic dictionary object for each instance.",
    explanation: "GC cycle tracking and memory fragmentation reduction.",
    hint: "Eliminating per-instance dictionaries reduces GC cycle tracking and RAM fragmentation.",
    level: "complex",
    codeExample: "# Fewer cyclic dictionary objects for the GC to inspect"
  },
  {
    question: "How do you profile peak memory consumption of a Python process using 'tracemalloc'?",
    shortAnswer: "Call 'tracemalloc.start()', execute the script, call '_, peak_bytes = tracemalloc.get_traced_memory()', and call 'tracemalloc.stop()'.",
    explanation: "Peak memory tracking workflow.",
    hint: "_, peak = tracemalloc.get_traced_memory()",
    level: "basic",
    codeExample: "tracemalloc.start()\nrun_heavy_work()\n_, peak = tracemalloc.get_traced_memory()\nprint(f'Peak: {peak / (1024*1024):.2f} MB')"
  },
  {
    question: "Why does Python not enable '__slots__' by default for all classes?",
    shortAnswer: "For backward compatibility and dynamic flexibility: Python historically embraces dynamic object mutation (adding fields at runtime, monkey patching, dynamic debugging).",
    explanation: "Python dynamic design philosophy vs opt-in performance.",
    hint: "Python prioritizes dynamic flexibility and backward compatibility by default.",
    level: "basic",
    codeExample: "# Dynamic flexibility is default; slots is opt-in optimization"
  },
  {
    question: "How does '@dataclass(slots=True, frozen=True)' compare to a NamedTuple?",
    shortAnswer: "Both provide immutable, low-memory records without '__dict__'; dataclass with slots provides clean type annotations, default values, inheritance, and rich validation while NamedTuple provides tuple unpacking and indexing.",
    explanation: "Frozen slotted dataclass vs namedtuple comparison.",
    hint: "Both have identical low memory; dataclass provides type hints and defaults.",
    level: "moderate",
    codeExample: "@dataclass(slots=True, frozen=True)\nclass Point:\n    x: float\n    y: float"
  },
  {
    question: "What is the ultimate golden rule for memory optimization with '__slots__'?",
    shortAnswer: "Whenever defining domain models or data records that will be instantiated in large volumes (thousands or millions), use '__slots__' (or '@dataclass(slots=True)') to cut RAM by 65%+ and accelerate attribute access.",
    explanation: "The complete enterprise guideline for memory optimization in Python.",
    hint: "Always use __slots__ or @dataclass(slots=True) for high-volume data classes.",
    level: "basic",
    codeExample: "# Python Object Memory Optimization Mastery"
  }
];

export default questions;
