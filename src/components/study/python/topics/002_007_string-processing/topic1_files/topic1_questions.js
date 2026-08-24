// src/components/study/python/topics/002_007_string-processing/topic1_files/topic1_questions.js
// 30 Comprehensive Master Review Questions for Topic 1: String Immutability & Memory Representation

const questions = [
  {
    question: "What does it mean that Python strings are 'immutable'?",
    shortAnswer: "Once a string object is created in memory, its characters and size cannot be modified, replaced, or deleted in place.",
    explanation: "Any operation that appears to alter a string (such as concatenation, replace, or slicing) actually allocates and returns a brand-new string object in memory.",
    hint: "Think of an immutable object as read-only memory.",
    level: "basic",
    codeExample: "s = 'Kolkata'\n# s[0] = 'k'  # Raises TypeError: 'str' object does not support item assignment"
  },
  {
    question: "What error is raised if you execute s[0] = 'A' on an existing string s = 'hello'?",
    shortAnswer: "TypeError: 'str' object does not support item assignment.",
    explanation: "Because Python strings do not implement the __setitem__ method, attempting to assign a value to an index raises a TypeError at runtime.",
    hint: "Strings do not support in-place item assignment.",
    level: "basic",
    codeExample: "s = 'hello'\ntry:\n    s[0] = 'H'\nexcept TypeError as e:\n    print(e)  # 'str' object does not support item assignment"
  },
  {
    question: "If strings are immutable, why does s = 'Hello'; s = s + ' World' work without error?",
    shortAnswer: "The variable 's' is rebound to a brand-new string object; the original 'Hello' string is not mutated.",
    explanation: "Variables in Python are pointers (references) to objects. The operation s + ' World' creates a new string 'Hello World' at a new memory address, and 's' is reassigned to point to that new address.",
    hint: "Variable reassignment (rebinding) is different from object mutation.",
    level: "basic",
    codeExample: "s = 'Hello'\naddr1 = id(s)\ns = s + ' World'\naddr2 = id(s)\nprint(addr1 == addr2)  # False (New memory address!)"
  },
  {
    question: "What built-in function reveals the unique memory address of a string object in CPython?",
    shortAnswer: "The id() function.",
    explanation: "id(obj) returns the identity of an object, which corresponds to its actual memory address in CPython.",
    hint: "Use id(x).",
    level: "basic",
    codeExample: "name = 'Susmita'\nprint(id(name))  # e.g., 140294820192"
  },
  {
    question: "What is the difference between '==' and 'is' when comparing two strings?",
    shortAnswer: "'==' checks for value equality; 'is' checks for memory identity (exact same object).",
    explanation: "'==' invokes the __eq__ method to compare character sequences. 'is' checks whether id(a) == id(b) (whether both variables point to the exact same memory location).",
    hint: "Equality compares contents; identity compares memory addresses.",
    level: "basic",
    codeExample: "a = 'Coder'\nb = ''.join(['C', 'o', 'd', 'e', 'r'])\nprint(a == b)  # True (Same characters)\nprint(a is b)  # Might be False (Different memory objects)"
  },
  {
    question: "What is String Interning in Python?",
    shortAnswer: "An optimization where CPython reuses a single shared memory object for identical string literals.",
    explanation: "String interning stores only one copy of each distinct string value in an internal dictionary, saving memory and speeding up dictionary lookups.",
    hint: "Interning shares one memory copy for identical strings.",
    level: "moderate",
    codeExample: "x = 'python_3'\ny = 'python_3'\nprint(x is y)  # True (Automatically interned identifier)"
  },
  {
    question: "Which types of strings are automatically interned by CPython?",
    shortAnswer: "String literals that look like valid Python identifiers (alphanumeric characters and underscores).",
    explanation: "CPython automatically interns short string constants and identifier-like strings to accelerate dictionary key comparisons during attribute lookup.",
    hint: "Identifier-like names without spaces or special symbols.",
    level: "moderate",
    codeExample: "a = 'barrackpore'\nb = 'barrackpore'\nprint(a is b)  # True"
  },
  {
    question: "How can you manually force Python to intern a dynamically computed string?",
    shortAnswer: "Using the sys.intern() function from the sys module.",
    explanation: "sys.intern(string) adds the string to the internal interned pool (or returns the existing interned copy), ensuring pointer-level identity comparison.",
    hint: "Import sys and call sys.intern().",
    level: "moderate",
    codeExample: "import sys\ns1 = sys.intern('custom token with spaces')\ns2 = sys.intern('custom token with spaces')\nprint(s1 is s2)  # True"
  },
  {
    question: "What is PEP 393 and how did it revolutionize Python 3 string memory representation?",
    shortAnswer: "PEP 393 introduced Flexible String Representation, allocating 1, 2, or 4 bytes per character based on the maximum codepoint in the string.",
    explanation: "Before PEP 393, Python built with UCS-4 allocated 4 bytes for every character (even pure ASCII). PEP 393 uses 1 byte for ASCII/Latin-1 (codepoints < 256), 2 bytes for UCS-2 (< 65536), and 4 bytes only when necessary (UCS-4).",
    hint: "Adaptive 1-byte, 2-byte, or 4-byte encoding per string.",
    level: "expert",
    codeExample: "import sys\n# Pure ASCII: 1 byte per char\nprint(sys.getsizeof('abc'))      # ~52 bytes (compact header + 3 bytes)\n# Unicode Rupee: 2 bytes per char\nprint(sys.getsizeof('₹₹₹'))      # ~78 bytes"
  },
  {
    question: "Why is concatenating strings inside a loop using '+=' considered an anti-pattern?",
    shortAnswer: "It has O(N^2) time complexity because each concatenation creates and copies a new string in memory.",
    explanation: "Because strings cannot be resized in-place, each += creates a new buffer, copies all preceding characters, and re-allocates memory, leading to quadratic time complexity.",
    hint: "Each += copies the whole string again, leading to O(N^2).",
    level: "moderate",
    codeExample: "# Anti-pattern:\ns = ''\nfor word in words:\n    s += word\n\n# Best practice:\ns = ''.join(words)"
  },
  {
    question: "Why is str.join() significantly faster than loop concatenation?",
    shortAnswer: "join() calculates the total required memory upfront and allocates the output buffer in a single pass (O(N)).",
    explanation: "join() loops over the collection once to calculate total character count, allocates one exact memory block, and copies elements directly without intermediate garbage collection.",
    hint: "join() calculates length upfront and allocates memory once.",
    level: "moderate",
    codeExample: "words = ['Coder', 'and', 'AccoTax', 'Barrackpore']\nresult = ' '.join(words)  # Fast O(N) allocation\nprint(result)"
  },
  {
    question: "Can a string be used as a key in a Python dictionary? Why or why not?",
    shortAnswer: "Yes, because strings are immutable and therefore hashable.",
    explanation: "Dictionary keys must implement __hash__() and have a hash value that never changes during their lifetime. Because strings are immutable, their hash remains constant.",
    hint: "Immutability guarantees fixed hash values.",
    level: "basic",
    codeExample: "user_scores = {'Susmita': 95, 'Debangshu': 92}\nprint(user_scores['Susmita'])  # 95"
  },
  {
    question: "What happens to the hash value of a string after it is created?",
    shortAnswer: "It is calculated once upon request and cached in the string object header for instantaneous O(1) reuse.",
    explanation: "CPython caches the computed hash in the PyASCIIObject struct, making subsequent dictionary lookups blistering fast.",
    hint: "CPython computes and caches the hash.",
    level: "expert",
    codeExample: "s = 'Barrackpore'\nprint(hash(s))\nprint(hash(s))  # Retrieved instantly from cache"
  },
  {
    question: "How does string immutability benefit multithreaded Python applications?",
    shortAnswer: "Immutable objects are inherently thread-safe because multiple threads can read them simultaneously without locks or race conditions.",
    explanation: "Since no thread can mutate the data of a string in-place, read access requires no mutex locks, eliminating data corruption risks.",
    hint: "No mutation means no race conditions during concurrent reads.",
    level: "moderate",
    codeExample: "# Multiple worker threads can safely read shared config strings\nAPI_ENDPOINT = 'https://api.codernaccotax.co.in/v1'"
  },
  {
    question: "What does sys.getsizeof(string) return?",
    shortAnswer: "The total memory in bytes occupied by the string object, including its CPython PyObject header and character buffer.",
    explanation: "In CPython, an empty string object takes approximately 49-50 bytes due to struct metadata (reference count, type pointer, length, hash, encoding flags).",
    hint: "Measures struct header plus character bytes in memory.",
    level: "moderate",
    codeExample: "import sys\nprint(sys.getsizeof(''))   # ~49 bytes (CPython header)\nprint(sys.getsizeof('A'))  # ~50 bytes (Header + 1 byte ASCII)"
  },
  {
    question: "How can you modify the 3rd character of a string 'Kolkata' to 'X' without raising an error?",
    shortAnswer: "By slicing and concatenating into a new string: s[:2] + 'X' + s[3:].",
    explanation: "Since in-place modification is impossible, slice before and after the target index and combine them with the replacement character.",
    hint: "Use slicing: s[:i] + new_char + s[i+1:].",
    level: "basic",
    codeExample: "s = 'Kolkata'\nnew_s = s[:2] + 'X' + s[3:]\nprint(new_s)  # KoXkata"
  },
  {
    question: "Is it possible for two distinct string variables with identical content to have different id() values?",
    shortAnswer: "Yes, if they are created dynamically and not interned by CPython.",
    explanation: "Dynamic string operations create distinct memory objects unless explicitly interned or optimized by the compiler.",
    hint: "Non-interned dynamic strings have distinct id() addresses.",
    level: "moderate",
    codeExample: "s1 = 'Hello World!'\ns2 = 'Hello ' + 'World!'\nprint(s1 == s2)  # True\n# In interactive REPL, s1 is s2 may be False"
  },
  {
    question: "Does the bytearray or list data structure allow in-place character modification in Python?",
    shortAnswer: "Yes, both bytearray and list of characters are mutable sequences that support in-place item assignment.",
    explanation: "If high-performance in-place character mutation is required, convert the string to a bytearray or list, modify elements, and convert back.",
    hint: "Use bytearray or list(s) for in-place edits.",
    level: "moderate",
    codeExample: "chars = list('Ichapur')\nchars[0] = 'E'\nprint(''.join(chars))  # Echapur"
  },
  {
    question: "What optimization does CPython apply for empty strings ''?",
    shortAnswer: "CPython maintains a single singleton empty string object; all empty strings share the exact same id().",
    explanation: "Every instance of '' in Python points to the exact same singleton object Py_EMPTY_STRING.",
    hint: "Empty strings are global singletons.",
    level: "expert",
    codeExample: "a = ''\nb = str()\nprint(a is b)  # True (Exact same singleton object)"
  },
  {
    question: "What optimization does CPython apply for 1-character Latin-1 strings (ASCII 0-255)?",
    shortAnswer: "CPython pre-allocates and caches all 256 single-byte 1-character strings as singletons.",
    explanation: "Any 1-character Latin-1 string (like 'a', 'Z', '9') refers to a pre-allocated singleton in CPython's static array.",
    hint: "All 256 single Latin-1 characters are cached singletons.",
    level: "expert",
    codeExample: "c1 = chr(65)  # 'A'\nc2 = 'A'\nprint(c1 is c2)  # True (Cached singleton)"
  },
  {
    question: "Why does string slicing s[1:4] create a new string object in CPython?",
    shortAnswer: "Because strings are immutable, slicing creates a new sub-string with its own character buffer and header.",
    explanation: "Unlike NumPy arrays or memoryviews which create zero-copy views, Python string slices allocate a new string object in memory.",
    hint: "Standard string slicing always allocates a new string.",
    level: "moderate",
    codeExample: "s = 'Barrackpore'\nsub = s[0:7]\nprint(id(s) == id(sub))  # False"
  },
  {
    question: "How does the 'memoryview' object provide zero-copy buffer access for binary strings (bytes)?",
    shortAnswer: "memoryview creates a view pointing directly to the existing buffer memory without allocating a new copy.",
    explanation: "memoryview works with bytes and bytearrays to slice and manipulate buffer memory with zero copy overhead.",
    hint: "memoryview provides zero-copy buffer slicing on bytes.",
    level: "expert",
    codeExample: "data = b'CoderAccoTax2026'\nview = memoryview(data)[0:5]\nprint(view.tobytes())  # b'Coder'"
  },
  {
    question: "What is the memory impact of storing 1,000,000 duplicate customer city names 'Kolkata' in a list without interning?",
    shortAnswer: "A list of 1,000,000 pointers will all point to the same interned string object, taking very little extra memory for string data.",
    explanation: "Because Python string literals are interned, all 1,000,000 list elements hold references (8 bytes each) to the same single 'Kolkata' string object in memory.",
    hint: "List stores 1,000,000 references to one shared string object.",
    level: "moderate",
    codeExample: "cities = ['Kolkata'] * 1000000\nprint(cities[0] is cities[999999])  # True (Single shared string)"
  },
  {
    question: "What is the CPython struct type that represents pure ASCII strings internally?",
    shortAnswer: "PyASCIIObject.",
    explanation: "PyASCIIObject is the base struct in CPython for compact ASCII strings without legacy UTF-8 pointers or UCS-2/4 buffers.",
    hint: "PyASCIIObject represents compact ASCII strings in C.",
    level: "expert",
    codeExample: "# Defined in Include/cpython/unicodeobject.h in CPython source"
  },
  {
    question: "Why can't you mutate a string by passing it into a function?",
    shortAnswer: "Because Python uses call-by-object-reference; since the string object is immutable, the function cannot modify it in place.",
    explanation: "Any assignment inside the function merely rebinds the local parameter name to a new object, leaving the caller's original string intact.",
    hint: "Functions receive references to immutable objects.",
    level: "basic",
    codeExample: "def clean_name(name):\n    name = name.strip()  # Rebinds local variable 'name'\n    return name\n\nuser = '  Susmita  '\nclean_name(user)\nprint(repr(user))  # '  Susmita  ' (Unchanged!)"
  },
  {
    question: "What is the difference between string interning and string pooling in Python?",
    shortAnswer: "They refer to the exact same concept: caching and reusing unique string instances in a central hash table.",
    explanation: "The terms 'interning' and 'string pooling' are used interchangeably across Python and Java virtual machines.",
    hint: "Interning and pooling are synonyms.",
    level: "basic",
    codeExample: "# sys.intern() manages the string intern pool"
  },
  {
    question: "How does string immutability protect security-sensitive code (e.g. database credentials or file paths)?",
    shortAnswer: "Once a security check validates a string path or token, no concurrent thread or malicious function can tamper with it before use.",
    explanation: "If strings were mutable, a malicious thread could change a validated file path '/safe/path.txt' to '/etc/passwd' after validation passed (Time-of-check to time-of-use vulnerability).",
    hint: "Prevents TOCTOU (Time-of-check to time-of-use) attacks.",
    level: "expert",
    codeExample: "# Validated token string cannot be changed behind the scenes\ntoken = validate_token(request_header)"
  },
  {
    question: "What happens when you use 'a += b' in CPython when there are no other references to 'a'?",
    shortAnswer: "CPython attempts an in-place buffer resize optimization (realloc) if refcount == 1.",
    explanation: "As an internal CPython optimization, if the reference count of 'a' is exactly 1, CPython may resize the buffer in-place to improve += performance, though developers should never rely on this behavior.",
    hint: "CPython optimizes += if refcount is 1, but it is an implementation detail.",
    level: "expert",
    codeExample: "# Implementation optimization in CPython; do not rely on it for production loops"
  },
  {
    question: "How can you inspect the reference count of a string object in Python?",
    shortAnswer: "Using sys.getrefcount(obj).",
    explanation: "sys.getrefcount(obj) returns the number of active references pointing to that object (including the temporary reference passed to getrefcount).",
    hint: "Use sys.getrefcount(x).",
    level: "moderate",
    codeExample: "import sys\nname = 'UniqueStringToken_2026'\nprint(sys.getrefcount(name))  # At least 2 (name + argument to getrefcount)"
  },
  {
    question: "What is the ultimate golden rule for string construction in production Python pipelines?",
    shortAnswer: "Accumulate string chunks in a list and combine them once using ''.join(list).",
    explanation: "Accumulating strings in a dynamic list and joining them at the end ensures O(N) linear time complexity, minimal memory allocations, and optimal garbage collection performance.",
    hint: "Collect in a list -> ''.join(list).",
    level: "basic",
    codeExample: "# Golden rule:\nchunks = []\nfor item in records:\n    chunks.append(format_record(item))\noutput = ''.join(chunks)"
  }
];

export default questions;
