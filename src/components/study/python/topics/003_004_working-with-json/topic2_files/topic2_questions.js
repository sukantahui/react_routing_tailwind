// src/components/study/python/topics/003_004_working-with-json/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Serialization: json.dump() vs json.dumps() with indent, sort_keys

const questions = [
  {
    question: "What is the primary difference between 'json.dumps()' and 'json.dump()'?",
    shortAnswer: "'json.dumps()' serializes a Python object to an in-memory 'str'; 'json.dump()' serializes a Python object and streams it directly to an open, writable file-like object.",
    explanation: "The 's' in dumps stands for 'string'.",
    hint: "dumps() returns a string; dump() writes directly to an open file stream.",
    level: "basic",
    codeExample: "json_str = json.dumps(data)\nwith open('data.json', 'w') as f: json.dump(data, f)"
  },
  {
    question: "Why is 'json.dump()' preferred over 'f.write(json.dumps())' when saving large datasets?",
    shortAnswer: "'json.dumps()' constructs a massive string across Python heap memory (high peak RAM); 'json.dump()' writes intermediate serialized chunks directly to the disk stream buffer with constant O(1) buffer overhead.",
    explanation: "Prevents Out-Of-Memory crashes on multi-gigabyte JSON files.",
    hint: "Avoids allocating a giant string in RAM by streaming chunks directly to disk.",
    level: "moderate",
    codeExample: "# MEMORY SAFE: json.dump(large_dataset, file_handle)"
  },
  {
    question: "What does the 'indent' parameter do in 'json.dumps()'?",
    shortAnswer: "It enables pretty-printing by inserting newlines and indentation whitespace (e.g. 'indent=4' uses 4 spaces per nesting level).",
    explanation: "Makes JSON readable for human logs and configuration files.",
    hint: "Specifies number of spaces for pretty-printed indentation.",
    level: "basic",
    codeExample: "json.dumps(data, indent=4)"
  },
  {
    question: "What is the difference between 'indent=0', 'indent=None', and 'indent=\"\\t\"'?",
    shortAnswer: "'indent=None' puts everything on a single line without extra whitespace; 'indent=0' puts each item on a new line with zero leading spaces; 'indent=\"\\t\"' indents each level using a tab character.",
    explanation: "indent accepts either non-negative integers or custom string prefixes.",
    hint: "None = single line; 0 = newlines only; \"\\t\" = tab indentation.",
    level: "moderate",
    codeExample: "json.dumps(data, indent='\\t')"
  },
  {
    question: "What is the purpose of 'sort_keys=True' in 'json.dumps()'?",
    shortAnswer: "It sorts dictionary keys alphabetically in the serialized JSON output, ensuring deterministic, reproducible output regardless of Python dictionary insertion order.",
    explanation: "Critical for cryptographic hashing, caching, and git diffs.",
    hint: "Sorts dictionary keys alphabetically for deterministic output.",
    level: "basic",
    codeExample: "json.dumps({'z': 1, 'a': 2}, sort_keys=True) # '{\"a\": 2, \"z\": 1}'"
  },
  {
    question: "How do you achieve maximum whitespace minification in 'json.dumps()'?",
    shortAnswer: "By passing 'separators=(\",\", \":\")' to eliminate the default trailing space after commas and colons.",
    explanation: "Reduces payload size by removing all non-essential formatting spaces.",
    hint: "Pass separators=(',', ':') to eliminate spaces after commas and colons.",
    level: "basic",
    codeExample: "min_json = json.dumps(data, separators=(',', ':'))"
  },
  {
    question: "What is 'Canonical JSON' and why is it essential for cryptographic signatures?",
    shortAnswer: "Canonical JSON is a strictly standardized, deterministic JSON representation (sorted keys, consistent minified separators) ensuring identical data always yields the exact same byte string and SHA-256 hash.",
    explanation: "Without canonicalization, dictionary key ordering produces mismatched digital signatures.",
    hint: "Deterministic JSON format (sorted keys, minified) ensuring identical SHA-256 hashes.",
    level: "complex",
    codeExample: "hashlib.sha256(json.dumps(d, sort_keys=True, separators=(',', ':')).encode()).hexdigest()"
  },
  {
    question: "What is the effect of 'ensure_ascii=False' in 'json.dumps()'?",
    shortAnswer: "When set to False, non-ASCII Unicode characters (such as Hindi, Bengali, or emojis) are output directly as UTF-8 characters rather than escaped sequences like '\\u09ac'.",
    explanation: "Makes internationalized text readable in files and reduces string length.",
    hint: "Outputs direct Unicode characters instead of \\uXXXX escape sequences.",
    level: "basic",
    codeExample: "json.dumps({'city': 'কলকাতা'}, ensure_ascii=False)"
  },
  {
    question: "Why is writing directly to a target JSON file with 'open(file, \"w\")' risky in production?",
    shortAnswer: "Because opening in '\"w\"' mode immediately truncates the file to 0 bytes; if the process crashes midway during serialization, the entire file is permanently destroyed and corrupted.",
    explanation: "Leading cause of corrupted configuration and database files.",
    hint: "Immediate truncation risks leaving a 0-byte corrupted file if the app crashes midway.",
    level: "moderate",
    codeExample: "# RISKY: with open('db.json', 'w') as f: json.dump(data, f)"
  },
  {
    question: "How does the 'Atomic File Write' pattern prevent JSON corruption?",
    shortAnswer: "By serializing data into a temporary file on the same filesystem, forcing disk sync with 'os.fsync()', and atomically replacing the target file using 'os.replace()'.",
    explanation: "Guarantees the target file is either fully updated or completely intact.",
    hint: "Writes to temp file, syncs to disk, and uses os.replace() for atomic swap.",
    level: "complex",
    codeExample: "os.replace(temp_filepath, target_filepath)"
  },
  {
    question: "Why must the temporary file be created on the SAME filesystem for 'os.replace()' to be atomic?",
    shortAnswer: "Atomic file renaming is an OS filesystem inode pointer update; crossing filesystem boundaries forces a slow copy-and-delete fallback which is not atomic.",
    explanation: "Always specify the target directory in tempfile: tempfile.mkstemp(dir=target_dir).",
    hint: "Cross-device renames are not atomic; temp file must be in the same folder/device.",
    level: "complex",
    codeExample: "tempfile.mkstemp(dir=os.path.dirname(target_path))"
  },
  {
    question: "What does 'f.flush()' followed by 'os.fsync(f.fileno())' do before replacing a JSON file?",
    shortAnswer: "'f.flush()' flushes Python runtime buffers to OS kernel space; 'os.fsync()' forces the physical OS disk controller to commit all written bytes to permanent non-volatile storage.",
    explanation: "Prevents data loss during sudden power failure.",
    hint: "Forces OS and hardware disk buffers to write bytes permanently to disk.",
    level: "complex",
    codeExample: "f.flush()\nos.fsync(f.fileno())"
  },
  {
    question: "What encoding should always be explicitly specified when opening files for 'json.dump()'?",
    shortAnswer: "'encoding=\"utf-8\"' should always be explicitly passed to prevent Windows default 'cp1252' from corrupting Unicode characters.",
    explanation: "Critical rule on Windows operating systems.",
    hint: "Always specify encoding='utf-8' when opening files.",
    level: "basic",
    codeExample: "with open('data.json', 'w', encoding='utf-8') as f: ..."
  },
  {
    question: "How do you serialize a Python dictionary to a formatted JSON string in memory for logging?",
    shortAnswer: "Using 'json.dumps(log_dict, indent=2, default=str)'.",
    explanation: "default=str provides a safe fallback for un-serializable objects in logs.",
    hint: "Use json.dumps(log_dict, indent=2, default=str).",
    level: "basic",
    codeExample: "logger.info(json.dumps(event, indent=2, default=str))"
  },
  {
    question: "Can 'json.dump()' write to an 'io.StringIO' object?",
    shortAnswer: "Yes. Any object implementing a '.write()' method (including 'io.StringIO', sockets, or gzip file streams) can be passed directly to 'json.dump()'.",
    explanation: "Demonstrates Python's duck typing and stream polymorphism.",
    hint: "Yes, json.dump() accepts any file-like object implementing .write().",
    level: "basic",
    codeExample: "buf = io.StringIO()\njson.dump(data, buf)"
  },
  {
    question: "What is the performance overhead of 'indent=4' compared to un-indented JSON serialization?",
    shortAnswer: "'indent=4' increases both string allocation size (by 2x to 4x) and serialization time due to generating and writing hundreds of whitespace and newline characters.",
    explanation: "Use pretty-printing only for human inspection; use minified JSON for APIs.",
    hint: "Increases payload size and CPU formatting time significantly.",
    level: "moderate",
    codeExample: "# Use minified for network transfers; indent for debugging"
  },
  {
    question: "How can you compress a JSON file on disk directly during serialization?",
    shortAnswer: "By wrapping the file in Python's 'gzip' module: 'with gzip.open(\"data.json.gz\", \"wt\", encoding=\"utf-8\") as f: json.dump(data, f)'.",
    explanation: "Compresses large JSON files by 80-90% directly on the fly.",
    hint: "Pass a gzip.open() stream to json.dump().",
    level: "moderate",
    codeExample: "import gzip\nwith gzip.open('data.json.gz', 'wt') as f: json.dump(data, f)"
  },
  {
    question: "What happens if an un-serializable object is encountered halfway through 'json.dump(large_list, f)'?",
    shortAnswer: "A 'TypeError' is raised immediately; the file is left partially written and incomplete (which is why atomic writes with temporary files are essential).",
    explanation: "Standard json.dump does not rollback on error.",
    hint: "Leaves the file partially written and corrupted upon raising TypeError.",
    level: "moderate",
    codeExample: "# Atomic writes prevent partial corrupted files on serialization errors"
  },
  {
    question: "How does the 'default' argument in 'json.dumps()' prevent serialization crashes?",
    shortAnswer: "It specifies a fallback callable that is invoked whenever an unsupported object is encountered, returning a serializable representation (e.g. 'default=str').",
    explanation: "Simple way to handle datetimes, decimals, and custom classes.",
    hint: "A fallback function called on unsupported types (e.g. default=str).",
    level: "basic",
    codeExample: "json.dumps({'date': datetime.now()}, default=str)"
  },
  {
    question: "Can 'json.dump()' write directly to a binary stream (e.g. 'wb' mode)?",
    shortAnswer: "No. 'json.dump()' writes string (text) data, so the file must be opened in text mode ('w' with UTF-8 encoding). For binary streams, wrap with 'io.TextIOWrapper'.",
    explanation: "json.dump expects a text writer interface.",
    hint: "No, json.dump requires a text stream; open in text mode ('w').",
    level: "moderate",
    codeExample: "# Requires text mode: open('file.json', 'w', encoding='utf-8')"
  },
  {
    question: "How do you benchmark serialization speed between pretty-printed and minified JSON in Python?",
    shortAnswer: "Using the standard library 'timeit' module: 'timeit.timeit(lambda: json.dumps(data, indent=4), number=1000)'.",
    explanation: "Quantifies CPU and memory impact across serialization strategies.",
    hint: "Use timeit.timeit() to benchmark execution speed.",
    level: "moderate",
    codeExample: "import timeit\ntimeit.timeit(lambda: json.dumps(data), number=1000)"
  },
  {
    question: "What is the 'cls' parameter in 'json.dumps()' and 'json.dump()'?",
    shortAnswer: "It allows passing a custom subclass of 'json.JSONEncoder' to implement domain-specific serialization logic for custom classes, datetimes, and complex objects.",
    explanation: "The standard OOP extension point for Python JSON serialization.",
    hint: "Specifies a custom JSONEncoder subclass.",
    level: "moderate",
    codeExample: "json.dumps(data, cls=CustomEnterpriseEncoder)"
  },
  {
    question: "Why should you never write JSON configuration files directly without atomic swap in multi-threaded systems?",
    shortAnswer: "Because concurrent threads or readers might read the file while it is halfway through being written, resulting in 'JSONDecodeError: Unterminated string / Premature EOF'.",
    explanation: "Atomic replacement ensures readers only ever see 100% complete files.",
    hint: "Concurrent readers will read incomplete half-written files and crash.",
    level: "complex",
    codeExample: "# Use atomic writes to protect concurrent file readers"
  },
  {
    question: "What is the effect of 'sort_keys=False' (the default) on dictionary serialization order in Python 3.7+?",
    shortAnswer: "In Python 3.7+, dictionaries preserve key insertion order; setting 'sort_keys=False' serializes keys in the exact order they were inserted into the dictionary.",
    explanation: "Default behavior in modern Python versions.",
    hint: "Preserves the dictionary's insertion order.",
    level: "basic",
    codeExample: "# Keys are emitted in insertion order"
  },
  {
    question: "What is the ultimate golden rule for JSON Serialization in Python?",
    shortAnswer: "Use 'json.dumps()' for strings and 'json.dump()' for direct file streaming; minify with 'separators=(',', ':')' for APIs; pretty-print with 'indent=4' for admin logs; canonicalize with 'sort_keys=True' for hashing; and always write files atomically with 'os.replace()'.",
    explanation: "The complete enterprise guide to bulletproof JSON serialization.",
    hint: "dumps for strings, dump for files, separators for minification, atomic swap for safety.",
    level: "basic",
    codeExample: "# Python JSON Serialization Mastery"
  }
];

export default questions;
