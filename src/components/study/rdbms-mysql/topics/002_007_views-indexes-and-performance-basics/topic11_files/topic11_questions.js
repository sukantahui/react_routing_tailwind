// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the Leftmost Prefix Rule in MySQL composite indexing?",
    shortAnswer: "The rule stating that a composite index `(A, B, C)` can only be used by MySQL to perform index seeks if the query filters on a contiguous sequence of columns starting from the leftmost column `A`.",
    explanation: "Because composite B-Trees are sorted hierarchically starting from the first column.",
    hint: "A composite index can only be searched if queries filter starting from the leftmost column.",
    level: "basic"
  },
  {
    question: "Given a composite index `INDEX (city, stream, status)`, will a query `WHERE city = 'Barrackpore'` use the index?",
    shortAnswer: "YES. It uses the leftmost leading column `city` for a fast B-Tree seek.",
    explanation: "`city` is the first column in the composite index prefix.",
    hint: "Yes; city is the leading leftmost column.",
    level: "basic"
  },
  {
    question: "Given `INDEX (city, stream, status)`, will a query `WHERE stream = 'React'` use the index for a standard B-Tree seek?",
    shortAnswer: "NO. The query skips the leading column `city`, violating the leftmost prefix rule and resulting in a Full Table Scan (or Skip Scan in MySQL 8.0).",
    explanation: "The B-Tree is sorted by city first; without city, stream values are scattered across all city nodes.",
    hint: "No; missing the leading column city prevents standard B-Tree seeks.",
    level: "basic"
  },
  {
    question: "Given `INDEX (city, stream, status)`, will a query `WHERE city = 'Barrackpore' AND stream = 'React'` use the index?",
    shortAnswer: "YES. It uses the first two contiguous columns `(city, stream)` for an optimal 2-level B-Tree seek.",
    explanation: "Matches the 2-column leftmost prefix perfectly.",
    hint: "Yes; uses the two leftmost columns.",
    level: "basic"
  },
  {
    question: "Given `INDEX (city, stream, status)`, will a query `WHERE stream = 'React' AND city = 'Barrackpore'` use the index?",
    shortAnswer: "YES. The MySQL Query Optimizer automatically re-orders `AND` equality predicates to match the leftmost prefix of the index.",
    explanation: "SQL predicate order in WHERE clause does not affect index matching for equality filters.",
    hint: "Yes; MySQL optimizer automatically re-orders equality conditions to match index columns.",
    level: "moderate"
  },
  {
    question: "Given `INDEX (city, stream, status)`, what happens if a query filters on `WHERE city = 'Barrackpore' AND status = 'ACTIVE'` (skipping `stream`)?",
    shortAnswer: "MySQL uses `city` for the initial B-Tree seek, but cannot use `status` for B-Tree seek pruning; `status` is evaluated via Index Condition Pushdown (ICP) at the index leaf level.",
    explanation: "Skipping the middle column halts B-Tree seek traversal at column 1.",
    hint: "Uses city for the B-Tree seek, and filters status via Index Condition Pushdown.",
    level: "expert"
  },
  {
    question: "How can you tell how many columns of a composite index are actually being used by inspecting `EXPLAIN`?",
    shortAnswer: "By checking the `key_len` column in `EXPLAIN`, which shows the exact byte length of the index prefix used for tree traversal.",
    explanation: "Comparing key_len against column data type byte sizes reveals which columns participated in the seek.",
    hint: "Inspect the key_len column in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "How is `key_len` calculated for a `VARCHAR(50) NULL` column in `utf8mb4` encoding in MySQL InnoDB?",
    shortAnswer: "203 bytes: $(50 \\times 4\\text{ bytes}) + 2\\text{ bytes (length prefix)} + 1\\text{ byte (NULL flag)} = 203\\text{ bytes}$.",
    explanation: "utf8mb4 uses up to 4 bytes per char + 2 length bytes + 1 null flag byte.",
    hint: "(50 * 4) + 2 + 1 = 203 bytes.",
    level: "expert"
  },
  {
    question: "If `INDEX (col1, col2)` has `col1` taking 4 bytes (INT) and `col2` taking 4 bytes (INT), what does `key_len = 4` in `EXPLAIN` indicate?",
    shortAnswer: "It indicates that MySQL only used `col1` for the B-Tree seek; `col2` was not utilized in the seek.",
    explanation: "A key_len of 4 covers only the first 4-byte INT column.",
    hint: "Only col1 was used for the index seek.",
    level: "moderate"
  },
  {
    question: "If in the previous scenario `key_len = 8` in `EXPLAIN`, what does that indicate?",
    shortAnswer: "It indicates that MySQL used BOTH `col1` (4 bytes) AND `col2` (4 bytes) in the B-Tree seek.",
    explanation: "8 bytes covers the combined width of both columns.",
    hint: "Both col1 and col2 participated in the B-Tree seek.",
    level: "moderate"
  },
  {
    question: "What is the 'Index Skip Scan' optimization introduced in MySQL 8.0?",
    shortAnswer: "An optimization where MySQL uses a composite index `(A, B)` for queries filtering only on `B` by iterating over distinct values of low-cardinality leading column `A` and performing mini-seeks for `B`.",
    explanation: "Allows skipping the leading column if it has very few distinct values.",
    hint: "Iterates through distinct values of leading column A to seek column B.",
    level: "expert"
  },
  {
    question: "What appears in `EXPLAIN Extra` when Index Skip Scan is active in MySQL 8.0+?",
    shortAnswer: "`Using index for skip scan`",
    explanation: "Confirms that the engine is performing multiple mini-seeks across distinct leading key groups.",
    hint: "Using index for skip scan",
    level: "moderate"
  },
  {
    question: "Under what conditions is Index Skip Scan effective?",
    shortAnswer: "When the leading column `A` has very low cardinality (e.g. 2 to 5 distinct values like gender or branch) and column `B` has high cardinality.",
    explanation: "High cardinality in column A makes skip scan too expensive compared to table scan.",
    hint: "When the leading column has very low cardinality (few distinct values).",
    level: "expert"
  },
  {
    question: "Can a composite index `(A, B, C)` be used for `ORDER BY A, B`?",
    shortAnswer: "YES. It satisfies the sort order directly from the index leaves with zero `filesort` overhead.",
    explanation: "Follows the leftmost prefix sorting sequence.",
    hint: "Yes; matches the leftmost sorting order of the index.",
    level: "basic"
  },
  {
    question: "Can `(A, B, C)` be used for `ORDER BY B, C` without a `WHERE` clause on `A`?",
    shortAnswer: "NO. Skipping the leading column `A` breaks the sorting prefix, requiring a `filesort`.",
    explanation: "Rows are sorted by B only within each group of identical A values.",
    hint: "No; missing column A forces a filesort.",
    level: "moderate"
  },
  {
    question: "Can `(A, B, C)` be used for `WHERE A = 'const' ORDER BY B, C`?",
    shortAnswer: "YES. Because `A` is fixed to a constant value, all remaining rows are already physically sorted by `(B, C)` in the leaf pages.",
    explanation: "Fixing leading columns to constants preserves index sort order for following columns.",
    hint: "Yes; fixing A to a constant preserves the sorting order of (B, C).",
    level: "moderate"
  },
  {
    question: "What happens if a query uses `WHERE A = 'const' ORDER BY B DESC, C ASC` with standard ascending index `(A, B, C)`?",
    shortAnswer: "It triggers a `filesort` because the query requests mixed sort directions (`B DESC, C ASC`) which do not match the index's uniform ascending order.",
    explanation: "Conflicting sort directions within the index require explicit sorting.",
    hint: "Triggers a filesort due to conflicting sort directions.",
    level: "expert"
  },
  {
    question: "How do you optimize the mixed-sort query `ORDER BY B DESC, C ASC` in MySQL 8.0+?",
    shortAnswer: "Create a Descending Composite Index: `CREATE INDEX idx_mixed ON table(A ASC, B DESC, C ASC);`",
    explanation: "Matches the exact directional sorting pattern of the query.",
    hint: "Create a descending index with (A ASC, B DESC, C ASC).",
    level: "expert"
  },
  {
    question: "If you have `INDEX (A, B, C)`, do you need a separate `INDEX (A)` on the same table?",
    shortAnswer: "NO. `INDEX (A)` is 100% redundant because `INDEX (A, B, C)` already satisfies queries filtering on `A`.",
    explanation: "A composite index covers all prefixes starting from column 1.",
    hint: "No; (A) is completely redundant.",
    level: "basic"
  },
  {
    question: "If you have `INDEX (A, B, C)`, do you need a separate `INDEX (A, B)` on the same table?",
    shortAnswer: "NO. `INDEX (A, B)` is also redundant because `INDEX (A, B, C)` already covers `(A, B)`.",
    explanation: "The 3-column index covers both 1-column and 2-column leftmost prefixes.",
    hint: "No; (A, B) is redundant.",
    level: "basic"
  },
  {
    question: "If you have `INDEX (A, B, C)`, do you need a separate `INDEX (B, A)` on the same table?",
    shortAnswer: "MAYBE YES. If there are frequent queries filtering on `B` alone (without `A`), `INDEX (B, A)` provides a leading index on `B`.",
    explanation: "B is not the leftmost column in (A, B, C), so queries on B need B as the leading column.",
    hint: "Yes, if queries frequently filter on B alone without A.",
    level: "moderate"
  },
  {
    question: "How does the Leftmost Prefix Rule apply to string pattern matching (`LIKE`)?",
    shortAnswer: "`LIKE 'prefix%'` (trailing wildcard) uses the B-Tree index seek, but `LIKE '%suffix'` (leading wildcard) violates prefix matching and cannot use the B-Tree.",
    explanation: "Characters in a string are indexed left-to-right like composite sub-keys.",
    hint: "Trailing wildcard LIKE 'abc%' uses index; leading wildcard LIKE '%abc' cannot.",
    level: "basic"
  },
  {
    question: "Can an index `(city, enrollment_date)` accelerate `WHERE city = 'Barrackpore' AND YEAR(enrollment_date) = 2026`?",
    shortAnswer: "Only for `city`; wrapping `enrollment_date` in the `YEAR()` function disables B-Tree seek for the date column.",
    explanation: "Function transformations on columns prevent B-Tree key matching.",
    hint: "Only city uses the index; YEAR() wrapper disables index seek on enrollment_date.",
    level: "moderate"
  },
  {
    question: "How should the query in the previous question be rewritten to utilize the full composite index?",
    shortAnswer: "`WHERE city = 'Barrackpore' AND enrollment_date >= '2026-01-01' AND enrollment_date <= '2026-12-31'`",
    explanation: "Rewriting as a sargable date range allows full B-Tree seek and leaf scan.",
    hint: "Rewrite as a sargable date range: BETWEEN '2026-01-01' AND '2026-12-31'.",
    level: "moderate"
  },
  {
    question: "How does the Leftmost Prefix Rule impact `COUNT(DISTINCT ...)` queries?",
    shortAnswer: "`COUNT(DISTINCT A)` or `COUNT(DISTINCT A, B)` can be computed directly from `INDEX (A, B, C)` leaf pages with zero temporary tables.",
    explanation: "Prefixes maintain pre-grouped unique keys in sorted order.",
    hint: "Computes unique counts directly from the index leaves without temporary tables.",
    level: "moderate"
  },
  {
    question: "What is the danger of creating indexes in the order `(status, user_id)` if `status` has only 2 values ('ACTIVE', 'INACTIVE')?",
    shortAnswer: "Queries filtering only on `user_id` cannot use standard index seek, and `status` offers poor initial pruning unless combined with user_id.",
    explanation: "Placing high-cardinality `user_id` first allows point seeks on user_id alone.",
    hint: "Putting low-cardinality status first hurts queries filtering on user_id alone.",
    level: "expert"
  },
  {
    question: "Why should the most selective / frequently queried column generally be placed first in a composite index?",
    shortAnswer: "To maximize reusability across single-column queries and eliminate the largest fraction of rows immediately in the B-Tree traversal.",
    explanation: "Leading column determines which single-column queries can reuse the index.",
    hint: "Maximizes index reusability for single-column searches and prunes rows early.",
    level: "moderate"
  },
  {
    question: "Can `(A, B, C)` be used for `WHERE A IN (1, 2, 3) AND B = 'test'`?",
    shortAnswer: "YES. MySQL evaluates multiple equality seeks for each value of `A` and uses `B` for tree pruning across all matched branches.",
    explanation: "IN lists with constants act as multiple equality seeks.",
    hint: "Yes; IN list executes multiple equality seeks across the index branches.",
    level: "expert"
  },
  {
    question: "How does the Leftmost Prefix Rule relate to student searches in Barrackpore and Kolkata for Mamata, Susmita, Abhronila, and Debangshu?",
    shortAnswer: "With `INDEX (centre_city, course_stream)`, queries filtering by `centre_city = 'Barrackpore'` run at sub-millisecond speeds, but searching for `course_stream = 'React'` alone requires index skip scan or a dedicated index.",
    explanation: "Demonstrates practical prefix matching behavior in academy databases.",
    hint: "Searching by city alone works, but searching by stream alone requires the leading city column.",
    level: "basic"
  },
  {
    question: "What is the senior developer's summary rule for the Leftmost Prefix Rule?",
    shortAnswer: "Always query composite indexes starting from the leftmost column, inspect `key_len` to ensure full prefix participation, and avoid creating redundant sub-prefix indexes.",
    explanation: "Mastering the leftmost prefix rule is fundamental to efficient relational schema design.",
    hint: "Query contiguous leftmost prefixes, audit key_len, and eliminate redundant sub-prefix indexes.",
    level: "expert"
  }
];

export default questions;
