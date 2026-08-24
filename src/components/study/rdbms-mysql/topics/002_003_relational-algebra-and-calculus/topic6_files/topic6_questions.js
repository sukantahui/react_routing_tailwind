// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the Cartesian Product (Cross Product, ×) in Relational Algebra?",
    shortAnswer: "A binary relational algebra operator that combines every tuple of relation $R$ with every tuple of relation $S$, producing all possible pairwise tuple concatenations.",
    explanation: "Core multiplicative binary operator in relational algebra.",
    hint: "Binary operator producing all pairwise tuple combinations.",
    level: "basic"
  },
  {
    question: "What is the degree (number of attributes) of $R \\times S$ if $\\text{Degree}(R) = n$ and $\\text{Degree}(S) = m$?",
    shortAnswer: "$$\\text{Degree}(R \\times S) = n + m$$ (the sum of the attribute counts of both relations).",
    explanation: "Degree addition property of Cartesian Product.",
    hint: "n + m (sum of attribute counts).",
    level: "basic"
  },
  {
    question: "What is the cardinality (number of tuples) of $R \\times S$ if $|R| = p$ and $|S| = q$?",
    shortAnswer: "$$\\text{Cardinality}(R \\times S) = p \\times q = p \\cdot q$$ (the product of tuple counts).",
    explanation: "Cardinality multiplication property.",
    hint: "p * q (product of row counts).",
    level: "basic"
  },
  {
    question: "What ANSI SQL clause corresponds directly to the Cartesian Product operator (×)?",
    shortAnswer: "`CROSS JOIN` (e.g. `SELECT * FROM table1 CROSS JOIN table2;`).",
    explanation: "ANSI standard SQL syntax for Cartesian product.",
    hint: "CROSS JOIN in SQL.",
    level: "basic"
  },
  {
    question: "What happens when an SQL query specifies `FROM students, courses` without a `WHERE` or `JOIN` condition?",
    shortAnswer: "It executes an unrestricted Cartesian Product (`CROSS JOIN`), multiplying every student row by every course row.",
    explanation: "Legacy comma-join degeneration into Cartesian product.",
    hint: "Executes an unrestricted Cartesian product multiplying all rows.",
    level: "basic"
  },
  {
    question: "Is the Cartesian Product commutative ($R \\times S \\equiv S \\times R$)?",
    shortAnswer: "Yes, up to attribute ordering: both produce the exact same paired data values, though the column order is reversed.",
    explanation: "Commutative isomorphism in relational algebra.",
    hint: "Yes, produces identical paired combinations.",
    level: "moderate"
  },
  {
    question: "Is the Cartesian Product associative: $(R \\times S) \\times T \\equiv R \\times (S \\times T)$?",
    shortAnswer: "Yes. Grouping order of Cartesian products does not alter the resulting tuple combinations.",
    explanation: "Associative law for Cartesian products.",
    hint: "Yes, Cartesian product is associative.",
    level: "basic"
  },
  {
    question: "What is the result of $R \\times \\emptyset$ (Cartesian product with the empty relation)?",
    shortAnswer: "$$\\emptyset$$ (the empty relation, with Cardinality = 0).",
    explanation: "Annihilator property of empty relation under Cartesian multiplication.",
    hint: "Empty relation ∅.",
    level: "basic"
  },
  {
    question: "How is the Theta Join (⨝_θ) operator derived from the Cartesian Product in relational theory?",
    shortAnswer: "$$R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)$$ (a Cartesian product followed by a Selection condition).",
    explanation: "Definition of theta join as selection over cross product.",
    hint: "σ_θ(R × S).",
    level: "basic"
  },
  {
    question: "If relation `Students` has 1,000 rows and relation `Batches` has 20 rows, how many rows will `Students × Batches` produce?",
    shortAnswer: "$$1,000 \\times 20 = 20,000$$ rows.",
    explanation: "Cardinality multiplication calculation.",
    hint: "1,000 * 20 = 20,000 rows.",
    level: "basic"
  },
  {
    question: "If relation `Customers` has 100,000 rows and relation `Orders` has 500,000 rows, what is the disastrous consequence of an accidental `CROSS JOIN`?",
    shortAnswer: "It generates $$100,000 \\times 500,000 = 50,000,000,000$$ (50 Billion) rows, consuming terabytes of memory/disk temp space and crashing the database engine.",
    explanation: "Accidental Cartesian explosion catastrophe in production.",
    hint: "Generates 50 Billion rows, crashing the database engine.",
    level: "moderate"
  },
  {
    question: "How do you generate all combinations of product sizes (S, M, L, XL) and product colors (Red, Blue, Green) in SQL?",
    shortAnswer: "`SELECT s.size_code, c.color_name FROM shirt_sizes s CROSS JOIN shirt_colors c;`.",
    explanation: "Legitimate enterprise use case for CROSS JOIN.",
    hint: "SELECT size, color FROM sizes CROSS JOIN colors.",
    level: "basic",
    codeExample: "SELECT s.size_code, c.color_name\nFROM shirt_sizes s\nCROSS JOIN shirt_colors c;"
  },
  {
    question: "Does the Cartesian Product operator (×) require Type Compatibility (Union Compatibility)?",
    shortAnswer: "NO! Cartesian product combines relations with completely different schemas, attribute names, and data types.",
    explanation: "Multiplicative operators do not require type compatibility.",
    hint: "No, relations can have completely different schemas.",
    level: "basic"
  },
  {
    question: "How does the Rename operator (ρ) assist when performing a Cartesian Product of a relation with itself: $R \\times R$?",
    shortAnswer: "It creates distinct relation prefixes (e.g. $\\rho_{R_1}(R) \\times \\rho_{R_2}(R)$) to prevent duplicate attribute column name collisions ($R_1.\\text{id}$ and $R_2.\\text{id}$).",
    explanation: "Attribute qualification and disambiguation.",
    hint: "Creates distinct table aliases to prevent column name collisions.",
    level: "basic"
  },
  {
    question: "How does an RDBMS query optimizer avoid evaluating full Cartesian products during join execution?",
    shortAnswer: "By pushing selection predicates into the join operator to perform physical Hash Joins, Merge Joins, or Indexed Nested Loop Joins directly without materializing the cross product.",
    explanation: "Physical join optimization bypassing Cartesian materialization.",
    hint: "Converts cross products into Hash Joins or Index Nested Loop Joins.",
    level: "expert"
  },
  {
    question: "Can Selection be distributed over Cartesian Product: $\\sigma_{p}(R \\times S)$?",
    shortAnswer: "Yes! If predicate $p$ consists of $p_R \\land p_S$ where $p_R$ references only $R$ and $p_S$ references only $S$, then: $$\\sigma_p(R \\times S) \\equiv \\sigma_{p_R}(R) \\times \\sigma_{p_S}(S)$$.",
    explanation: "Distributive equivalence rule of selection over cross product.",
    hint: "σ_{p_R ∧ p_S}(R × S) ≡ σ_{p_R}(R) × σ_{p_S}(S).",
    level: "expert"
  },
  {
    question: "Can Projection be distributed over Cartesian Product: $\\pi_{L}(R \\times S)$?",
    shortAnswer: "Yes! If $L_R$ are the attributes in $L$ from $R$, and $L_S$ are the attributes in $L$ from $S$, then: $$\\pi_L(R \\times S) \\equiv \\pi_{L_R}(R) \\times \\pi_{L_S}(S)$$.",
    explanation: "Distributive equivalence rule of projection over cross product.",
    hint: "π_L(R × S) ≡ π_{L_R}(R) × π_{L_S}(S).",
    level: "expert"
  },
  {
    question: "How is a Calendar Date Dimension table populated using `CROSS JOIN` in data warehousing?",
    shortAnswer: "By cross joining single-digit digit tables ($0..9$) to generate numbers $1..365$, and computing calendar dates from a base year.",
    explanation: "Tally table Cartesian expansion technique.",
    hint: "Cross joins digit tables to generate continuous integer sequences.",
    level: "moderate"
  },
  {
    question: "What is the difference between `CROSS JOIN` and `INNER JOIN ON 1=1` in MySQL?",
    shortAnswer: "Semantically and functionally they are 100% IDENTICAL in MySQL; both generate an unrestricted Cartesian product.",
    explanation: "Syntactic equivalence in MySQL query parser.",
    hint: "They are 100% identical in MySQL.",
    level: "basic"
  },
  {
    question: "What is an Exam Invigilation Schedule Matrix in university databases?",
    shortAnswer: "A Cartesian product of available faculty members and exam time slots ($\\text{Faculty} \\times \\text{Exam\\_Slots}$), creating all possible proctor assignment combinations.",
    explanation: "Real-world matrix generation pattern.",
    hint: "Faculty × Exam_Slots creating all possible proctor slots.",
    level: "basic"
  },
  {
    question: "What is the arity of the Cartesian product of three relations: $\\text{Degree}(R_1 \\times R_2 \\times R_3)$?",
    shortAnswer: "$$\\text{Degree}(R_1) + \\text{Degree}(R_2) + \\text{Degree}(R_3)$$.",
    explanation: "Generalized arity addition for n-ary Cartesian products.",
    hint: "Sum of degrees of all 3 relations.",
    level: "basic"
  },
  {
    question: "What is the cardinality of the Cartesian product of three relations: $|R_1 \\times R_2 \\times R_3|$?",
    shortAnswer: "$$|R_1| \\times |R_2| \\times |R_3|$$.",
    explanation: "Generalized cardinality multiplication.",
    hint: "Product of cardinalities of all 3 relations.",
    level: "basic"
  },
  {
    question: "Why should developers explicitly write `CROSS JOIN` instead of the legacy comma `,` join syntax in SQL?",
    shortAnswer: "Because explicit `CROSS JOIN` clearly signals deliberate intent, avoids accidental omissions of `ON` conditions, and prevents comma precedence parsing bugs.",
    explanation: "Clean SQL code maintainability standard.",
    hint: "Signals deliberate intent and prevents accidental missing join conditions.",
    level: "basic"
  },
  {
    question: "What is the relationship between the Relational Division operator (÷) and Cartesian Product (×)?",
    shortAnswer: "Division is the mathematical INVERSE of Cartesian Product: if $Q = (R \times S) \div S$, then $Q = R$.",
    explanation: "Inverse algebraic relationship.",
    hint: "Division is the algebraic inverse of Cartesian product.",
    level: "expert"
  },
  {
    question: "Can a `CROSS JOIN` produce NULL values if the input relations contain no NULLs?",
    shortAnswer: "No. Cartesian product concatenates existing tuples; it never injects NULL values unless an input tuple already contained a NULL.",
    explanation: "Tuple concatenation preserves existing values without NULL injection.",
    hint: "No, never injects NULL values.",
    level: "basic"
  },
  {
    question: "What happens if one of the relations in a Cartesian product contains exactly ONE tuple: $|R| = 1$?",
    shortAnswer: "The output cardinality is $|1 \\times S| = |S|$ (every tuple of $S$ is simply appended with the single tuple of $R$).",
    explanation: "Scalar tuple broadcasting in Cartesian multiplication.",
    hint: "Cardinality equals |S| (appends the single row of R to all rows of S).",
    level: "moderate"
  },
  {
    question: "How do you find all pairs of doctors and hospital branches to check assigned coverage?",
    shortAnswer: "$$\\text{Doctors} \\times \\text{Branches}$$.",
    explanation: "All-to-all cross product coverage check.",
    hint: "Doctors × Branches.",
    level: "basic"
  },
  {
    question: "Why does the Cartesian Product operator preserve all columns from both relations?",
    shortAnswer: "Because it is a relational multiplication operator whose mathematical goal is full tuple concatenation; filtering columns is the job of the Projection operator (π).",
    explanation: "Separation of algebraic responsibilities.",
    hint: "Concatenates all attributes; projection handles column filtering.",
    level: "basic"
  },
  {
    question: "How do you generate a 7-day schedule grid for 3 classroom halls in MySQL?",
    shortAnswer: "`SELECT h.hall_name, d.day_name FROM halls h CROSS JOIN week_days d;` (produces $3 \\times 7 = 21$ schedule slots).",
    explanation: "Schedule matrix generation.",
    hint: "halls CROSS JOIN week_days.",
    level: "basic",
    codeExample: "SELECT h.hall_name, d.day_name\nFROM exam_halls h\nCROSS JOIN week_days d;"
  },
  {
    question: "What is the recommended checklist for mastering the Cartesian Product Operator (×)?",
    shortAnswer: "1) Remember: $\\text{Degree} = n + m$ and $\\text{Cardinality} = |R| \\cdot |S|$. 2) Understand that Joins are derived as $\\sigma_\\theta(R \\times S)$. 3) Always use explicit `CROSS JOIN` syntax. 4) Beware of accidental missing `ON` conditions in production. 5) Use intentionally for schedules, matrices, and SKU generation.",
    explanation: "Following these 5 rules ensures safe and powerful usage of relational multiplication.",
    hint: "Degree addition, Cardinality multiplication, Theta join derivation, Explicit CROSS JOIN syntax, Matrix generation.",
    level: "basic"
  }
];

export default questions;
