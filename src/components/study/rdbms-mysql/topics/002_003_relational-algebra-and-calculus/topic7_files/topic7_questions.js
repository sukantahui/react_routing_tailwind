// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a Theta Join (⨝_θ) in Relational Algebra?",
    shortAnswer: "A binary operator that combines related tuples from two relations that satisfy a specified comparison condition θ: $$R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)$$.",
    explanation: "Fundamental join operator combining cross product and selection.",
    hint: "R ⨝_θ S = σ_θ(R × S).",
    level: "basic"
  },
  {
    question: "What comparison operators are permitted in a Theta Join predicate θ?",
    shortAnswer: "$$=, \\neq, <, \\le, >, \\ge$$, and compound boolean expressions built with $\\land, \\lor, \\neg$.",
    explanation: "Allowed theta comparison predicates.",
    hint: "=, ≠, <, ≤, >, ≥.",
    level: "basic"
  },
  {
    question: "What is an Equijoin in Relational Algebra?",
    shortAnswer: "A specific type of Theta Join where the comparison operator in the join condition is STRICTLY EQUALITY ($=$).",
    explanation: "Equijoin definition.",
    hint: "Theta join where condition uses only equality (=).",
    level: "basic"
  },
  {
    question: "What is the degree (number of columns) of an Equijoin $R \\bowtie_{R.A = S.B} S$?",
    shortAnswer: "$$\\text{Degree}(R) + \\text{Degree}(S)$$. Both attributes $R.A$ and $S.B$ are preserved in the output schema.",
    explanation: "Equijoin retains both matching columns in its header.",
    hint: "Degree(R) + Degree(S) (both join columns preserved).",
    level: "basic"
  },
  {
    question: "How does an Equijoin differ from a Natural Join (⨝)?",
    shortAnswer: "An Equijoin preserves BOTH join attributes in the output schema (e.g. `Students.student_id` and `Enrollments.student_id`); a Natural Join merges the common attribute and projects away the duplicate column.",
    explanation: "Equijoin vs Natural Join schema difference.",
    hint: "Equijoin keeps both join columns; Natural join keeps only one.",
    level: "basic"
  },
  {
    question: "What is a Non-Equi Join in SQL and Relational Algebra?",
    shortAnswer: "A Theta Join where the condition uses inequality or range operators ($<, \\le, >, \\ge, \\text{BETWEEN}$) instead of strict equality.",
    explanation: "Non-equi join definition.",
    hint: "Theta join with inequality or range comparisons (<, >, BETWEEN).",
    level: "basic"
  },
  {
    question: "How do you express a Non-Equi Join matching students to their Fee Scholarship Tier?",
    shortAnswer: "$$\\text{Students} \\bowtie_{\\text{Students.fee} \\ge \\text{Bands.min\\_fee} \\land \\text{Students.fee} \\le \\text{Bands.max\\_fee}} \\text{Fee\\_Bands}$$.",
    explanation: "Range theta join for grade/fee bands.",
    hint: "Students ⨝_{fee >= min_fee ∧ fee <= max_fee} Fee_Bands.",
    level: "moderate",
    codeExample: "SELECT s.full_name, s.admission_fee, b.tier_name\nFROM students s\nJOIN fee_bands b ON s.admission_fee BETWEEN b.min_fee AND b.max_fee;"
  },
  {
    question: "What is the cardinality range of $R \\bowtie_\\theta S$ if $|R| = m$ and $|S| = n$?",
    shortAnswer: "$$0 \\le |R \\bowtie_\\theta S| \\le m \\times n$$.",
    explanation: "Cardinality bounded between 0 and Cartesian product.",
    hint: "Between 0 and |R| * |S|.",
    level: "basic"
  },
  {
    question: "Is the Theta Join commutative: $R \\bowtie_\\theta S \\equiv S \\bowtie_{\\theta'} R$?",
    shortAnswer: "Yes, up to attribute ordering, where $\\theta'$ is the inverse comparison (e.g. if $\\theta$ is $R.A < S.B$, then $\\theta'$ is $S.B > R.A$).",
    explanation: "Commutativity of theta joins.",
    hint: "Yes, with inverted comparison predicate.",
    level: "moderate"
  },
  {
    question: "What physical join algorithms are used by MySQL to execute Equijoins?",
    shortAnswer: "1) Hash Join (MySQL 8.0+), 2) Index Nested Loop Join (when foreign keys are indexed), and 3) Block Nested Loop Join.",
    explanation: "Physical execution engine join algorithms.",
    hint: "Hash Join, Index Nested Loop Join, Block Nested Loop Join.",
    level: "expert"
  },
  {
    question: "Can a Hash Join algorithm be used for Non-Equi Joins ($<$ or $>$)?",
    shortAnswer: "No! Classical Hash Join algorithms require strict equality ($=$) to compute hash bucket keys; non-equi joins require Nested Loop or B-Tree range scans.",
    explanation: "Hash join limitation to equijoins.",
    hint: "No, hash joins require equality (=) comparisons.",
    level: "expert"
  },
  {
    question: "What ANSI SQL clause represents an Equijoin?",
    shortAnswer: "`INNER JOIN ... ON table1.col = table2.col` (or `JOIN ... ON ...`).",
    explanation: "ANSI standard inner join syntax.",
    hint: "INNER JOIN table2 ON table1.col = table2.col.",
    level: "basic"
  },
  {
    question: "What is a Self-Equijoin?",
    shortAnswer: "An Equijoin of a relation with a renamed instance of itself on a key attribute (e.g. Employee with Manager).",
    explanation: "Self-equijoin definition.",
    hint: "Equijoin of a relation with itself using aliases.",
    level: "basic"
  },
  {
    question: "How do you express an Equijoin between `Courses` and `Departments` on `dept_id` in Relational Algebra?",
    shortAnswer: "$$\\text{Courses} \\bowtie_{\\text{Courses.dept\\_id} = \\text{Departments.dept\\_id}} \\text{Departments}$$.",
    explanation: "Standard equijoin syntax.",
    hint: "Courses ⨝_{Courses.dept_id = Departments.dept_id} Departments.",
    level: "basic",
    codeExample: "SELECT c.course_title, d.dept_name\nFROM courses c\nJOIN departments d ON c.dept_id = d.dept_id;"
  },
  {
    question: "What happens if no tuples satisfy the join condition $\\theta$ in $R \\bowtie_\\theta S$?",
    shortAnswer: "The output relation is the empty set $\\emptyset$ with Cardinality = 0 and Degree = $\\text{Degree}(R) + \\text{Degree}(S)$.",
    explanation: "Empty join result behavior.",
    hint: "Empty relation ∅ with degree n + m.",
    level: "basic"
  },
  {
    question: "How does an Index on the join foreign key column affect Equijoin execution speed?",
    shortAnswer: "It allows MySQL to perform an Index Nested Loop Join in $O(|R| \\cdot \\log |S|)$ instead of an unindexed full scan of $O(|R| \\cdot |S|)$.",
    explanation: "Index acceleration for equijoins.",
    hint: "Reduces search time from O(|R| * |S|) to O(|R| * log |S|).",
    level: "moderate"
  },
  {
    question: "Can a Theta Join condition contain multiple conjuncts: $\\theta = (A_1 = B_1 \\land A_2 > B_2)$?",
    shortAnswer: "Yes! A Theta Join condition can be any arbitrary boolean expression combining equalities and inequalities.",
    explanation: "Composite theta predicates.",
    hint: "Yes, any arbitrary boolean combination of predicates.",
    level: "basic"
  },
  {
    question: "How do you find all overlapping room reservations in a hotel database using a Non-Equi Join?",
    shortAnswer: "`SELECT r1.room_id, r1.res_id, r2.res_id FROM reservations r1 JOIN reservations r2 ON r1.room_id = r2.room_id AND r1.res_id < r2.res_id AND r1.start_date < r2.end_date AND r1.end_date > r2.start_date;`.",
    explanation: "Classic temporal interval overlap non-equi join.",
    hint: "JOIN on room_id with interval overlap comparisons.",
    level: "expert"
  },
  {
    question: "What is the Selectivity Factor of a Theta Join?",
    shortAnswer: "The fraction of the Cartesian product tuples that satisfy condition $\\theta$: $$s_\\theta = \\frac{|R \\bowtie_\\theta S|}{|R| \\times |S|} \\in [0, 1]$$.",
    explanation: "Join selectivity estimation in query optimizers.",
    hint: "|R ⨝_θ S| / (|R| * |S|).",
    level: "expert"
  },
  {
    question: "How does the optimizer reorder multiple Equijoins: $(R \\bowtie S) \\bowtie T$?",
    shortAnswer: "Because Equijoin is Associative and Commutative, the optimizer evaluates all $n!$ permutation trees to pick the join order with the smallest intermediate row counts.",
    explanation: "Join ordering in cost-based query optimization.",
    hint: "Reorders joins to minimize intermediate cardinality.",
    level: "expert"
  },
  {
    question: "Can an Equijoin produce duplicate rows if the input relations have duplicate keys?",
    shortAnswer: "Yes. Every matching pair of tuples is multiplied, resulting in $k_1 \\times k_2$ output tuples for matching key instances.",
    explanation: "Cartesian multiplication on duplicate join keys.",
    hint: "Yes, matching duplicate keys multiply.",
    level: "basic"
  },
  {
    question: "How do you express an Equijoin between `Doctors` and `Appointments` in Relational Algebra?",
    shortAnswer: "$$\\text{Doctors} \\bowtie_{\\text{Doctors.doctor\\_id} = \\text{Appointments.doctor\\_id}} \\text{Appointments}$$.",
    explanation: "1:N Equijoin in relational algebra.",
    hint: "Doctors ⨝_{Doctors.doctor_id = Appointments.doctor_id} Appointments.",
    level: "basic"
  },
  {
    question: "Why does `SELECT * FROM R, S WHERE R.id = S.id` execute as an Equijoin in MySQL?",
    shortAnswer: "Because MySQL's query rewriter recognizes legacy comma syntax with a WHERE equality clause and rewrites it internally as an ANSI `INNER JOIN`.",
    explanation: "Query rewriting optimization in MySQL.",
    hint: "MySQL rewriter converts comma-WHERE syntax to an INNER JOIN.",
    level: "basic"
  },
  {
    question: "What is the difference between an Equijoin and a Cross Join with a WHERE clause in relational algebra?",
    shortAnswer: "Theoretically they are identical ($R \\bowtie_\\theta S \\equiv \\sigma_\\theta(R \\times S)$); practically, database engines optimize Equijoins to skip Cartesian product materialization.",
    explanation: "Theoretical equivalence vs physical optimization.",
    hint: "Theoretically identical; practically optimized to avoid cross product.",
    level: "moderate"
  },
  {
    question: "What is a Multi-Table Equijoin in SQL?",
    shortAnswer: "A query that chains multiple `INNER JOIN` clauses across three or more tables (e.g. `Students ➔ Enrollments ➔ Courses`).",
    explanation: "Multi-table join chaining.",
    hint: "Chaining multiple INNER JOINs across 3+ tables.",
    level: "basic"
  },
  {
    question: "How do you prevent ambiguous column name errors in SQL Equijoins?",
    shortAnswer: "By qualifying column references with table names or aliases (e.g. `students.student_id` or `s.student_id`).",
    explanation: "Table prefix qualification.",
    hint: "Qualify columns with table names or aliases.",
    level: "basic"
  },
  {
    question: "What is the arity of $\\text{Degree}(\\text{Students}(3) \\bowtie_{\\theta} \\text{Enrollments}(4))$?",
    shortAnswer: "$$3 + 4 = 7$$ attributes.",
    explanation: "Arity addition in Theta Join.",
    hint: "3 + 4 = 7.",
    level: "basic"
  },
  {
    question: "When is an Equijoin equivalent to a 1:1 match?",
    shortAnswer: "When the join condition matches on the PRIMARY KEY of BOTH relations.",
    explanation: "1:1 PK-to-PK join.",
    hint: "When joining on primary keys of both tables.",
    level: "moderate"
  },
  {
    question: "When is an Equijoin a 1:N match?",
    shortAnswer: "When the join condition matches on the PRIMARY KEY of relation 1 and the FOREIGN KEY of relation 2.",
    explanation: "1:N PK-to-FK join.",
    hint: "When joining on Primary Key of table 1 and Foreign Key of table 2.",
    level: "basic"
  },
  {
    question: "What is the master checklist for mastering Theta Joins and Equijoins?",
    shortAnswer: "1) Define Theta Join as $\\sigma_\\theta(R \\times S)$. 2) Understand that Equijoin is Theta Join with $=$ predicate. 3) Note that Equijoin keeps both join columns (Degree = $n + m$). 4) Index foreign keys to enable Index Nested Loop Joins. 5) Use Non-Equi joins for fee bands, grade ranges, and interval overlaps.",
    explanation: "Following these 5 rules establishes deep relational join mastery.",
    hint: "Definition as σ_θ(R × S), Equijoin equality, Degree n+m, Index foreign keys, Non-equi for ranges.",
    level: "basic"
  }
];

export default questions;
