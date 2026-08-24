// src/components/study/python/topics/003_004_working-with-json/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: JSON Format overview: types, syntax, and schema standards

const questions = [
  {
    question: "What is JSON and what standard specification defines it?",
    shortAnswer: "JSON (JavaScript Object Notation) is a lightweight, language-independent, text-based data interchange format standardized under RFC 8259 (and ECMA-404).",
    explanation: "Used universally across web APIs, databases, and configuration files.",
    hint: "Standardized text format based on RFC 8259.",
    level: "basic",
    codeExample: '{"status": "OK", "code": 200}'
  },
  {
    question: "What are the 6 native data types supported in the JSON specification?",
    shortAnswer: "1. 'string' (in double quotes), 2. 'number' (integer or floating-point), 3. 'object' (key-value pairs), 4. 'array' (ordered list of values), 5. 'boolean' ('true' / 'false'), 6. 'null'.",
    explanation: "Any data beyond these 6 types must be serialized into string or numeric representations.",
    hint: "String, Number, Object, Array, Boolean, Null.",
    level: "basic",
    codeExample: '{"str": "a", "num": 1, "obj": {}, "arr": [], "bool": true, "nil": null}'
  },
  {
    question: "Why does standard JSON strictly require DOUBLE QUOTES for keys and string values?",
    shortAnswer: "The RFC 8259 grammar mandates double quotes ('\"') for all object keys and string values; using single quotes (''') produces invalid JSON and causes JSONDecodeError.",
    explanation: "Unlike Python and JavaScript literals, JSON does not allow single quotes.",
    hint: "RFC 8259 standard mandates double quotes; single quotes are invalid.",
    level: "basic",
    codeExample: '// INVALID: {\'name\': \'Sourav\'}\n// VALID: {"name": "Sourav"}'
  },
  {
    question: "Are trailing commas allowed in JSON arrays or objects?",
    shortAnswer: "No. Trailing commas after the last element (e.g. '[1, 2,]' or '{\"a\": 1,}') are strictly prohibited by the JSON grammar and raise 'JSONDecodeError'.",
    explanation: "One of the most frequent syntax errors in manually edited JSON files.",
    hint: "No, trailing commas after the last item are strictly forbidden.",
    level: "basic",
    codeExample: '# INVALID: {"a": 1, "b": 2,}\n# VALID: {"a": 1, "b": 2}'
  },
  {
    question: "Are comments (like '//' or '/* */') supported in standard JSON?",
    shortAnswer: "No. The official JSON standard (RFC 8259) explicitly forbids comments to prevent parsers from differing in implementation and syntax parsing.",
    explanation: "Formats like JSON5 or JSONC support comments, but standard JSON does not.",
    hint: "No, standard JSON forbids comments entirely.",
    level: "basic",
    codeExample: '# Comments cause json.decoder.JSONDecodeError'
  },
  {
    question: "How does Python map its native data types to JSON data types?",
    shortAnswer: "'dict' -> 'object', 'list/tuple' -> 'array', 'str' -> 'string', 'int/float' -> 'number', 'True/False' -> 'true/false', 'None' -> 'null'.",
    explanation: "Built-in mapping used by json.dumps() and json.dump().",
    hint: "dict->object, list/tuple->array, str->string, int/float->number, None->null.",
    level: "basic",
    codeExample: "json.dumps({'active': True, 'count': None}) # '{\"active\": true, \"count\": null}'"
  },
  {
    question: "What is the 'Tuple-to-Array Asymmetry' gotcha when round-tripping data through JSON?",
    shortAnswer: "Python tuples are serialized into JSON arrays; when deserialized back via 'json.loads()', they become Python 'lists', losing their original tuple type and immutability.",
    explanation: "json.loads() always creates lists for JSON arrays.",
    hint: "Tuples become lists when serialized to JSON and parsed back.",
    level: "moderate",
    codeExample: "t = (1, 2); l = json.loads(json.dumps(t)); assert type(l) is list"
  },
  {
    question: "What happens if you attempt to serialize a Python 'set' using 'json.dumps()'?",
    shortAnswer: "It raises 'TypeError: Object of type set is not JSON serializable' because JSON has no native set data type.",
    explanation: "Sets must be converted to lists ('list(my_set)') before serialization.",
    hint: "Raises TypeError because JSON does not support sets.",
    level: "basic",
    codeExample: "json.dumps(list({'a', 'b'})) # Must convert set to list first"
  },
  {
    question: "What happens if you attempt to serialize a 'datetime.datetime' object directly with 'json.dumps()'?",
    shortAnswer: "It raises 'TypeError: Object of type datetime is not JSON serializable' unless converted to an ISO 8601 string or handled with a custom JSONEncoder.",
    explanation: "Standard practice is to serialize datetimes as ISO 8601 strings: dt.isoformat().",
    hint: "Raises TypeError unless converted to ISO 8601 string (.isoformat()).",
    level: "basic",
    codeExample: "json.dumps({'time': datetime.now().isoformat()})"
  },
  {
    question: "What happens if you attempt to serialize 'bytes' (e.g. b'raw_data') to JSON?",
    shortAnswer: "It raises 'TypeError: Object of type bytes is not JSON serializable'; binary data must be base64-encoded or decoded to UTF-8 text.",
    explanation: "JSON is strictly a Unicode text format.",
    hint: "Raises TypeError; encode bytes using base64 or decode to UTF-8.",
    level: "basic",
    codeExample: "import base64\njson.dumps({'bin': base64.b64encode(b'abc').decode()})"
  },
  {
    question: "What information does 'json.JSONDecodeError' provide when parsing fails?",
    shortAnswer: "It provides 'exc.msg' (error description), 'exc.lineno' (line number), 'exc.colno' (column number), and 'exc.pos' (byte/char character index in string).",
    explanation: "Allows pin-pointing the exact corrupt character in a large JSON payload.",
    hint: "Provides error message, line number (lineno), column number (colno), and char position.",
    level: "moderate",
    codeExample: "except json.JSONDecodeError as e: print(f'{e.msg} at line {e.lineno}:{e.colno}')"
  },
  {
    question: "What is a 'JSON Schema'?",
    shortAnswer: "A declarative specification standard (JSON Schema Draft-07/2020-12) used to annotate and validate the structure, data types, required keys, and constraints of JSON documents.",
    explanation: "Acts as a formal contract between API producers and consumers.",
    hint: "A declarative specification defining required keys, types, and constraints for JSON.",
    level: "moderate",
    codeExample: '{"type": "object", "required": ["id"], "properties": {"id": {"type": "string"}}}'
  },
  {
    question: "Can JSON object keys be numbers or booleans directly in standard JSON?",
    shortAnswer: "No. In JSON, all object keys MUST be strings enclosed in double quotes. In Python, '{1: \"val\"}' serializes to '{\"1\": \"val\"}', converting the integer key to a string.",
    explanation: "When deserialized, key '1' remains a string and does not revert to an int.",
    hint: "Keys must always be strings; integer keys are converted to strings.",
    level: "moderate",
    codeExample: "json.dumps({101: 'data'}) # Result: '{\"101\": \"data\"}'"
  },
  {
    question: "How does JSON handle Special Floating-Point Values (NaN, Infinity, -Infinity)?",
    shortAnswer: "RFC 8259 strictly forbids 'NaN' and 'Infinity'. By default, Python's 'json' module serializes them non-compliantly unless 'allow_nan=False' is set, which raises 'ValueError'.",
    explanation: "Setting allow_nan=False enforces strict RFC 8259 compliance.",
    hint: "RFC 8259 forbids NaN/Infinity; use allow_nan=False to enforce strict compliance.",
    level: "complex",
    codeExample: "json.dumps({'val': float('nan')}, allow_nan=False) # Raises ValueError"
  },
  {
    question: "What is the difference between JSON and Python Dictionary syntax?",
    shortAnswer: "JSON requires double-quoted keys, lowercase booleans ('true'/'false'), 'null', and no comments/trailing commas. Python dicts allow single quotes, unquoted numbers/tuples as keys, 'True'/'False', 'None', and comments.",
    explanation: "A Python dictionary literal is not automatically valid JSON.",
    hint: "JSON: double quotes, true/false/null. Python: single quotes, True/False/None.",
    level: "basic",
    codeExample: '# Python: {None: True}\n# JSON: {"null": true}'
  },
  {
    question: "What is an 'API Envelope' pattern in JSON payload design?",
    shortAnswer: "A standard API design wrapper containing top-level metadata (status, version, timestamp, error details) alongside the actual data payload: '{\"status\": \"OK\", \"data\": {...}}'.",
    explanation: "Ensures uniform API response structures across endpoints.",
    hint: "A top-level structure containing metadata (status, version) and payload data.",
    level: "moderate",
    codeExample: '{"api_version": "2.0", "status": "SUCCESS", "payload": {...}}'
  },
  {
    question: "What character encoding does the JSON specification require?",
    shortAnswer: "RFC 8259 specifies that JSON text exchanged between systems MUST be encoded in UTF-8 by default (UTF-16 and UTF-32 are allowed only in private contexts).",
    explanation: "Python's json.loads() accepts both str (Unicode) and UTF-8 bytes.",
    hint: "UTF-8 is the mandatory default encoding for JSON.",
    level: "basic",
    codeExample: "# JSON is exchanged in UTF-8 encoding"
  },
  {
    question: "How do escape sequences work in JSON strings?",
    shortAnswer: "Special characters are escaped with a backslash: '\\\"' (quote), '\\\\' (backslash), '\\n' (newline), '\\t' (tab), and '\\uXXXX' (hexadecimal Unicode character).",
    explanation: "Ensures safe representation of control characters in JSON strings.",
    hint: "Uses backslash escape sequences like \\\", \\\\, \\n, \\t, \\uXXXX.",
    level: "basic",
    codeExample: '{"text": "Hello \\"World\\"\\nLine 2"}'
  },
  {
    question: "Why should you never use 'eval()' to parse JSON strings in Python?",
    shortAnswer: "Using 'eval()' executes arbitrary Python code and creates severe remote code execution (RCE) security vulnerabilities; always use 'json.loads()' for safe parsing.",
    explanation: "eval() can execute malicious system commands embedded in strings.",
    hint: "eval() is a critical security vulnerability; always use json.loads().",
    level: "basic",
    codeExample: "# DANGEROUS: data = eval(untrusted_json_string) # NEVER DO THIS!"
  },
  {
    question: "How can you minify a JSON document in Python?",
    shortAnswer: "By passing 'separators=(\",\", \":\")' to 'json.dumps()', removing all redundant whitespace between keys and values for compact transmission over networks.",
    explanation: "Reduces payload bandwidth by up to 30-40%.",
    hint: "Use json.dumps(data, separators=(',', ':')).",
    level: "moderate",
    codeExample: "compact_json = json.dumps(data, separators=(',', ':'))"
  },
  {
    question: "How do you format (pretty-print) a JSON string with 4-space indentation?",
    shortAnswer: "By passing 'indent=4' to 'json.dumps(data, indent=4)'.",
    explanation: "Makes complex nested JSON readable for humans and logs.",
    hint: "Use json.dumps(data, indent=4).",
    level: "basic",
    codeExample: "pretty_json = json.dumps(data, indent=4)"
  },
  {
    question: "What is the role of 'sort_keys=True' in 'json.dumps()'?",
    shortAnswer: "It sorts object keys alphabetically, producing deterministic, canonical JSON strings that are ideal for unit testing, cryptographic hashing, and diffing.",
    explanation: "Ensures consistent string output regardless of dictionary insertion order.",
    hint: "Sorts dictionary keys alphabetically for deterministic output.",
    level: "moderate",
    codeExample: "json.dumps(data, sort_keys=True)"
  },
  {
    question: "Can JSON represent recursive / circular data structures?",
    shortAnswer: "No. Attempting to serialize a circular reference (e.g. 'a = {}; a[\"self\"] = a') raises 'ValueError: Circular reference detected'.",
    explanation: "JSON trees are strictly acyclic directed graphs.",
    hint: "No, circular references raise ValueError (Circular reference detected).",
    level: "moderate",
    codeExample: "# ValueError: Circular reference detected"
  },
  {
    question: "How do you safely validate a required field in a parsed JSON dictionary?",
    shortAnswer: "By checking key existence: 'if \"user_id\" not in data: raise KeyError(\"Missing user_id\")' or using '.get(\"user_id\")' with default fallbacks.",
    explanation: "Standard programmatic validation pattern.",
    hint: "Use 'if key not in data:' or 'data.get(key)'.",
    level: "basic",
    codeExample: "user_id = data.get('user_id') or raise_missing_field()"
  },
  {
    question: "What is the ultimate golden rule for JSON Format & Schema Standards in Python?",
    shortAnswer: "JSON is a strict RFC 8259 text format with 6 data types requiring double quotes and no trailing commas; use 'json.loads()'/'json.dumps()' for safe serialization and validate payload schema contracts prior to processing.",
    explanation: "The foundation of all modern API integration and distributed systems in Python.",
    hint: "Strict RFC 8259 rules: 6 types, double quotes, no trailing commas, schema validation.",
    level: "basic",
    codeExample: "# Python JSON Standards Mastery"
  }
];

export default questions;
