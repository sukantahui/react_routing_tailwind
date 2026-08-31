// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a Single-Column Index?",
    shortAnswer: "A B+Tree index constructed over exactly one column of a database table.",
    explanation: "Accelerates queries that filter or sort on that single column.",
    hint: "An index built on exactly one column.",
    level: "basic"
  },
  {
    question: "What is a Composite (Multi-Column / Compound) Index?",
    shortAnswer: "A single B+Tree index constructed over multiple columns (up to 16 in InnoDB) in a specific defined order.",
    explanation: "Allows filtering, sorting, and grouping across multiple columns in a single index tree traversal.",
    hint: "A single index spanning multiple columns.",
    level: "basic"
  },
  {
    question: "How are records physically sorted inside a Composite Index B+Tree `(col1, col2, col3)`?",
    shortAnswer: "Lexicographically: sorted primarily by `col1`; for identical values of `col1`, sub-sorted by `col2`; for identical values of `col1` and `col2`, sub-sorted by `col3`.",
    explanation: "Identical to a telephone book sorted by (LastName, FirstName).",
    hint: "Lexicographically: primary sort by col1, secondary by col2, tertiary by col3.",
    level: "basic"
  },
  {
    question: "What is 'Index Merge' (e.g. `Using intersect`) in MySQL?",
    shortAnswer: "The query execution method where MySQL scans multiple separate single-column indexes independently and intersects or unions their primary key lists in memory.",
    explanation: "Used as a fallback when a multi-column query lacks a composite index.",
    hint: "Scanning multiple single-column indexes and merging their PK lists in RAM.",
    level: "moderate"
  },
  {
    question: "Why is a single Composite Index faster than Index Merge across multiple single-column indexes?",
    shortAnswer: "A composite index locates matching rows in a single $O(\\log N)$ B-Tree traversal, whereas Index Merge requires scanning multiple index trees and computing set intersections in memory.",
    explanation: "Eliminates multi-tree I/O and RAM intersection overhead.",
    hint: "Single B-Tree seek vs scanning multiple trees and intersecting in RAM.",
    level: "moderate"
  },
  {
    question: "What is the maximum number of columns that can participate in a single Composite Index in MySQL InnoDB?",
    shortAnswer: "16 columns.",
    explanation: "InnoDB enforces a limit of 16 columns and 3072 bytes per composite index key prefix.",
    hint: "16 columns.",
    level: "basic"
  },
  {
    question: "What is the general golden rule for column ordering when designing a composite index?",
    shortAnswer: "Place Equality filter columns first (`col = value`), followed by High-Cardinality columns, followed by Range filter columns (`>`, `<`, `BETWEEN`), and finally `ORDER BY` sorting columns.",
    explanation: "Maximizes index pruning before reaching range and sort operations.",
    hint: "Equality columns first → Range columns → Sorting columns.",
    level: "expert"
  },
  {
    question: "If a table has a composite index `idx_name (city, stream)`, is a separate single-column index on `city` redundant?",
    shortAnswer: "YES. The composite index `(city, stream)` automatically serves as an index on `city` alone because `city` is the leftmost leading column.",
    explanation: "The leftmost prefix rule makes a separate index on the leading column redundant.",
    hint: "Yes; the leading column is already indexed by the composite index.",
    level: "moderate"
  },
  {
    question: "In the previous scenario, is a separate single-column index on `stream` redundant?",
    shortAnswer: "NO. Because `stream` is the second column in `(city, stream)`, a query filtering ONLY on `stream` cannot use the composite index efficiently.",
    explanation: "B-Trees cannot search non-leading columns without scanning the entire index.",
    hint: "No; stream is not the leading column, so a separate index may be needed.",
    level: "moderate"
  },
  {
    question: "Can a composite index satisfy both a `WHERE` clause and an `ORDER BY` clause simultaneously?",
    shortAnswer: "YES. For example, `INDEX (city, enrollment_date)` satisfies `WHERE city = 'Barrackpore' ORDER BY enrollment_date DESC` without requiring a `filesort`.",
    explanation: "Because rows for 'Barrackpore' are already stored in sorted order by `enrollment_date` in the leaf pages.",
    hint: "Yes; eliminates filesort by leveraging the pre-sorted composite leaf order.",
    level: "moderate"
  },
  {
    question: "What appears in `EXPLAIN Extra` when an `ORDER BY` cannot use an index and must sort in memory/disk?",
    shortAnswer: "`Using filesort`",
    explanation: "'Using filesort' indicates that the database had to perform an explicit sorting pass.",
    hint: "Using filesort",
    level: "basic"
  },
  {
    question: "How does a composite index help achieve a Covering Index for a multi-column report?",
    shortAnswer: "By including all filter, join, sort, and projected columns in the composite index, all data is returned from the index leaf with zero clustered table lookups.",
    explanation: "Covering composite indexes maximize read throughput for analytics.",
    hint: "Includes all selected and filtered columns, eliminating base table lookups.",
    level: "moderate"
  },
  {
    question: "What happens if a query filters on `WHERE city = 'Barrackpore' AND age > 20 AND stream = 'React'` with index `(city, age, stream)`?",
    shortAnswer: "The index uses `city` (equality) and `age` (range), but `stream` cannot be used for B-Tree pruning because a range operator (`>`) stops B-Tree index traversal for subsequent columns.",
    explanation: "Range conditions terminate index seek traversal for following columns.",
    hint: "The range operator on 'age' halts B-Tree pruning for subsequent columns.",
    level: "expert"
  },
  {
    question: "How should the composite index in the previous question be re-ordered for optimal performance?",
    shortAnswer: "Re-order as `(city, stream, age)`: both equality columns (`city`, `stream`) are evaluated first in the B-Tree seek, followed by the range on `age`.",
    explanation: "Placing equality columns before range columns maximizes index pruning.",
    hint: "Re-order as (city, stream, age).",
    level: "expert"
  },
  {
    question: "Why shouldn't you create a 12-column composite index on every table 'just in case'?",
    shortAnswer: "Because wide composite indexes consume large amounts of disk and Buffer Pool memory, and drastically amplify write penalties on `INSERT`, `UPDATE`, and `DELETE`.",
    explanation: "Excessive composite indexes cause severe write degradation.",
    hint: "Wastes memory/disk and causes massive write amplification overhead.",
    level: "moderate"
  },
  {
    question: "What is the maximum byte length limit for an InnoDB composite index key prefix?",
    shortAnswer: "3,072 bytes (in `DYNAMIC` and `COMPACT` row formats with `innodb_large_prefix` enabled).",
    explanation: "Total sum of column byte lengths in the index cannot exceed 3072 bytes.",
    hint: "3,072 bytes.",
    level: "expert"
  },
  {
    question: "Can a composite index contain columns with different data types (e.g. `VARCHAR`, `INT`, `DECIMAL`)?",
    shortAnswer: "YES. Composite indexes support mixed data types across participating columns.",
    explanation: "MySQL serializes mixed data types into a single binary composite key.",
    hint: "Yes; columns can have different data types.",
    level: "basic"
  },
  {
    question: "Can a composite index include a column sorted in descending order (`DESC`) in MySQL 8.0+?",
    shortAnswer: "YES. MySQL 8.0+ supports true **Descending Indexes** (e.g. `INDEX (city ASC, score DESC)`).",
    explanation: "Prior to MySQL 8.0, the DESC keyword was parsed but ignored.",
    hint: "Yes; MySQL 8.0+ supports true descending indexes.",
    level: "moderate"
  },
  {
    question: "How does a Descending Index `(city ASC, score DESC)` benefit a query `WHERE city = 'Barrackpore' ORDER BY score DESC`?",
    shortAnswer: "It allows forward scanning of leaf pages in exact requested sort order, eliminating backward scans and multi-column filesorts.",
    explanation: "Matches the exact mixed-order sorting requirement of the query.",
    hint: "Scans leaf pages forward without filesort overhead.",
    level: "expert"
  },
  {
    question: "Can a `UNIQUE` constraint be defined across multiple columns as a Composite Unique Index?",
    shortAnswer: "YES: `CREATE UNIQUE INDEX uq_student_course ON enrollments (student_id, course_id);`",
    explanation: "Enforces that the combination of values across multiple columns must be unique.",
    hint: "Yes; enforces multi-column uniqueness across the combined values.",
    level: "basic"
  },
  {
    question: "How do `NULL` values behave in a Composite Unique Index in MySQL InnoDB?",
    shortAnswer: "Multiple rows with `NULL` in one or more composite columns are allowed, because in SQL standard, `NULL` is never equal to `NULL`.",
    explanation: "NULLs do not violate unique constraints unless all non-null components match.",
    hint: "Multiple NULL values are permitted and do not violate uniqueness.",
    level: "moderate"
  },
  {
    question: "What is the command to create a composite index named `idx_academy_cohort` on `students (centre_city, course_stream, enrollment_date)`?",
    shortAnswer: "`CREATE INDEX idx_academy_cohort ON students (centre_city, course_stream, enrollment_date);`",
    explanation: "Standard DDL syntax for composite index creation.",
    hint: "CREATE INDEX idx_academy_cohort ON students (centre_city, course_stream, enrollment_date);",
    level: "basic"
  },
  {
    question: "What happens if you run `SHOW INDEX FROM students;` on a table with a 3-column composite index?",
    shortAnswer: "MySQL displays 3 separate rows in the output sharing the same `Key_name`, with `Seq_in_index` numbered 1, 2, and 3.",
    explanation: "Shows the ordering of columns within the composite structure.",
    hint: "Shows 3 rows sharing the same Key_name with Seq_in_index 1, 2, and 3.",
    level: "basic"
  },
  {
    question: "Why does the `Seq_in_index` value matter in composite index introspection?",
    shortAnswer: "It indicates the exact leftmost-to-rightmost sequence of columns in the B-Tree sorting hierarchy.",
    explanation: "Defines the primary, secondary, and tertiary sorting order of keys.",
    hint: "Indicates the column order sequence in the B-Tree hierarchy.",
    level: "moderate"
  },
  {
    question: "Can a composite index be used for a `GROUP BY col1, col2` query?",
    shortAnswer: "YES. Because the composite index physically sorts data by `(col1, col2)`, MySQL performs grouping with zero temporary tables or filesorts.",
    explanation: "The optimizer streams pre-grouped rows directly from the index tree.",
    hint: "Yes; performs grouping without temporary tables or filesort.",
    level: "moderate"
  },
  {
    question: "What is the primary difference in write overhead between having 4 single-column indexes vs 1 composite index with 4 columns?",
    shortAnswer: "4 single-column indexes require updating 4 separate B-Tree index structures per insert, while 1 composite index updates only 1 B-Tree structure.",
    explanation: "1 composite index generates 75% fewer tree modification operations than 4 single indexes.",
    hint: "1 composite index modifies 1 tree; 4 single indexes modify 4 separate trees.",
    level: "expert"
  },
  {
    question: "When should you prefer multiple single-column indexes over a single composite index?",
    shortAnswer: "When queries on the table filter independently on different individual columns in unpredictable, ad-hoc combinations that do not share a common leading column prefix.",
    explanation: "Ad-hoc search filters across unrelated dimensions may benefit from separate indexes.",
    hint: "When queries filter on unpredictable, independent single columns.",
    level: "expert"
  },
  {
    question: "How does creating composite index `(centre_city, course_stream)` accelerate student searches in Barrackpore for Mamata, Susmita, Abhronila, and Debangshu?",
    shortAnswer: "It enables a single sub-millisecond point seek that matches both city and course stream simultaneously in 1 B-Tree traversal.",
    explanation: "Eliminates filtering non-matching streams within the city.",
    hint: "Pinpoints matching city and stream simultaneously in a single B-Tree traversal.",
    level: "basic"
  },
  {
    question: "What is the impact of placing a low-cardinality column (e.g. `gender`) as the SECOND column in `(student_id, gender)`?",
    shortAnswer: "Negligible, because `student_id` is unique and already filters down to 1 row; the second column `gender` is only useful if it enables a covering query.",
    explanation: "Columns after a unique key have no filtering impact.",
    hint: "No filtering impact because student_id already narrows to 1 row.",
    level: "expert"
  },
  {
    question: "What is the senior architect's golden rule for Composite Indexes?",
    shortAnswer: "Consolidate overlapping single-column indexes into targeted composite indexes, strictly order columns as (Equality, Range, Sort, Project), and verify with EXPLAIN.",
    explanation: "Minimizes index count while maximizing query acceleration and write throughput.",
    hint: "Consolidate into targeted composite indexes ordered by (Equality, Range, Sort, Project).",
    level: "expert"
  }
];

export default questions;
