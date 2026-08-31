// topic9_files/topic9_questions.js

const questions = [
  {
    question: "How do `JSON_SET()`, `JSON_INSERT()`, and `JSON_REPLACE()` differ when modifying a JSON document?",
    shortAnswer: "- `JSON_SET()`: **Upsert** (replaces existing keys; creates new keys if they don't exist).\n- `JSON_INSERT()`: **Insert-only** (creates new keys; leaves existing keys unchanged).\n- `JSON_REPLACE()`: **Update-only** (replaces existing keys; ignores keys that don't exist).",
    explanation: "Fundamental trio of JSON document mutation functions in MySQL.",
    hint: "SET upserts; INSERT creates if missing; REPLACE updates if existing.",
    level: "basic",
    codeExample: "-- Initial: {\"a\": 1}\nSELECT \n  JSON_SET('{\"a\": 1}', '$.a', 2, '$.b', 3),     -- {\"a\": 2, \"b\": 3}\n  JSON_INSERT('{\"a\": 1}', '$.a', 2, '$.b', 3),  -- {\"a\": 1, \"b\": 3}\n  JSON_REPLACE('{\"a\": 1}', '$.a', 2, '$.b', 3); -- {\"a\": 2}"
  },
  {
    question: "How do you dynamically create a JSON object from relational SQL values?",
    shortAnswer: "`JSON_OBJECT('key1', val1, 'key2', val2, ...)`",
    explanation: "Constructs a well-formed JSON object from alternating key-value pairs.",
    hint: "JSON_OBJECT('key', value, ...).",
    level: "basic",
    codeExample: "SELECT JSON_OBJECT('student_id', id, 'name', student_name) AS student_json \nFROM students;"
  },
  {
    question: "How do you construct a JSON array from individual values in MySQL?",
    shortAnswer: "`JSON_ARRAY(val1, val2, val3, ...)`",
    explanation: "Creates a JSON array from the specified arguments.",
    hint: "JSON_ARRAY(val1, val2, ...).",
    level: "basic",
    codeExample: "SELECT JSON_ARRAY('Barrackpore', 'Kolkata', 'Ichapur') AS city_list;"
  },
  {
    question: "What is `JSON_ARRAYAGG()` and how does it differ from standard SQL `GROUP_CONCAT()`?",
    shortAnswer: "`JSON_ARRAYAGG(col)` aggregates rows in a `GROUP BY` query into a **valid JSON array** (preserving types like integers and booleans), whereas `GROUP_CONCAT()` returns a plain comma-separated string.",
    explanation: "Essential for producing hierarchical nested JSON endpoints directly in SQL.",
    hint: "Aggregates rows into a typed JSON array rather than a flat string.",
    level: "basic",
    codeExample: "SELECT \n  department_name, \n  JSON_ARRAYAGG(student_name) AS enrolled_students\nFROM student_directory\nGROUP BY department_name;"
  },
  {
    question: "What is `JSON_OBJECTAGG(key_col, val_col)` used for?",
    shortAnswer: "It aggregates multiple rows into a single **JSON key-value object**, using the first column as keys and the second column as values.",
    explanation: "Constructs dynamic dictionaries from tabular key-value data.",
    hint: "Aggregates key-value rows into a single JSON object.",
    level: "basic",
    codeExample: "SELECT JSON_OBJECTAGG(subject_name, marks) AS report_card \nFROM exam_results \nWHERE student_id = 101;"
  },
  {
    question: "How does `JSON_CONTAINS()` check if an element exists in a JSON array?",
    shortAnswer: "`JSON_CONTAINS(target_json, candidate_value[, path])`: Returns `1` if the candidate exists, otherwise `0`. **String candidates must be wrapped in double quotes** (`'\"React\"'`).",
    explanation: "Target and candidate must both be valid JSON expressions.",
    hint: "JSON_CONTAINS(array_col, '\"target_val\"') (candidate must be valid JSON).",
    level: "basic",
    codeExample: "SELECT * FROM candidate_profiles \nWHERE JSON_CONTAINS(profile->'$.skills', '\"React\"');"
  },
  {
    question: "What does `JSON_CONTAINS_PATH(doc, 'one' | 'all', path1, path2, ...)` do?",
    shortAnswer: "It tests whether specific JSON paths exist in a document:\n- `'one'`: Returns `1` if **at least one** path exists.\n- `'all'`: Returns `1` if **all specified paths** exist.",
    explanation: "Checks schema key presence without retrieving values.",
    hint: "'one' returns 1 if any path exists; 'all' returns 1 if every path exists.",
    level: "basic",
    codeExample: "SELECT JSON_CONTAINS_PATH(profile, 'all', '$.address.city', '$.address.pincode') AS has_full_address \nFROM profiles;"
  },
  {
    question: "How do you remove a key or an array element from a JSON document?",
    shortAnswer: "`JSON_REMOVE(doc, '$.key_to_delete', '$.array[2]')`",
    explanation: "Deletes specified keys or array elements and returns the modified document.",
    hint: "JSON_REMOVE(doc, path1, path2, ...).",
    level: "basic",
    codeExample: "UPDATE candidate_profiles \nSET profile = JSON_REMOVE(profile, '$.temporary_token') \nWHERE student_name = 'Mamata Banerjee';"
  },
  {
    question: "What is the difference between `JSON_MERGE_PATCH()` and `JSON_MERGE_PRESERVE()`?",
    shortAnswer: "- `JSON_MERGE_PATCH()` (RFC 7396): **Overwrites existing keys** with values from the second document (and removes keys set to `null`).\n- `JSON_MERGE_PRESERVE()`: **Combines conflicting values into arrays** rather than overwriting.",
    explanation: "JSON_MERGE_PATCH is the modern standard for document updates.",
    hint: "PATCH overwrites duplicate keys; PRESERVE merges them into an array.",
    level: "expert",
    codeExample: "-- PATCH overwrites: {\"a\": 2, \"b\": 3}\nSELECT JSON_MERGE_PATCH('{\"a\": 1}', '{\"a\": 2, \"b\": 3}');\n\n-- PRESERVE merges to array: {\"a\": [1, 2], \"b\": 3}\nSELECT JSON_MERGE_PRESERVE('{\"a\": 1}', '{\"a\": 2, \"b\": 3}');"
  },
  {
    question: "What does `JSON_SEARCH()` do in MySQL?",
    shortAnswer: "It searches a JSON document for a specific text string and returns the **JSON path(s)** where the string is found: `JSON_SEARCH(doc, 'one'|'all', 'search_text')`.",
    explanation: "Finds the exact path location of matching string values.",
    hint: "Returns the JSON path where a text string is located.",
    level: "expert",
    codeExample: "SELECT JSON_SEARCH(profile, 'one', 'Barrackpore') AS path_to_city \nFROM profiles;"
  },
  {
    question: "What does `JSON_KEYS(doc[, path])` return?",
    shortAnswer: "It returns a **JSON array of top-level key names** for the specified JSON object.",
    explanation: "Allows dynamic introspection of schema keys.",
    hint: "Returns a JSON array of all top-level keys in the object.",
    level: "basic",
    codeExample: "SELECT JSON_KEYS(profile) AS object_keys FROM candidate_profiles;"
  },
  {
    question: "What does `JSON_LENGTH(doc[, path])` return?",
    shortAnswer: "- For an **Object**: Number of top-level keys;\n- For an **Array**: Number of elements;\n- For a **Scalar**: `1`.",
    explanation: "Measures document or array length.",
    hint: "Returns count of keys in an object or elements in an array.",
    level: "basic"
  },
  {
    question: "What is `JSON_PRETTY()` in MySQL 8.0?",
    shortAnswer: "It formats a JSON document with **human-readable indentation and newlines**, making it easy to inspect in CLI tools or logs.",
    explanation: "Useful for debugging and administrative reporting.",
    hint: "Formats JSON with indentation and newlines for human readability.",
    level: "basic",
    codeExample: "SELECT JSON_PRETTY(profile) FROM candidate_profiles WHERE id = 1;"
  },
  {
    question: "How do you append a new element to the end of an existing JSON array?",
    shortAnswer: "`JSON_ARRAY_APPEND(doc, '$.array_path', new_value)`",
    explanation: "Appends elements directly into target arrays within documents.",
    hint: "JSON_ARRAY_APPEND(doc, path, value).",
    level: "basic",
    codeExample: "UPDATE candidate_profiles \nSET profile = JSON_ARRAY_APPEND(profile, '$.skills', 'TypeScript') \nWHERE id = 101;"
  },
  {
    question: "How do you insert an element at a specific index within a JSON array?",
    shortAnswer: "`JSON_ARRAY_INSERT(doc, '$.array_path[index]', new_value)`",
    explanation: "Shifts subsequent elements to the right and inserts the value at the specified index.",
    hint: "JSON_ARRAY_INSERT(doc, '$.array[index]', value).",
    level: "expert"
  },
  {
    question: "What happens when you pass `NULL` as an argument to `JSON_OBJECT()`?",
    shortAnswer: "It creates a JSON key with a literal **JSON `null` value**: `JSON_OBJECT('middle_name', NULL)` → `{\"middle_name\": null}`.",
    explanation: "SQL NULL is converted to JSON null.",
    hint: "Converts SQL NULL to JSON null value in the resulting document.",
    level: "basic"
  },
  {
    question: "What does `JSON_DEPTH()` calculate?",
    shortAnswer: "It calculates the **maximum nesting depth** of a JSON document (e.g. scalar = 1, empty object = 1, `{\"a\": {\"b\": 1}}` = 3).",
    explanation: "Measures document hierarchy complexity.",
    hint: "Returns the maximum nesting depth of the JSON document.",
    level: "expert"
  },
  {
    question: "Can `JSON_OBJECTAGG()` produce duplicate keys?",
    shortAnswer: "If the input column produces duplicate key values, MySQL normalizes the final JSON object by retaining **only the last processed value**, discarding earlier duplicates.",
    explanation: "Adheres to standard JSON document normalization.",
    hint: "Keeps only the last processed value for duplicate keys.",
    level: "expert"
  },
  {
    question: "How do you extract multiple JSON paths simultaneously into separate columns?",
    shortAnswer: "Use multiple path operator expressions in the `SELECT` list: `SELECT col->>'$.name', col->>'$.age', col->>'$.city' FROM tbl;`",
    explanation: "Efficient single-query multi-field extraction.",
    hint: "Select multiple path expressions in the SELECT list.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 9 in Module 004_002?",
    shortAnswer: "MySQL's rich library of JSON functions provides full lifecycle control over documents: create structures with `JSON_OBJECT`/`ARRAYAGG`, execute fine-grained mutations using `JSON_SET`/`INSERT`/`REPLACE`/`REMOVE`, test array membership with `JSON_CONTAINS`, and merge schemas with RFC 7396 `JSON_MERGE_PATCH`.",
    explanation: "Comprehensive functional mastery allows building sophisticated document applications entirely within MySQL.",
    hint: "Full lifecycle control: create with OBJECT/ARRAYAGG, mutate with SET/REPLACE, and search with CONTAINS.",
    level: "basic"
  }
];

export default questions;
