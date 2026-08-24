// src/components/study/python/topics/003_004_working-with-json/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Working with nested JSON structures and API payloads

const questions = [
  {
    question: "What error occurs if you chain multiple '.get()' calls when an intermediate key is missing or None?",
    shortAnswer: "It raises 'AttributeError: 'NoneType' object has no attribute 'get'' because the first missing key returns None, on which '.get()' cannot be invoked.",
    explanation: "The classic intermediate None trap in nested dictionary access.",
    hint: "Raises AttributeError: 'NoneType' object has no attribute 'get'.",
    level: "basic",
    codeExample: "data.get('user', {}).get('profile', {}).get('email')"
  },
  {
    question: "How does the 'safe_get_path(data, path, default)' function prevent traversal crashes?",
    shortAnswer: "It iterates through a sequence of keys and indices, checking whether each intermediate node is a dictionary (for string keys) or a list (for valid integer indices) before advancing.",
    explanation: "Safely handles missing keys, null nodes, and out-of-bounds list indices.",
    hint: "Checks node type and bounds on every step of the path list.",
    level: "basic",
    codeExample: "val = safe_get_path(data, ['campuses', 0, 'top_student', 'name'], default='N/A')"
  },
  {
    question: "What is 'Flattening' a nested JSON document?",
    shortAnswer: "The process of recursively converting a multi-level nested JSON hierarchy into a flat, single-level dictionary where keys are dot-delimited paths: '{\"a.b[0].c\": 100}'.",
    explanation: "Essential for loading nested JSON into relational databases or pandas DataFrames.",
    hint: "Converts nested trees into flat dot-delimited dictionary keys.",
    level: "moderate",
    codeExample: "# {'user.address.city': 'Barrackpore', 'user.scores[0]': 95}"
  },
  {
    question: "What is the standard 'API Envelope' pattern commonly found in REST API responses?",
    shortAnswer: "A root JSON object containing metadata ('status', 'api_version', 'pagination') alongside the actual domain payload stored under a 'data' or 'items' key.",
    explanation: "Standard REST API response format across microservices.",
    hint: "A wrapper object containing metadata (status, pagination) and a 'data' payload.",
    level: "basic",
    codeExample: '{"status": "OK", "pagination": {"page": 1}, "data": {"items": [...]}}'
  },
  {
    question: "How do you extract and aggregate data from deeply nested list items with a generator expression?",
    shortAnswer: "By nesting loops in a generator: 'sum(student[\"fee\"] for camp in data[\"campuses\"] for student in camp[\"students\"])'.",
    explanation: "Processes multi-level nested data in constant O(1) memory.",
    hint: "Use nested for-in clauses inside a generator comprehension.",
    level: "moderate",
    codeExample: "total = sum(s['fee'] for c in campuses for s in c['students'])"
  },
  {
    question: "How do you recursively redact sensitive PII (passwords, tokens, bank accounts) in arbitrary depth JSON trees?",
    shortAnswer: "By recursively walking dictionaries and lists, replacing values whose keys match sensitive key sets (e.g. 'password', 'token') with a mask string like '********'.",
    explanation: "Mandatory security practice before logging or storing untrusted API payloads.",
    hint: "Walk the tree recursively and replace values matching sensitive key names with '********'.",
    level: "moderate",
    codeExample: "def mask(d): return {k: '***' if 'secret' in k else mask(v) if isinstance(v, dict) else v for k, v in d.items()}"
  },
  {
    question: "How do you convert JavaScript 'camelCase' keys to Python 'snake_case' keys recursively?",
    shortAnswer: "By applying a regex substitution 're.sub(r'([a-z0-9])([A-Z])', r'\\1_\\2', key).lower()' to every key across the recursive traversal.",
    explanation: "Standardizes foreign API payloads to idiomatic Python naming conventions.",
    hint: "Use regex substitution recursively on all dictionary keys.",
    level: "moderate",
    codeExample: "re.sub(r'([a-z0-9])([A-Z])', r'\\1_\\2', k).lower()"
  },
  {
    question: "What is 'glom' or 'jmespath' in Python JSON processing?",
    shortAnswer: "Third-party declarative query languages / libraries that allow querying and transforming complex nested JSON trees using expression strings (e.g. 'campuses[*].students[?score > 90].name').",
    explanation: "Declarative alternatives to writing custom recursive traversal functions.",
    hint: "Declarative JSON query libraries for complex path extraction.",
    level: "complex",
    codeExample: "import jmespath\njmespath.search('campuses[*].students[*].name', data)"
  },
  {
    question: "How do you handle 'null' values in intermediate nested JSON nodes safely?",
    shortAnswer: "Always test 'if current is None: return default' during path traversal, because calling '.get()' on None raises an AttributeError.",
    explanation: "A common cause of production API parser crashes.",
    hint: "Check for None before attempting to access child keys.",
    level: "basic",
    codeExample: "if node is None: return default"
  },
  {
    question: "How can you convert a deeply nested JSON array of objects into a flat 'pandas.DataFrame'?",
    shortAnswer: "Using the built-in 'pandas.json_normalize(data[\"items\"])' function, which automatically flattens nested dictionaries into prefixed column headers.",
    explanation: "Standard data science ETL pattern.",
    hint: "Use pandas.json_normalize(data).",
    level: "moderate",
    codeExample: "import pandas as pd\ndf = pd.json_normalize(data['campuses'], record_path=['students'], meta=['campus_name'])"
  },
  {
    question: "What is the recursion limit risk when parsing very deeply nested JSON payloads in Python?",
    shortAnswer: "Deeply recursive traversal functions can trigger 'RecursionError: maximum recursion depth exceeded' (default limit 1000) on pathological inputs; use an iterative stack-based traversal for unbounded depths.",
    explanation: "Protects backend parsers against stack overflow attacks.",
    hint: "Can hit RecursionError; use an iterative stack for unbounded depths.",
    level: "complex",
    codeExample: "stack = [(root, [])] # Iterative traversal pattern"
  },
  {
    question: "How do you merge two deeply nested JSON dictionaries in Python (Deep Merge)?",
    shortAnswer: "By recursively updating keys: if both values are dictionaries, recursively merge them; otherwise, overwrite the destination key with the source value.",
    explanation: "Standard pattern for merging default configurations with user overrides.",
    hint: "Recursively merge child dictionaries rather than doing a shallow dict.update().",
    level: "moderate",
    codeExample: "def deep_merge(a, b): return {k: deep_merge(a[k], b[k]) if k in a and isinstance(a[k], dict) and isinstance(b[k], dict) else b.get(k, a.get(k)) for k in set(a) | set(b)}"
  },
  {
    question: "How do you filter a list of nested dictionaries by a deeply nested property?",
    shortAnswer: "Using list comprehensions with safe navigation: '[item for item in items if item.get(\"academics\", {}).get(\"score\", 0) >= 90]'.",
    explanation: "Filters nested arrays without crashing on missing intermediate keys.",
    hint: "Use list comprehensions checking intermediate get() defaults.",
    level: "basic",
    codeExample: "[item for item in items if item.get('scores', {}).get('math', 0) >= 90]"
  },
  {
    question: "What is the difference between shallow copy and deep copy on nested JSON dictionaries?",
    shortAnswer: "A shallow copy ('dict.copy()') only duplicates the root container, leaving nested child dictionaries and lists shared; 'copy.deepcopy(dict)' recursively duplicates all nested objects.",
    explanation: "Modifying nested structures in shallow copies mutates the original object.",
    hint: "Shallow copy shares nested dicts; deepcopy creates independent copies at all levels.",
    level: "basic",
    codeExample: "import copy\nindependent_copy = copy.deepcopy(nested_dict)"
  },
  {
    question: "How do you find all occurrences of a specific key (e.g. 'id') anywhere in an arbitrary JSON tree?",
    shortAnswer: "Using a generator function that recursively yields values whenever 'k == target_key', traversing all dictionary values and list elements.",
    explanation: "Universal key search pattern.",
    hint: "Recursively traverse dicts and lists, yielding matching keys.",
    level: "moderate",
    codeExample: "def find_all(data, key): ... # Generator yielding all matches"
  },
  {
    question: "How do you update a deeply nested value given a key path (e.g. ['a', 'b', 'c']) in place?",
    shortAnswer: "Navigate to the second-to-last node ('parent = safe_get_path(data, path[:-1])'), then assign 'parent[path[-1]] = new_value'.",
    explanation: "In-place nested value mutation.",
    hint: "Traverse to the parent dictionary, then assign the final key.",
    level: "moderate",
    codeExample: "parent = safe_get(data, path[:-1]); parent[path[-1]] = new_val"
  },
  {
    question: "What is the best way to handle polymorphic nested items (e.g. a mixed list of 'Student' and 'Instructor' objects)?",
    shortAnswer: "Inspect a discriminator property (e.g. 'item[\"role\"]' or 'item[\"__type__\"]') in a loop and branch to the specific parsing logic.",
    explanation: "Standard pattern for heterogeneous API collections.",
    hint: "Check a discriminator tag like item['role'] to branch parser logic.",
    level: "moderate",
    codeExample: "if item.get('role') == 'TEACHER': parse_teacher(item)"
  },
  {
    question: "How do you prune / remove empty dictionaries or None values from a nested JSON tree?",
    shortAnswer: "Using recursive dictionary comprehensions: '{k: clean_empty(v) for k, v in data.items() if v is not None and v != {}}'.",
    explanation: "Cleans sparse JSON trees before serialization.",
    hint: "Recursively filter out None and empty dicts with dict comprehensions.",
    level: "moderate",
    codeExample: "def clean(d): return {k: clean(v) for k, v in d.items() if v is not None}"
  },
  {
    question: "Why should you avoid accessing deeply nested arrays using hardcoded indices like 'data[\"items\"][0][\"id\"]'?",
    shortAnswer: "If the list is empty ('items: []'), Python raises an unhandled 'IndexError' which can crash the entire request handler.",
    explanation: "Always check 'if data[\"items\"]:' or use safe access helpers.",
    hint: "Raises IndexError if the list is empty; use safe path lookup instead.",
    level: "basic",
    codeExample: "# DANGEROUS: data['items'][0]['id']"
  },
  {
    question: "How can you validate that a nested array has at least one element before processing?",
    shortAnswer: "Using truthiness check: 'items = data.get(\"items\", []); if items: process(items[0])'.",
    explanation: "Simple defensive guard pattern.",
    hint: "Check 'if items:' before accessing index 0.",
    level: "basic",
    codeExample: "if items := data.get('items'): process(items[0])"
  },
  {
    question: "How do you compute a nested field's average safely when some items lack the field?",
    shortAnswer: "Filter for valid numbers first: 'scores = [s[\"score\"] for s in students if \"score\" in s and isinstance(s[\"score\"], (int, float))]; avg = sum(scores)/len(scores) if scores else 0.0'.",
    explanation: "Prevents ZeroDivisionError and TypeError on missing/null fields.",
    hint: "Extract valid numeric values into a list and guard against empty lists.",
    level: "basic",
    codeExample: "scores = [x['score'] for x in items if 'score' in x]"
  },
  {
    question: "What is the performance overhead of recursive nested JSON traversal in pure Python?",
    shortAnswer: "Recursive Python function calls have slight stack frame overhead; for millions of deeply nested records, iterative loops or C-extensions (like jmespath) offer higher throughput.",
    explanation: "Tradeoff between expressiveness and execution speed.",
    hint: "Function call overhead is higher than iterative loops for massive datasets.",
    level: "moderate",
    codeExample: "# Use iterative stack for extreme throughput"
  },
  {
    question: "How do you serialize a cyclic nested structure safely?",
    shortAnswer: "Standard JSON cannot represent cycles; you must break the cycle by tracking visited object IDs and replacing cycles with a reference ID or string marker (e.g. '[Circular]').",
    explanation: "Eliminates ValueError: Circular reference detected.",
    hint: "Track visited object IDs in a set and replace cyclic references with markers.",
    level: "complex",
    codeExample: "if id(obj) in visited: return '[Circular]'"
  },
  {
    question: "How can you sort a list of nested dictionaries by a child attribute (e.g. by 'profile.score')?",
    shortAnswer: "Using 'sorted(items, key=lambda x: x.get(\"profile\", {}).get(\"score\", 0), reverse=True)'.",
    explanation: "Sorts complex nested collections safely.",
    hint: "Pass a lambda extracting the nested key to the 'key' argument of sorted().",
    level: "basic",
    codeExample: "sorted(students, key=lambda s: s.get('academics', {}).get('gpa', 0), reverse=True)"
  },
  {
    question: "What is the ultimate golden rule for Working with Nested JSON Structures in Python?",
    shortAnswer: "Never assume nested keys exist; use safe path lookup helpers ('safe_get_path') to avoid 'KeyError'/'IndexError', redact sensitive PII recursively before logging, and normalize keys to 'snake_case' for consistent processing.",
    explanation: "The standard operational guideline for production API data engineering.",
    hint: "Use safe path lookups, redact PII recursively, and normalize keys to snake_case.",
    level: "basic",
    codeExample: "# Python Nested JSON Mastery"
  }
];

export default questions;
