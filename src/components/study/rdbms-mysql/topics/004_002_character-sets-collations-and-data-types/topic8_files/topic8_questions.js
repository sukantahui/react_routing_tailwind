// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What does the `$` symbol represent in MySQL JSON path expressions?",
    shortAnswer: "The `$` symbol represents the **root of the JSON document** being queried.",
    explanation: "All JSON path expressions must begin with $ as the root anchor.",
    hint: "Represents the root of the JSON document.",
    level: "basic"
  },
  {
    question: "What is the difference between the `->` and `->>` operators in MySQL?",
    shortAnswer: "- `->` (`JSON_EXTRACT`): Extracts the value as a **JSON-typed value** (strings remain wrapped in double quotes: `\"Barrackpore\"`).\n- `->>` (`JSON_UNQUOTE(JSON_EXTRACT)`): Extracts and **unquotes** the value as a **plain SQL string (VARCHAR)**: `Barrackpore`.",
    explanation: "Core distinction: -> returns JSON with quotes; ->> returns plain unquoted text.",
    hint: "-> returns quoted JSON; ->> returns unquoted plain SQL string.",
    level: "basic",
    codeExample: "SELECT \n  data->'$.city' AS quoted_json,   -- \"Barrackpore\"\n  data->>'$.city' AS unquoted_text -- Barrackpore\nFROM profiles;"
  },
  {
    question: "Why does `WHERE profile->'$.city' = 'Kolkata'` fail to match rows where city is Kolkata?",
    shortAnswer: "Because `profile->'$.city'` returns the JSON string **`\"\\\"Kolkata\\\"\"`** (with double quotes), which is NOT equal to the SQL string `'Kolkata'` (without double quotes).",
    explanation: "One of the most common beginner traps when querying JSON in MySQL.",
    hint: "Fails because JSON quotes are retained, making '\"Kolkata\"' != 'Kolkata'.",
    level: "basic"
  },
  {
    question: "How should you rewrite `WHERE profile->'$.city' = 'Kolkata'` to ensure correct matching?",
    shortAnswer: "Use the `->>` (extract and unquote) operator: **`WHERE profile->>'$.city' = 'Kolkata'`**.",
    explanation: "Unquotes the JSON string to a standard SQL VARCHAR for comparison.",
    hint: "Use ->> instead of -> in the WHERE clause.",
    level: "basic",
    codeExample: "SELECT * FROM profiles \nWHERE profile->>'$.city' = 'Kolkata';"
  },
  {
    question: "How do you access the first element of a JSON array stored in a column?",
    shortAnswer: "`col->>'$.tags[0]'`",
    explanation: "JSON arrays are 0-indexed in MySQL path syntax.",
    hint: "Use $[0] index notation.",
    level: "basic"
  },
  {
    question: "How do you access the LAST element of a JSON array in MySQL path syntax?",
    shortAnswer: "`col->>'$.tags[last]'` (or `$.tags[last-1]` for second-to-last).",
    explanation: "The `last` keyword provides dynamic end-of-array access without calculating array length.",
    hint: "Use $[last] in the path expression.",
    level: "basic",
    codeExample: "SELECT profile->>'$.scores[last]' AS final_score FROM student_records;"
  },
  {
    question: "How do you extract a sub-array slice (e.g. elements 1 through 3) from a JSON array?",
    shortAnswer: "`col->'$.items[1 to 3]'`",
    explanation: "Path range syntax extracts contiguous elements into a new JSON array.",
    hint: "Use $[1 to 3] range syntax.",
    level: "expert"
  },
  {
    question: "How do you query a JSON object key that contains spaces or hyphens (e.g. `user-name` or `phone number`)?",
    shortAnswer: "Wrap the key name in double quotes within the path: **`col->>'$.\"user-name\"'`** or **`col->>'$.\"phone number\"'`**.",
    explanation: "Quotes escape special characters in JSON path property names.",
    hint: "Wrap the key in double quotes (e.g. $.\"user-name\").",
    level: "basic",
    codeExample: "SELECT metadata->>'$.\"postal-code\"' AS pincode FROM addresses;"
  },
  {
    question: "What does the wildcard `$.*` do in a JSON path expression?",
    shortAnswer: "It matches and returns an array of **all values of all keys** in the top-level JSON object.",
    explanation: "Object wildcard returns all member values.",
    hint: "Returns all property values of the object.",
    level: "basic"
  },
  {
    question: "What does the array wildcard `$[*]` do in a JSON path expression?",
    shortAnswer: "It extracts **all elements** of the target JSON array.",
    explanation: "Array wildcard extracts every item in the array.",
    hint: "Extracts all elements from the array.",
    level: "basic"
  },
  {
    question: "What does the recursive descent operator (`$**`) do in MySQL JSON paths?",
    shortAnswer: "It recursively searches through **all nested child objects and arrays at any depth** to find matching keys (e.g. `$**.city` finds all 'city' keys regardless of nesting depth).",
    explanation: "Deep traversal operator across hierarchical JSON documents.",
    hint: "Recursively searches all nested objects/arrays at any depth.",
    level: "expert",
    codeExample: "SELECT profile->>'$**.pincode' AS any_pincode FROM user_profiles;"
  },
  {
    question: "What does `col->>'$.non_existent_key'` return if the key does not exist in the document?",
    shortAnswer: "It returns **SQL `NULL`** (without throwing an error).",
    explanation: "Graceful null handling for missing schema-less keys.",
    hint: "Returns SQL NULL without throwing an error.",
    level: "basic"
  },
  {
    question: "Can you use `->>` inside `ORDER BY` and `GROUP BY` clauses?",
    shortAnswer: "Yes! `ORDER BY profile->>'$.student_name' ASC` and `GROUP BY profile->>'$.department'` are fully supported.",
    explanation: "Allows dynamic sorting and aggregation on JSON document properties.",
    hint: "Yes, fully supported in ORDER BY and GROUP BY clauses.",
    level: "basic",
    codeExample: "SELECT profile->>'$.department' AS dept, COUNT(*) \nFROM student_profiles \nGROUP BY profile->>'$.department';"
  },
  {
    question: "What is the equivalent function call for `data->'$.user.email'`?",
    shortAnswer: "`JSON_EXTRACT(data, '$.user.email')`",
    explanation: "-> is the concise syntactic sugar for JSON_EXTRACT.",
    hint: "JSON_EXTRACT(data, '$.user.email').",
    level: "basic"
  },
  {
    question: "What is the equivalent function call for `data->>'$.user.email'`?",
    shortAnswer: "`JSON_UNQUOTE(JSON_EXTRACT(data, '$.user.email'))`",
    explanation: "->> is the concise syntactic sugar for JSON_UNQUOTE(JSON_EXTRACT()).",
    hint: "JSON_UNQUOTE(JSON_EXTRACT(data, '$.user.email')).",
    level: "basic"
  },
  {
    question: "How does `->` behave on JSON numbers or booleans compared to `->>`?",
    shortAnswer: "For numbers (e.g. `22`) and booleans (`true`), both return the unquoted token, but `->` returns it with a **JSON type** while `->>` casts it to a **VARCHAR string**.",
    explanation: "Use explicit CAST if you need numeric math on extracted JSON numbers.",
    hint: "-> returns native JSON number; ->> returns string representation.",
    level: "expert"
  },
  {
    question: "How do you extract a numeric JSON value and perform arithmetic operations in SQL?",
    shortAnswer: "Use `CAST()` or `+ 0`: `CAST(profile->>'$.age' AS UNSIGNED) + 1` or `(profile->>'$.fee') + 0`.",
    explanation: "Explicitly converts extracted VARCHAR/JSON to numeric types for math.",
    hint: "Wrap in CAST(col->>'$.key' AS UNSIGNED) or add 0.",
    level: "basic",
    codeExample: "SELECT student_name, CAST(profile->>'$.marks' AS DECIMAL(5,2)) * 1.1 AS bonus_marks \nFROM students;"
  },
  {
    question: "What happens if the JSON column itself contains a SQL `NULL` value?",
    shortAnswer: "Both `->` and `->>` return **SQL `NULL`** immediately.",
    explanation: "Null safety propagation.",
    hint: "Returns SQL NULL.",
    level: "basic"
  },
  {
    question: "Can you perform string pattern matching (`LIKE`) on values extracted with `->>`?",
    shortAnswer: "Yes! `WHERE profile->>'$.city' LIKE 'Barrack%'` works seamlessly because `->>` produces a plain SQL `VARCHAR`.",
    explanation: "Fully compatible with all standard SQL string operators.",
    hint: "Yes, fully compatible with LIKE, IN, and regular expressions.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 8 in Module 004_002?",
    shortAnswer: "Mastering JSON path syntax ($) and distinguishing `->` (returns quoted JSON) from `->>` (returns unquoted plain VARCHAR) is fundamental: always use `->>` in WHERE clauses, ORDER BY, GROUP BY, and JOIN conditions to avoid double-quoted string mismatch bugs.",
    explanation: "Crucial rule for reliable JSON querying in MySQL.",
    hint: "Always use ->> in WHERE, ORDER BY, and JOINs to avoid quoted string matching bugs.",
    level: "basic"
  }
];

export default questions;
