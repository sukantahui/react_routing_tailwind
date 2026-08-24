// src/components/study/python/topics/003_004_working-with-json/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Deserialization: json.load() vs json.loads()

const questions = [
  {
    question: "What is the primary difference between 'json.loads()' and 'json.load()'?",
    shortAnswer: "'json.loads()' parses a JSON-formatted string, bytes, or bytearray already resident in memory; 'json.load()' reads and parses directly from a file-like stream object.",
    explanation: "The 's' in loads stands for 'string'.",
    hint: "loads() parses strings/bytes; load() parses from an open file stream.",
    level: "basic",
    codeExample: "data = json.loads(str_data)\nwith open('file.json') as f: data = json.load(f)"
  },
  {
    question: "Can 'json.loads()' parse raw UTF-8 'bytes' directly without prior decoding?",
    shortAnswer: "Yes. Starting in Python 3.6+, 'json.loads()' directly accepts 'bytes' and 'bytearray' encoded in UTF-8, UTF-16, or UTF-32.",
    explanation: "Eliminates the need for manual 'bytes.decode('utf-8')' calls.",
    hint: "Yes, json.loads() accepts bytes directly since Python 3.6.",
    level: "basic",
    codeExample: "data = json.loads(b'{\"status\": \"OK\"}')"
  },
  {
    question: "What attributes are available on a 'json.JSONDecodeError' exception?",
    shortAnswer: "'exc.msg' (error message), 'exc.lineno' (line number, 1-indexed), 'exc.colno' (column number, 1-indexed), and 'exc.pos' (0-indexed character index in string).",
    explanation: "Provides precise diagnostics for malformed JSON strings.",
    hint: "Provides msg, lineno, colno, and pos.",
    level: "basic",
    codeExample: "except json.JSONDecodeError as e: print(e.msg, e.lineno, e.colno)"
  },
  {
    question: "Why does standard float decoding in JSON cause subtle errors in financial calculations?",
    shortAnswer: "Standard JSON floats are decoded into IEEE-754 binary floating-point numbers ('float'), which cannot represent decimal fractions like 0.1 or 0.05 exactly, causing cumulative rounding drift.",
    explanation: "Financial systems require exact decimal arithmetic.",
    hint: "Binary IEEE-754 floats introduce fractional rounding drift (e.g. 0.1 + 0.2 != 0.3).",
    level: "moderate",
    codeExample: "0.1 + 0.2 # 0.30000000000000004"
  },
  {
    question: "How do you configure 'json.loads()' or 'json.load()' to decode numbers into exact 'decimal.Decimal' objects?",
    shortAnswer: "By passing 'parse_float=Decimal': 'from decimal import Decimal; doc = json.loads(data, parse_float=Decimal)'.",
    explanation: "Ensures 100% precision in banking, currency, and tax calculations.",
    hint: "Pass parse_float=Decimal to json.loads/json.load.",
    level: "basic",
    codeExample: "from decimal import Decimal\ndoc = json.loads('{\"fee\": 28500.10}', parse_float=Decimal)"
  },
  {
    question: "Why would you use 'parse_int=str' during JSON deserialization?",
    shortAnswer: "To prevent 64-bit or 128-bit integer IDs (like Twitter Snowflakes or UUID numbers) from exceeding limits or losing formatting when transferred across heterogeneous systems.",
    explanation: "Stores large numeric IDs as strings directly.",
    hint: "Preserves large integer IDs as strings to prevent integer clipping.",
    level: "moderate",
    codeExample: "doc = json.loads('{\"id\": 9223372036854775807}', parse_int=str)"
  },
  {
    question: "What does the 'parse_constant' parameter do in 'json.loads()'?",
    shortAnswer: "It specifies a callback function that is invoked when non-standard constants ('NaN', 'Infinity', '-Infinity') are encountered in the JSON input.",
    explanation: "Allows converting non-standard constants into custom domain values or raising errors.",
    hint: "Callback invoked on non-standard constants (NaN, Infinity).",
    level: "complex",
    codeExample: "doc = json.loads('{\"v\": NaN}', parse_constant=lambda c: None)"
  },
  {
    question: "What causes 'json.decoder.JSONDecodeError: Extra data'?",
    shortAnswer: "It occurs when there is valid JSON followed by additional non-whitespace characters (e.g. two concatenated JSON objects '{\"a\": 1}{\"b\": 2}').",
    explanation: "Standard JSON parsers expect exactly one root element.",
    hint: "Occurs when trailing data exists after the first valid JSON root.",
    level: "moderate",
    codeExample: "json.loads('{\"a\": 1} {\"b\": 2}') # JSONDecodeError: Extra data"
  },
  {
    question: "How do you parse multi-line concatenated JSON documents (NDJSON / JSON Lines)?",
    shortAnswer: "By iterating line-by-line over the file and calling 'json.loads(line)' on each individual line.",
    explanation: "The standard format for log files and big data analytics.",
    hint: "Read line-by-line and call json.loads(line) on each line.",
    level: "basic",
    codeExample: "for line in file: yield json.loads(line)"
  },
  {
    question: "How do you defensively handle empty (0-byte) files with 'json.load()'?",
    shortAnswer: "Check file size before loading ('os.path.getsize(path) == 0') or catch 'json.JSONDecodeError' and return a default empty dictionary '{}'.",
    explanation: "Prevents application boot crashes on empty config files.",
    hint: "Check os.path.getsize() or catch JSONDecodeError and return {}.",
    level: "basic",
    codeExample: "try: data = json.load(f)\nexcept json.JSONDecodeError: data = {}"
  },
  {
    question: "What is the memory consumption difference between 'json.loads()' and 'json.load()'?",
    shortAnswer: "'json.loads()' requires the entire raw string in RAM PLUS the constructed Python objects; 'json.load()' streams the file in chunks, reducing peak RAM overhead.",
    explanation: "Direct stream loading is always more memory efficient.",
    hint: "json.load() streams in chunks without keeping the raw string in memory.",
    level: "moderate",
    codeExample: "# Prefer json.load(f) for file loading"
  },
  {
    question: "What happens if a JSON file contains an invalid UTF-8 byte sequence?",
    shortAnswer: "Python raises 'UnicodeDecodeError' during file reading before 'json.load()' can even begin parsing.",
    explanation: "Always open files with 'encoding=\"utf-8\", errors=\"replace\"' for resilience.",
    hint: "Raises UnicodeDecodeError; use encoding='utf-8' with proper error handling.",
    level: "moderate",
    codeExample: "with open('file.json', 'r', encoding='utf-8', errors='replace') as f: ..."
  },
  {
    question: "What is the 'object_hook' parameter in 'json.loads()'?",
    shortAnswer: "A callback function that is called with the result of any decoded JSON object (dictionary), allowing automatic conversion into custom Python class instances.",
    explanation: "The standard deserialization hook for custom domain objects.",
    hint: "A function called on every decoded dictionary to transform it into custom objects.",
    level: "moderate",
    codeExample: "json.loads(data, object_hook=lambda d: Student(**d))"
  },
  {
    question: "How do you detect duplicate keys in a JSON document during deserialization?",
    shortAnswer: "By using 'object_pairs_hook' with a custom function that inspects the key list for duplicates and raises a 'ValueError'.",
    explanation: "Prevents silent data loss when duplicate keys are present.",
    hint: "Use object_pairs_hook to check for duplicate keys in the raw pair list.",
    level: "complex",
    codeExample: "def check_dups(pairs):\n    keys = [k for k, v in pairs]\n    if len(keys) != len(set(keys)): raise ValueError('Duplicate keys!')"
  },
  {
    question: "Why should you never use 'eval()' instead of 'json.loads()' on API inputs?",
    shortAnswer: "'eval()' executes arbitrary Python code and allows malicious attackers to achieve Remote Code Execution (RCE) on the server.",
    explanation: "A catastrophic security flaw.",
    hint: "eval() executes arbitrary code and creates severe RCE vulnerabilities.",
    level: "basic",
    codeExample: "# CRITICAL VULNERABILITY: eval(user_json_input)"
  },
  {
    question: "What happens if you pass an integer or boolean to 'json.loads()'?",
    shortAnswer: "'json.loads(\"100\")' returns the integer '100'; 'json.loads(\"true\")' returns the boolean 'True'; 'json.loads(\"null\")' returns 'None' (valid JSON primitives).",
    explanation: "RFC 8259 allows JSON documents to consist of any single top-level primitive.",
    hint: "Returns the parsed primitive value (int, bool, None).",
    level: "basic",
    codeExample: "assert json.loads('true') is True"
  },
  {
    question: "How can you validate that a deserialized JSON payload is a dictionary and not a list or scalar?",
    shortAnswer: "By checking 'if not isinstance(data, dict): raise TypeError(\"Expected JSON object\")'.",
    explanation: "Protects against malicious or unexpected payload types.",
    hint: "Use isinstance(data, dict) check immediately after loading.",
    level: "basic",
    codeExample: "data = json.loads(payload)\nif not isinstance(data, dict): raise TypeError()"
  },
  {
    question: "How do you benchmark deserialization performance in Python?",
    shortAnswer: "Using the standard library 'timeit' module: 'timeit.timeit(lambda: json.loads(payload), number=5000)'.",
    explanation: "Measures deserialization throughput.",
    hint: "Use timeit.timeit() with lambda: json.loads(payload).",
    level: "basic",
    codeExample: "import timeit\ntimeit.timeit(lambda: json.loads(payload), number=1000)"
  },
  {
    question: "Can 'json.load()' read from an in-memory 'io.StringIO' or 'io.BytesIO' object?",
    shortAnswer: "Yes. 'json.load()' works seamlessly with any object that implements a '.read()' method, demonstrating stream polymorphism.",
    explanation: "Useful in unit testing and stream processing pipelines.",
    hint: "Yes, accepts any object implementing .read().",
    level: "basic",
    codeExample: "stream = io.StringIO('{\"a\": 1}'); data = json.load(stream)"
  },
  {
    question: "How do you recover gracefully if a primary JSON database file is corrupted?",
    shortAnswer: "By wrapping file ingestion in a 'try...except' block, logging the error, and automatically restoring state from a verified '.bak' backup file.",
    explanation: "Standard enterprise persistence recovery pattern.",
    hint: "Catch JSONDecodeError and restore from verified backup file.",
    level: "moderate",
    codeExample: "try: data = json.load(f)\nexcept json.JSONDecodeError: data = load_backup()"
  },
  {
    question: "What happens if a JSON document contains nested structures deeper than Python's recursion limit?",
    shortAnswer: "It raises 'RecursionError: maximum recursion depth exceeded' during deserialization.",
    explanation: "Python enforces a recursion limit (default ~1000) to protect the C call stack.",
    hint: "Raises RecursionError when nesting exceeds recursion depth limit.",
    level: "complex",
    codeExample: "import sys; sys.setrecursionlimit(2000) # Increases limit"
  },
  {
    question: "How do you parse a date string automatically during 'json.loads()'?",
    shortAnswer: "By using an 'object_hook' function that inspects key names (e.g. ending in '_date') or regex patterns and parses them with 'datetime.fromisoformat()'.",
    explanation: "Automated datetime deserialization pattern.",
    hint: "Use object_hook and datetime.fromisoformat().",
    level: "moderate",
    codeExample: "def parse_dates(d): return {k: datetime.fromisoformat(v) if 'time' in k else v for k, v in d.items()}"
  },
  {
    question: "What is the fastest way to parse large JSON files in Python when standard 'json' is too slow?",
    shortAnswer: "Using optimized C/Rust-backed third-party libraries like 'orjson' or 'ujson', which can be 5x to 20x faster than standard library 'json'.",
    explanation: "High-performance alternatives for massive data pipelines.",
    hint: "Use third-party libraries like orjson or ujson for extreme throughput.",
    level: "moderate",
    codeExample: "# import orjson; data = orjson.loads(payload)"
  },
  {
    question: "How do you safely parse JSON input from untrusted web clients in API endpoints?",
    shortAnswer: "Use 'json.loads()' with maximum payload size limits, validate root data type, and enforce schema validation before passing data to business logic.",
    explanation: "Defense-in-depth API security practice.",
    hint: "Enforce payload size limits, check root type, and validate schema.",
    level: "basic",
    codeExample: "# Enforce size limits and schema validation"
  },
  {
    question: "What is the ultimate golden rule for JSON Deserialization in Python?",
    shortAnswer: "Use 'json.loads()' for in-memory strings/bytes and 'json.load()' for direct file streaming; use 'parse_float=Decimal' for financial accuracy; catch 'JSONDecodeError' defensively with backup recovery; and always validate schema contracts.",
    explanation: "The definitive guide to robust, error-free JSON deserialization in Python.",
    hint: "loads for strings, load for files, parse_float=Decimal for finance, catch JSONDecodeError.",
    level: "basic",
    codeExample: "# Python JSON Deserialization Mastery"
  }
];

export default questions;
