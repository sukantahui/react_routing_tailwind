// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What are the core logical operators supported in MySQL?",
    shortAnswer: "`AND` (both TRUE), `OR` (either TRUE), `NOT` (negation), and `XOR` (exclusive OR).",
    explanation: "Logical operators combine multiple boolean expressions into a unified filtering condition.",
    hint: "AND, OR, NOT, and XOR.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore' AND is_active = 1;"
  },
  {
    question: "What is the operator precedence order between `NOT`, `AND`, and `OR`?",
    shortAnswer: "1. `NOT` (highest), 2. `AND` (middle), 3. `OR` / `XOR` (lowest).",
    explanation: "Because `AND` binds tighter than `OR`, MySQL evaluates `AND` expressions before `OR` expressions unless parentheses `()` are used.",
    hint: "NOT precedes AND, which precedes OR.",
    level: "basic"
  },
  {
    question: "Why does `WHERE city = 'Barrackpore' OR city = 'Kolkata' AND fee >= 15000` return students from Barrackpore with fee < 15000?",
    shortAnswer: "Because `AND` takes precedence, parsing as `WHERE city = 'Barrackpore' OR (city = 'Kolkata' AND fee >= 15000)`.",
    explanation: "To apply the fee filter to both cities, parentheses are required: `WHERE (city = 'Barrackpore' OR city = 'Kolkata') AND fee >= 15000`.",
    hint: "Parentheses grouping rule for OR clauses.",
    level: "moderate",
    codeExample: "-- Correct grouping:\nWHERE (city = 'Barrackpore' OR city = 'Kolkata') AND admission_fee >= 15000.00"
  },
  {
    question: "What is Short-Circuit Evaluation in SQL boolean logic?",
    shortAnswer: "The query engine stops evaluating remaining conditions in an expression as soon as the outcome is already determined.",
    explanation: "In `FALSE AND complex_fn()`, MySQL skips `complex_fn()` because FALSE AND anything is always FALSE.",
    hint: "Early exit in boolean evaluation.",
    level: "moderate"
  },
  {
    question: "What does the `XOR` (Exclusive OR) operator do in MySQL?",
    shortAnswer: "It returns `1` (TRUE) if exactly ONE of the operands is TRUE (and the other is FALSE). If both are TRUE or both are FALSE, it returns `0`.",
    explanation: "`SELECT (1 XOR 0);` returns 1; `SELECT (1 XOR 1);` returns 0.",
    hint: "Exclusive OR logic.",
    level: "moderate",
    codeExample: "SELECT * FROM users WHERE is_student XOR is_teacher;"
  },
  {
    question: "How does `TRUE OR UNKNOWN` evaluate in Three-Valued Logic?",
    shortAnswer: "It evaluates to `TRUE` (1) and is retained by the WHERE clause.",
    explanation: "Because at least one condition in the `OR` expression is definitively TRUE, the unknown status of the other operand does not prevent the entire expression from succeeding.",
    hint: "TRUE OR anything is TRUE.",
    level: "moderate"
  },
  {
    question: "How does `FALSE AND UNKNOWN` evaluate in Three-Valued Logic?",
    shortAnswer: "It evaluates to `FALSE` (0) and is rejected by the WHERE clause.",
    explanation: "Because one operand is definitively FALSE, the `AND` condition cannot possibly be TRUE regardless of what the unknown value is.",
    hint: "FALSE AND anything is FALSE.",
    level: "moderate"
  },
  {
    question: "How does `TRUE AND UNKNOWN` evaluate in Three-Valued Logic?",
    shortAnswer: "It evaluates to `UNKNOWN` (NULL) and is rejected by the WHERE clause.",
    explanation: "Since the second condition could be false, the outcome remains undetermined (UNKNOWN).",
    hint: "TRUE AND UNKNOWN is UNKNOWN.",
    level: "moderate"
  },
  {
    question: "What is De Morgan's Law for refactoring `NOT (A AND B)`?",
    shortAnswer: "`NOT (A AND B)` is logically identical to `(NOT A) OR (NOT B)`.",
    explanation: "Applying De Morgan's laws allows rewriting complex negated clauses into clearer index-friendly expressions.",
    hint: "De Morgan's first theorem.",
    level: "expert",
    codeExample: "-- NOT (city = 'Kolkata' AND fee > 15000)\n-- is equivalent to:\n-- city <> 'Kolkata' OR fee <= 15000"
  },
  {
    question: "What is De Morgan's Law for refactoring `NOT (A OR B)`?",
    shortAnswer: "`NOT (A OR B)` is logically identical to `(NOT A) AND (NOT B)`.",
    explanation: "For example, `NOT (status = 'cancelled' OR status = 'refunded')` equals `status <> 'cancelled' AND status <> 'refunded'`.",
    hint: "De Morgan's second theorem.",
    level: "expert"
  },
  {
    question: "Can double ampersand `&&` and double pipe `||` be used as synonyms for `AND` and `OR` in MySQL?",
    shortAnswer: "Yes, by default `&&` means `AND` and `||` means `OR` (unless `PIPES_AS_CONCAT` SQL mode is enabled).",
    explanation: "While supported, writing explicit `AND` and `OR` keywords is standard ANSI SQL practice and avoids collisions with string concatenation.",
    hint: "&& and || operators in MySQL.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore' && is_active = 1;"
  },
  {
    question: "What happens if `PIPES_AS_CONCAT` is enabled in `sql_mode` regarding the `||` operator?",
    shortAnswer: "`||` becomes the standard string concatenation operator (like `CONCAT()`) rather than logical `OR`.",
    explanation: "In ANSI SQL compliant systems (PostgreSQL, Oracle, and MySQL with PIPES_AS_CONCAT), `'a' || 'b'` yields `'ab'`.",
    hint: "PIPES_AS_CONCAT mode switch.",
    level: "expert",
    codeExample: "SET sql_mode = 'PIPES_AS_CONCAT';\nSELECT 'Hello ' || 'World'; -- Returns 'Hello World'"
  },
  {
    question: "How does the `NOT` operator interact with the `IN` operator (`NOT IN`)?",
    shortAnswer: "It negates the list membership, returning TRUE only if the value does not match any element in the list.",
    explanation: "`WHERE city NOT IN ('Kolkata', 'Delhi')` excludes students from those cities.",
    hint: "NOT IN list exclusion.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city NOT IN ('Kolkata', 'Delhi');"
  },
  {
    question: "Why should you prefer `AND` conditions on separate indexed columns over `OR` conditions?",
    shortAnswer: "`AND` conditions allow MySQL to use composite indexes or single-index range seeks; `OR` conditions often require an Index Merge algorithm or full table scan.",
    explanation: "In `WHERE col_a = 1 OR col_b = 2`, MySQL must inspect two independent index trees and merge their row ID pointers.",
    hint: "Index Merge vs Composite B-Tree lookups.",
    level: "expert"
  },
  {
    question: "What does `NOT (col IS NULL)` evaluate to?",
    shortAnswer: "It evaluates identically to `col IS NOT NULL`.",
    explanation: "Both forms verify that the column contains a concrete, non-missing value.",
    hint: "NOT IS NULL equivalence.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE NOT (phone_no IS NULL);"
  },
  {
    question: "How do you combine three conditions where Condition 1 must be true, and either Condition 2 or Condition 3 must be true?",
    shortAnswer: "`WHERE cond1 AND (cond2 OR cond3)`.",
    explanation: "Parentheses ensure the OR branch is resolved before the AND condition is enforced.",
    hint: "Parentheses grouping.",
    level: "basic",
    codeExample: "WHERE is_enrolled = 1 AND (admission_fee <= 15000 OR scholarship_granted = 1)"
  },
  {
    question: "What is the return value of `SELECT (NOT 0)` vs `SELECT (NOT 1)` in MySQL?",
    shortAnswer: "`NOT 0` returns `1` (TRUE); `NOT 1` returns `0` (FALSE).",
    explanation: "In MySQL, integer 0 is boolean FALSE and non-zero integers are boolean TRUE.",
    hint: "Numeric boolean inversion.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT (NOT NULL)`?",
    shortAnswer: "`NULL` (UNKNOWN).",
    explanation: "Inverting an unknown value remains unknown in Three-Valued Logic.",
    hint: "Negating NULL remains NULL.",
    level: "moderate"
  },
  {
    question: "How does the MySQL query optimizer order multiple `AND` conditions internally?",
    shortAnswer: "The cost-based optimizer reorders `AND` conditions to evaluate the most selective (filtering the most rows) or cheapest indexed condition first, regardless of code order.",
    explanation: "However, relying on optimizer intelligence does not excuse writing clean, well-structured logical code.",
    hint: "Cost-based optimizer condition reordering.",
    level: "expert"
  },
  {
    question: "What is an 'Index Merge Union' in an `OR` query?",
    shortAnswer: "When MySQL uses two separate indexes for two conditions joined by `OR`, scans both indexes in parallel, and performs a set union on row IDs.",
    explanation: "Visible in `EXPLAIN` as `type: index_merge, Extra: Using union(idx_a, idx_b)`.",
    hint: "Using union index merge.",
    level: "expert"
  },
  {
    question: "How can you rewrite an expensive `OR` query between two tables into a `UNION ALL` for better performance?",
    shortAnswer: "By splitting the query into two separate fast indexed SELECT statements and combining their results with `UNION`.",
    explanation: "`SELECT * FROM t WHERE a = 1 UNION SELECT * FROM t WHERE b = 2;` allows each sub-query to utilize its dedicated B-Tree index at full speed.",
    hint: "UNION optimization for OR queries.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore'\nUNION\nSELECT * FROM students WHERE admission_fee > 20000;"
  },
  {
    question: "How do you test that a value satisfies multiple range criteria simultaneously using `AND`?",
    shortAnswer: "`WHERE score >= 70 AND score <= 90` (or `WHERE score BETWEEN 70 AND 90`).",
    explanation: "Tests bounded intervals.",
    hint: "Compound range testing.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE age >= 18 AND age <= 25;"
  },
  {
    question: "What does `WHERE NOT (a = 10)` evaluate to when `a` is NULL?",
    shortAnswer: "It evaluates to `UNKNOWN` (NULL) and the row is excluded from the query output.",
    explanation: "`a = 10` is UNKNOWN; `NOT (UNKNOWN)` is UNKNOWN; WHERE rejects UNKNOWN.",
    hint: "Negation does not capture NULL rows.",
    level: "moderate"
  },
  {
    question: "How do you construct a boolean XOR truth table in MySQL?",
    shortAnswer: "`0 XOR 0 = 0`, `0 XOR 1 = 1`, `1 XOR 0 = 1`, `1 XOR 1 = 0`, `NULL XOR anything = NULL`.",
    explanation: "XOR returns TRUE only when operands have opposing truth values.",
    hint: "XOR parity truth table.",
    level: "moderate"
  },
  {
    question: "Why should developers avoid deeply nested boolean logic trees in WHERE clauses?",
    shortAnswer: "Deeply nested clauses (`((A OR B) AND C) OR (D AND (E OR F))`) are difficult to maintain, prone to logical precedence bugs, and difficult for the query optimizer to index.",
    explanation: "Refactoring into simpler CTEs or clean views improves maintainability and indexing.",
    hint: "Maintainability and optimizer complexity.",
    level: "moderate"
  },
  {
    question: "Can logical operators be used in `JOIN` `ON` clauses?",
    shortAnswer: "Yes, `JOIN table_b ON table_a.id = table_b.id AND table_b.is_active = 1` combines join criteria with filtering.",
    explanation: "In outer joins, filtering in the `ON` clause restricts the joined table before outer row preservation.",
    hint: "Compound ON conditions.",
    level: "moderate",
    codeExample: "SELECT * FROM orders o\nJOIN order_items i ON o.order_id = i.order_id AND i.is_cancelled = 0;"
  },
  {
    question: "How do you check that at least one of three columns is NOT NULL?",
    shortAnswer: "`WHERE phone_no IS NOT NULL OR email IS NOT NULL OR alt_phone IS NOT NULL` (or `WHERE COALESCE(phone, email, alt_phone) IS NOT NULL`).",
    explanation: "Using `COALESCE` provides a compact alternative to multiple `OR` conditions.",
    hint: "COALESCE vs OR chain for null checking.",
    level: "basic",
    codeExample: "SELECT * FROM contacts WHERE COALESCE(phone, email, alt_phone) IS NOT NULL;"
  },
  {
    question: "What happens if you combine `NOT` with `LIKE` (`NOT LIKE`)?",
    shortAnswer: "It filters out rows matching the specified wildcard pattern.",
    explanation: "`WHERE email NOT LIKE '%@gmail.com'` finds all non-Gmail student accounts.",
    hint: "NOT LIKE pattern exclusion.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE email NOT LIKE '%@gmail.com';"
  },
  {
    question: "What is the difference between `AND` and `OR` in terms of result set selectivity?",
    shortAnswer: "`AND` conditions narrow the result set (intersection), increasing selectivity; `OR` conditions widen the result set (union), decreasing selectivity.",
    explanation: "More AND conditions generally yield fewer, more specific rows.",
    hint: "Intersection vs Union selectivity.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist when constructing complex compound logical expressions in SQL?",
    shortAnswer: "1) Always use parentheses `()` to explicitly define evaluation groups. 2) Remember `AND` evaluates before `OR`. 3) Verify behavior with nullable columns. 4) Use `IN` / `BETWEEN` to simplify OR / AND chains. 5) Inspect `EXPLAIN` for index merge behaviors.",
    explanation: "Following these 5 rules guarantees robust, bug-free, and high-performance queries.",
    hint: "Parentheses grouping, Precedence awareness, Null safety, IN/BETWEEN simplification, EXPLAIN inspection.",
    level: "basic"
  }
];

export default questions;
