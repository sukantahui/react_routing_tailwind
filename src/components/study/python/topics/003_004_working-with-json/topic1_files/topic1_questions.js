// src/components/study/python/topics/003_004_working-with-json/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: JSON in Python: Mapping Python types to JSON types

const questions = [
  {
    question: "What happens to Python integer, float, and boolean dictionary keys when serialized to JSON?",
    shortAnswer: "They are automatically coerced to strings: '{101: \"data\"}' becomes '{\"101\": \"data\"}', '{True: 1}' becomes '{\"true\": 1}'.",
    explanation: "Mandated because all JSON object keys must be strings.",
    hint: "Keys are automatically coerced into strings during serialization.",
    level: "basic",
    codeExample: "json.dumps({101: 'A'}) # '{\"101\": \"A\"}'"
  },
  {
    question: "What happens if a Python dictionary has a tuple as a key (e.g. '{(\"batch\", 2026): \"AI\"}')?",
    shortAnswer: "By default, it raises 'TypeError: keys must be str, int, float, bool or None, not tuple', because tuples cannot be directly coerced to JSON string keys.",
    explanation: "Complex keys require custom serialization or string conversion.",
    hint: "Raises TypeError because tuple keys cannot be converted automatically.",
    level: "basic",
    codeExample: "json.dumps({('a', 'b'): 1}) # Raises TypeError"
  },
  {
    question: "What is the purpose of the 'skipkeys=True' parameter in 'json.dumps()'?",
    shortAnswer: "When set to True, 'json.dumps(d, skipkeys=True)' silently skips dictionary keys that are not basic types (such as tuples or custom objects) rather than raising a 'TypeError'.",
    explanation: "Safe serialization fallback for dictionaries with heterogeneous keys.",
    hint: "Silently skips keys that cannot be converted to strings.",
    level: "moderate",
    codeExample: "json.dumps(dict_with_tuple_keys, skipkeys=True)"
  },
  {
    question: "How does Python handle 'float(\"nan\")' and 'float(\"inf\")' during JSON serialization by default?",
    shortAnswer: "By default ('allow_nan=True'), Python emits unquoted 'NaN', 'Infinity', and '-Infinity', which is non-compliant with the strict RFC 8259 JSON specification.",
    explanation: "Standard JavaScript parsers and strict REST endpoints reject unquoted NaN.",
    hint: "Emits unquoted NaN/Infinity by default, which is non-compliant with RFC 8259.",
    level: "moderate",
    codeExample: "json.dumps({'score': float('nan')}) # '{\"score\": NaN}'"
  },
  {
    question: "What does setting 'allow_nan=False' do in 'json.dumps()'?",
    shortAnswer: "It enforces strict RFC 8259 compliance by raising a 'ValueError: Out of range float values are not JSON compliant' whenever NaN, Infinity, or -Infinity is encountered.",
    explanation: "Ensures exported JSON is 100% compliant with standard web parsers.",
    hint: "Raises ValueError on NaN or Infinity to enforce strict compliance.",
    level: "moderate",
    codeExample: "json.dumps({'score': float('nan')}, allow_nan=False) # Raises ValueError"
  },
  {
    question: "What happens to Python 'tuples' during a JSON round-trip ('json.loads(json.dumps(data))')?",
    shortAnswer: "Tuples are converted to JSON arrays on serialization, and deserialized back as Python 'lists', losing their original tuple type and immutability.",
    explanation: "The classic 'Tuple-to-Array Asymmetry' in Python JSON processing.",
    hint: "Tuples are converted to lists upon deserialization.",
    level: "basic",
    codeExample: "t = (1, 2); res = json.loads(json.dumps(t)); assert isinstance(res, list)"
  },
  {
    question: "How do you serialize a 'decimal.Decimal' object to JSON?",
    shortAnswer: "By converting it to a 'float' ('float(my_decimal)') or formatted 'str' ('str(my_decimal)'), or using a custom 'JSONEncoder' subclass.",
    explanation: "Decimals are not supported by the default encoder.",
    hint: "Convert Decimal to float or str before serialization.",
    level: "basic",
    codeExample: "from decimal import Decimal\njson.dumps({'fee': float(Decimal('25000.50'))})"
  },
  {
    question: "How do you serialize a Python 'datetime' object to JSON?",
    shortAnswer: "By converting it to an ISO 8601 string representation using 'dt.isoformat()': '{\"timestamp\": datetime.now().isoformat()}'.",
    explanation: "ISO 8601 is the universal standard for date/time strings in JSON APIs.",
    hint: "Convert datetime to string using dt.isoformat().",
    level: "basic",
    codeExample: "json.dumps({'created': datetime.now().isoformat()})"
  },
  {
    question: "What happens to dictionary keys of type 'int' after deserialization with 'json.loads()'?",
    shortAnswer: "They remain of type 'str' (e.g. key '101' remains '\"101\"') because JSON only supports string keys and does not retain the original Python key type information.",
    explanation: "Post-processing is required if original int keys are needed.",
    hint: "Integer keys remain strings in the parsed dictionary.",
    level: "basic",
    codeExample: "d = json.loads('{\"101\": \"A\"}'); assert type(list(d.keys())[0]) is str"
  },
  {
    question: "How do you serialize a Python 'set' to JSON?",
    shortAnswer: "By converting the set to a 'list': 'json.dumps(list(my_set))' (or 'sorted(list(my_set))' for deterministic ordering).",
    explanation: "JSON arrays represent collections, so sets must become lists.",
    hint: "Convert set to list or sorted list using list(my_set).",
    level: "basic",
    codeExample: "json.dumps(sorted(list({'A', 'B'})))"
  },
  {
    question: "How do you serialize Python 'bytes' to JSON?",
    shortAnswer: "By encoding the bytes with Base64: 'base64.b64encode(my_bytes).decode('ascii')' or decoding text directly with '.decode('utf-8')'.",
    explanation: "JSON is purely text-based and cannot store raw binary bytes directly.",
    hint: "Base64 encode the bytes or decode to UTF-8 text.",
    level: "moderate",
    codeExample: "import base64\njson.dumps({'raw': base64.b64encode(b'secret').decode()})"
  },
  {
    question: "Can Python 'None' be used as a dictionary key when serializing to JSON?",
    shortAnswer: "Yes. In Python, '{None: \"value\"}' serializes to '{\"null\": \"value\"}', coercing 'None' to the string '\"null\"'.",
    explanation: "When deserialized, key becomes the string 'null', not NoneType.",
    hint: "Serializes to the string key 'null'.",
    level: "moderate",
    codeExample: "json.dumps({None: 100}) # '{\"null\": 100}'"
  },
  {
    question: "What is the difference between 'json.dumps()' and 'json.dump()'?",
    shortAnswer: "'json.dumps()' serializes a Python object to a JSON-formatted 'str'; 'json.dump()' serializes a Python object and writes it directly to a file-like stream object (e.g. open file).",
    explanation: "'s' stands for string.",
    hint: "dumps() returns a string; dump() writes directly to a file stream.",
    level: "basic",
    codeExample: "s = json.dumps(data) # string\njson.dump(data, file_handle) # file"
  },
  {
    question: "What happens if a dictionary contains circular references when passed to 'json.dumps()'?",
    shortAnswer: "It raises 'ValueError: Circular reference detected' because JSON requires an acyclic tree structure.",
    explanation: "Python tracks visited object IDs to prevent infinite recursion.",
    hint: "Raises ValueError (Circular reference detected).",
    level: "moderate",
    codeExample: "a = {}; a['self'] = a; json.dumps(a) # Raises ValueError"
  },
  {
    question: "How does 'check_circular=False' affect JSON serialization performance?",
    shortAnswer: "Disabling circular reference checking ('check_circular=False') provides a minor speedup for strictly non-circular datasets, but risks stack overflow if circular references exist.",
    explanation: "Use with caution only on trusted non-cyclic data structures.",
    hint: "Bypasses circular checking for slight speedup; risky on cyclic data.",
    level: "complex",
    codeExample: "json.dumps(large_tree, check_circular=False)"
  },
  {
    question: "How can you ensure dictionary keys in JSON output are sorted deterministically?",
    shortAnswer: "By passing 'sort_keys=True' to 'json.dumps(data, sort_keys=True)'.",
    explanation: "Essential for reproducible output, hashing, and git diffs.",
    hint: "Use json.dumps(data, sort_keys=True).",
    level: "basic",
    codeExample: "json.dumps({'b': 1, 'a': 2}, sort_keys=True) # '{\"a\": 2, \"b\": 1}'"
  },
  {
    question: "What is the 'object_pairs_hook' parameter in 'json.loads()'?",
    shortAnswer: "A callback function that receives the decoded key-value pairs as a list of 2-tuples '[(key, val), ...]', commonly used to maintain custom ordering ('collections.OrderedDict') or detect duplicate keys.",
    explanation: "Advanced deserialization hook for fine-grained object creation.",
    hint: "Receives decoded key-value pairs as a list of tuples.",
    level: "complex",
    codeExample: "json.loads(json_str, object_pairs_hook=collections.OrderedDict)"
  },
  {
    question: "What happens if a JSON document contains duplicate keys in an object (e.g. '{\"a\": 1, \"a\": 2}')?",
    shortAnswer: "By default, Python's 'json.loads()' overwrites earlier keys with the last occurrence (so '{\"a\": 2}' is returned); custom hooks can detect or forbid duplicates.",
    explanation: "RFC 8259 allows duplicate keys but leaves behavior implementation-defined.",
    hint: "The last occurrence overwrites earlier occurrences by default.",
    level: "moderate",
    codeExample: "data = json.loads('{\"a\": 1, \"a\": 2}') # data['a'] == 2"
  },
  {
    question: "How can you validate that a restored JSON dictionary has all expected types?",
    shortAnswer: "By implementing a schema validation function that checks 'isinstance(val, ExpectedType)' for all required keys in the deserialized dictionary.",
    explanation: "Protects against type corruption during API consumption.",
    hint: "Use isinstance() checks against a schema definition.",
    level: "basic",
    codeExample: "assert isinstance(data['score'], (int, float))"
  },
  {
    question: "Why does serializing a custom Python class instance raise a 'TypeError' by default?",
    shortAnswer: "Because Python's standard 'JSONEncoder' only knows how to serialize built-in primitive types (dict, list, tuple, str, int, float, bool, None).",
    explanation: "Custom classes require custom serializers or converting 'obj.__dict__'.",
    hint: "Standard JSONEncoder only supports primitive types by default.",
    level: "basic",
    codeExample: "class Student: pass\njson.dumps(Student()) # TypeError"
  },
  {
    question: "How do you sanitize a Python dictionary recursively before JSON export?",
    shortAnswer: "By walking the dictionary tree and converting sets to lists, datetimes to ISO strings, and Decimals to floats before calling 'json.dumps()'.",
    explanation: "Standard production pre-processing pattern.",
    hint: "Recursively transform unsupported types to primitives.",
    level: "moderate",
    codeExample: "def sanitize(d): return {k: v.isoformat() if isinstance(v, datetime) else v for k, v in d.items()}"
  },
  {
    question: "What is the memory impact of deserializing large JSON documents with 'json.loads()'?",
    shortAnswer: "'json.loads()' constructs Python dictionary and list objects on the heap, typically consuming 2x to 4x the raw text byte size in RAM.",
    explanation: "Python object wrapper overhead on primitive values.",
    hint: "Constructed Python dicts/lists occupy 2x-4x more memory than raw JSON text.",
    level: "moderate",
    codeExample: "# 10MB JSON file creates ~30MB of Python dicts in RAM"
  },
  {
    question: "How can you detect NaN values in floating-point metrics before serializing to JSON?",
    shortAnswer: "Using the built-in 'math.isnan(val)' function: 'if math.isnan(val): val = None'.",
    explanation: "Prevents non-compliant NaN outputs in JSON APIs.",
    hint: "Use math.isnan(val) and replace with None.",
    level: "basic",
    codeExample: "clean_val = None if math.isnan(val) else val"
  },
  {
    question: "Can Python 'collections.namedtuple' be serialized directly with 'json.dumps()'?",
    shortAnswer: "Yes. Because 'namedtuple' is a subclass of 'tuple', 'json.dumps()' serializes it as a JSON array '[val1, val2...]', discarding the named attribute keys!",
    explanation: "To preserve named keys, convert to dict first via 'obj._asdict()'.",
    hint: "Serializes as a list; use obj._asdict() to preserve named keys as an object.",
    level: "moderate",
    codeExample: "json.dumps(my_named_tuple._asdict())"
  },
  {
    question: "What is the ultimate golden rule for Mapping Python Types to JSON?",
    shortAnswer: "JSON object keys must always be strings; handle unsupported types (sets, datetimes, decimals) explicitly before serialization; use 'allow_nan=False' for strict API compliance; and account for tuple-to-list asymmetry in round-trips.",
    explanation: "The blueprint for robust data interchange and API reliability in Python.",
    hint: "Stringify keys, convert unsupported types, use allow_nan=False, account for tuple-to-list.",
    level: "basic",
    codeExample: "# Python JSON Type Mapping Mastery"
  }
];

export default questions;
