// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is 'Type Compatibility' (or 'Union Compatibility') in Relational Algebra?",
    shortAnswer: "The mathematical rule requiring two relations to have identical degree (number of attributes) and pairwise compatible domains for corresponding positional attributes.",
    explanation: "Fundamental prerequisite for relational set operations.",
    hint: "Identical degree and pairwise compatible attribute domains.",
    level: "basic"
  },
  {
    question: "What are the TWO strict rules of Union Compatibility?",
    shortAnswer: "1) Same Degree: $\\text{Degree}(R) = \\text{Degree}(S)$. 2) Compatible Domains: $\\text{dom}(A_i) \\cong \\text{dom}(B_i)$ for all $i \\in \\{1, \\dots, n\\}$.",
    explanation: "The two mathematical axioms of union compatibility.",
    hint: "Rule 1: Same column count; Rule 2: Matching column domain types in order.",
    level: "basic"
  },
  {
    question: "Do attribute NAMES need to be identical for two relations to be Union-Compatible?",
    shortAnswer: "No! Attribute names can be completely different (e.g. `student_name` vs `faculty_name`); only their data type domains and positional order must be compatible.",
    explanation: "Positional domain matching rather than name matching.",
    hint: "No, only data types and positional order matter.",
    level: "basic"
  },
  {
    question: "What column names does the output relation inherit when executing a `UNION` in SQL?",
    shortAnswer: "The output relation inherits the column names and aliases from the FIRST `SELECT` statement in the union block.",
    explanation: "SQL standard header resolution rule.",
    hint: "Inherits column names from the first SELECT statement.",
    level: "basic"
  },
  {
    question: "What MySQL error occurs when attempting to union two `SELECT` statements with different column counts?",
    shortAnswer: "`ERROR 1222 (21000): The used SELECT statements have a different number of columns.`",
    explanation: "Degree mismatch error in MySQL.",
    hint: "Error 1222: Different number of columns.",
    level: "basic"
  },
  {
    question: "What happens if two relations have compatible types, but their columns appear in REVERSED order (e.g. `(INT, VARCHAR)` vs `(VARCHAR, INT)`)?",
    shortAnswer: "The union operation violates domain compatibility and fails with a data type conversion error or produces corrupt, scrambled data.",
    explanation: "Positional domain alignment failure.",
    hint: "Violates positional domain compatibility and throws a type error.",
    level: "basic"
  },
  {
    question: "How can a developer resolve a degree mismatch when unioning a 3-column table with a 2-column table in SQL?",
    shortAnswer: "By projecting a literal placeholder or `NULL` for the missing column in the second query: `SELECT id, name, fee FROM R UNION SELECT id, name, NULL AS fee FROM S;`.",
    explanation: "Projection alignment pattern for mismatched degrees.",
    hint: "Project a literal constant or NULL for the missing column.",
    level: "moderate",
    codeExample: "SELECT student_id, full_name, admission_fee FROM students\nUNION\nSELECT faculty_id, full_name, 0.00 AS admission_fee FROM faculty;"
  },
  {
    question: "How does MySQL resolve differing numeric data types (e.g. `INT` vs `DECIMAL(10, 2)`) during a `UNION`?",
    shortAnswer: "MySQL automatically promotes the output column data type to the more general/precise type (in this case, `DECIMAL(10, 2)`).",
    explanation: "Automatic numeric type promotion in SQL engines.",
    hint: "Promotes to the higher precision type (DECIMAL).",
    level: "moderate"
  },
  {
    question: "How does MySQL resolve differing string lengths (e.g. `VARCHAR(20)` vs `VARCHAR(100)`) in a `UNION`?",
    shortAnswer: "The output column type is promoted to the widest length (`VARCHAR(100)`).",
    explanation: "String length promotion.",
    hint: "Promotes to the maximum column length.",
    level: "basic"
  },
  {
    question: "What is a Collation Mismatch in SQL union operations?",
    shortAnswer: "An error (e.g. Error 1267: Illegal mix of collations) that occurs when unioning string columns with incompatible character sets or collations (e.g. `utf8mb4_unicode_ci` vs `latin1_swedish_ci`).",
    explanation: "Character set collation incompatibility.",
    hint: "Incompatible character sets or collations between string columns.",
    level: "expert"
  },
  {
    question: "How do you explicitly resolve a collation mismatch between two unioned string columns in MySQL?",
    shortAnswer: "Using the `COLLATE` clause: `SELECT name COLLATE utf8mb4_unicode_ci FROM R UNION SELECT name COLLATE utf8mb4_unicode_ci FROM S;`.",
    explanation: "Explicit collation coercion in SQL.",
    hint: "Use the COLLATE clause on both queries.",
    level: "expert"
  },
  {
    question: "Are `DATE` and `DATETIME` columns union-compatible in MySQL?",
    shortAnswer: "Yes, MySQL promotes the unified column to `DATETIME`, appending `'00:00:00'` to pure `DATE` values.",
    explanation: "Temporal type promotion.",
    hint: "Yes, promoted to DATETIME.",
    level: "moderate"
  },
  {
    question: "Can an `INT` column and a `VARCHAR` column be unioned in MySQL?",
    shortAnswer: "Yes, MySQL will coerce the integer values to strings (`VARCHAR`), but this may disable index optimizations and should be avoided in strict production design.",
    explanation: "Implicit type coercion to string.",
    hint: "Coerced to VARCHAR, but not recommended.",
    level: "moderate"
  },
  {
    question: "Why does pure Relational Algebra prohibit implicit type coercion between incompatible domains like `INT` and `VARCHAR`?",
    shortAnswer: "Because in formal relational mathematics, an attribute domain is a strictly defined mathematical set; cross-domain mixing violates First Normal Form domain atomicity.",
    explanation: "Mathematical purity vs commercial engine leniency.",
    hint: "Cross-domain mixing violates mathematical domain atomicity in 1NF.",
    level: "expert"
  },
  {
    question: "Which relational algebra operations REQUIRE Union Compatibility?",
    shortAnswer: "1) Set Union (∪), 2) Set Intersection (∩), and 3) Set Difference (−).",
    explanation: "Set operations requiring compatible headers.",
    hint: "Union, Intersection, and Difference.",
    level: "basic"
  },
  {
    question: "Do Join operations (⨝) or Cartesian Products (×) require Union Compatibility?",
    shortAnswer: "NO! Cartesian Products and Joins combine relations with completely different schemas and domains into a composite relation of degree $n + m$.",
    explanation: "Multiplicative operators do not require union compatibility.",
    hint: "No, Joins and Cross Products combine different schemas.",
    level: "basic"
  },
  {
    question: "How do you enforce type compatibility when combining `Students` and `Alumni` where `Alumni` has an extra `graduation_year` column?",
    shortAnswer: "Align the projection lists by excluding `graduation_year` or adding a placeholder: `π_{id, name, city}(Students) ∪ π_{id, name, city}(Alumni)`.",
    explanation: "Projection filtering for schema alignment.",
    hint: "Project matching subsets of attributes before union.",
    level: "basic"
  },
  {
    question: "What is the degree of the relation produced by $\\text{Degree}(R(A, B, C) \\cup S(D, E, F))$?",
    shortAnswer: "Exactly 3 (Degree is strictly preserved).",
    explanation: "Degree preservation in union-compatible set operations.",
    hint: "Degree = 3.",
    level: "basic"
  },
  {
    question: "What is the degree of the relation produced by $\\text{Degree}(R(A, B, C) \\cap S(D, E, F))$?",
    shortAnswer: "Exactly 3.",
    explanation: "Degree preservation in intersection.",
    hint: "Degree = 3.",
    level: "basic"
  },
  {
    question: "What is the degree of the relation produced by $\\text{Degree}(R(A, B, C) - S(D, E, F))$?",
    shortAnswer: "Exactly 3.",
    explanation: "Degree preservation in set difference.",
    hint: "Degree = 3.",
    level: "basic"
  },
  {
    question: "Can two relations with differing column counts be made union-compatible using the Projection operator (π)?",
    shortAnswer: "Yes, by projecting matching $k$-attribute subsets from both relations prior to evaluating the set operation.",
    explanation: "Projection as a pre-processing step for set operations.",
    hint: "Yes, by projecting matching column subsets from both.",
    level: "basic"
  },
  {
    question: "How does the Rename operator (ρ) assist when union compatibility requires specific attribute headers?",
    shortAnswer: "It explicitly sets the output attribute names: $\\rho_{\\text{Combined}(id, name, city)}(\\pi_{s\\_id, s\\_name, s\\_city}(\\text{Students})) \\cup \\dots$.",
    explanation: "Explicit attribute renaming for unified output headers.",
    hint: "Renames attributes to create clean unified output headers.",
    level: "moderate"
  },
  {
    question: "Why should developers avoid relying on implicit MySQL data type coercion in `UNION` queries?",
    shortAnswer: "Because implicit conversions cause subtle data truncation, unexpected collation errors, sorting abnormalities, and prevent index range scans.",
    explanation: "Best practice against implicit type coercion.",
    hint: "Causes data truncation, collation bugs, and disables index scans.",
    level: "moderate"
  },
  {
    question: "What happens if you union a signed integer `INT` with an unsigned integer `INT UNSIGNED` in MySQL?",
    shortAnswer: "MySQL promotes the resulting column to `DECIMAL` or `BIGINT` to accommodate the full range of both signed and unsigned values without overflow.",
    explanation: "Signed vs unsigned type promotion.",
    hint: "Promoted to BIGINT or DECIMAL to prevent overflow.",
    level: "expert"
  },
  {
    question: "How does SQL `ORDER BY` interact with a `UNION` query?",
    shortAnswer: "The `ORDER BY` clause must appear at the VERY END of the entire union block, referencing column names or aliases defined in the FIRST `SELECT` statement.",
    explanation: "Global ordering rule for unioned queries in SQL.",
    hint: "Placed at the very end referencing columns from the first SELECT.",
    level: "moderate",
    codeExample: "SELECT student_id, full_name FROM students\nUNION\nSELECT faculty_id, instructor_name FROM faculty\nORDER BY full_name ASC;"
  },
  {
    question: "Can individual `SELECT` queries inside a `UNION` have their own `ORDER BY` clauses without `LIMIT` in MySQL?",
    shortAnswer: "No, MySQL optimizer ignores sub-query `ORDER BY` clauses in a `UNION` unless paired with a `LIMIT` clause.",
    explanation: "MySQL optimizer behavior for union sub-query sorting.",
    hint: "Ignored by optimizer unless paired with LIMIT.",
    level: "expert"
  },
  {
    question: "What is Domain Compatibility in terms of Semantic Meaning versus Physical Data Type?",
    shortAnswer: "Physical compatibility means data types match (e.g. both are `INT`); Semantic compatibility means the data represents the same business concept (e.g. unioning `pincode` with `student_id` is physically possible but semantically nonsensical!).",
    explanation: "Syntactic vs semantic domain compatibility.",
    hint: "Physical types match vs business concept meaning matches.",
    level: "expert"
  },
  {
    question: "How do you cast a column to ensure strict type compatibility in MySQL?",
    shortAnswer: "Using the `CAST(column AS data_type)` or `CONVERT(column, data_type)` functions.",
    explanation: "Explicit type casting syntax in MySQL.",
    hint: "CAST(col AS type) or CONVERT(col, type).",
    level: "basic"
  },
  {
    question: "In Codd's Relational Model, why is the concept of a 'Domain' equivalent to a Data Type in programming languages?",
    shortAnswer: "Because a Domain defines the set of all atomic allowable values, their physical representation, and the valid operators permitted on those values.",
    explanation: "Theoretical equivalence of domains and types.",
    hint: "Defines the allowable set of atomic values and valid operations.",
    level: "basic"
  },
  {
    question: "What is the master checklist for verifying Type / Union Compatibility?",
    shortAnswer: "1) Verify identical column count: $\\text{Degree}(R) = \\text{Degree}(S)$. 2) Verify identical positional domain types. 3) Verify semantic concept alignment. 4) Use explicit casting and placeholder columns (`NULL AS col`) for mismatched schemas. 5) Place global `ORDER BY` at the very end referencing the first SELECT's headers.",
    explanation: "Following these 5 rules guarantees robust, error-free union-compatible query composition.",
    hint: "Identical column count, Positional domain matching, Semantic alignment, Explicit casting, Final ORDER BY.",
    level: "basic"
  }
];

export default questions;
