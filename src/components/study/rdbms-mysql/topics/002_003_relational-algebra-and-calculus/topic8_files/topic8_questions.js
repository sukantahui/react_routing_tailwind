// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the Natural Join (⨝) in Relational Algebra?",
    shortAnswer: "A binary operator that implicitly performs an Equijoin on all attributes sharing the SAME NAME across two relations, projecting away duplicate matching columns.",
    explanation: "Core schema-merging join operator in relational algebra.",
    hint: "Implicit equijoin on common attribute names with duplicate column removal.",
    level: "basic"
  },
  {
    question: "What is the mathematical 3-step definition of Natural Join ($R \\bowtie S$)?",
    shortAnswer: "1) Cross Product $R \\times S$, 2) Selection on equality of all common attributes: $\\sigma_{R.C_1 = S.C_1 \\land \\dots \\land R.C_k = S.C_k}$, 3) Projection to eliminate duplicate common columns: $\\pi_{\\text{Attrs}(R) \\cup \\text{Attrs}(S)}$.",
    explanation: "Formal derivation of natural join from primitive operators.",
    hint: "Cross product -> Selection on common columns -> Projection eliminating duplicates.",
    level: "basic"
  },
  {
    question: "What is the degree (arity) of $R \\bowtie S$ if $\\text{Degree}(R) = n$, $\\text{Degree}(S) = m$, and they share $k$ common attributes?",
    shortAnswer: "$$\\text{Degree}(R \\bowtie S) = n + m - k$$.",
    explanation: "Degree formula subtracting duplicate common attributes.",
    hint: "n + m - k.",
    level: "basic"
  },
  {
    question: "What happens if relations $R$ and $S$ have ZERO common attributes: $\\text{Attrs}(R) \\cap \\text{Attrs}(S) = \\emptyset$?",
    shortAnswer: "The Natural Join degenerates into an unrestricted Cartesian Product: $$R \\bowtie S \\equiv R \\times S$$.",
    explanation: "Boundary condition for natural join with disjoint headers.",
    hint: "Degenerates into Cartesian Product (R × S).",
    level: "basic"
  },
  {
    question: "What happens if relations $R$ and $S$ have IDENTICAL schemas: $\\text{Attrs}(R) = \\text{Attrs}(S)$?",
    shortAnswer: "The Natural Join degenerates into Set Intersection: $$R \\bowtie S \\equiv R \\cap S$$.",
    explanation: "Boundary condition for natural join with identical headers.",
    hint: "Degenerates into Set Intersection (R ∩ S).",
    level: "moderate"
  },
  {
    question: "How does Natural Join differ from Equijoin regarding output schema columns?",
    shortAnswer: "Natural Join contains only ONE instance of the common matching attribute(s); Equijoin contains BOTH matching columns (e.g. `R.id` and `S.id`).",
    explanation: "Key schema difference between natural join and equijoin.",
    hint: "Natural join merges matching columns into one; Equijoin keeps both.",
    level: "basic"
  },
  {
    question: "What ANSI SQL clause represents an explicit Natural Join?",
    shortAnswer: "`SELECT * FROM table1 NATURAL JOIN table2;`.",
    explanation: "ANSI standard NATURAL JOIN keyword.",
    hint: "NATURAL JOIN in SQL.",
    level: "basic"
  },
  {
    question: "What is the `JOIN ... USING (attribute_list)` clause in SQL, and why is it preferred over `NATURAL JOIN` in production?",
    shortAnswer: "`JOIN ... USING (col)` explicitly specifies which common columns to match on, preventing accidental joins on unintended common columns (like `created_at` or `status`).",
    explanation: "Safer explicit alternative to natural join.",
    hint: "Explicitly specifies matching columns, preventing accidental multi-column joins.",
    level: "moderate",
    codeExample: "SELECT * FROM students\nJOIN enrollments USING (student_id);"
  },
  {
    question: "What is the 'Accidental Common Column Problem' in Natural Joins?",
    shortAnswer: "If both tables share unintended common column names (such as `status`, `created_at`, or `notes`), Natural Join attempts to match on ALL of them, inadvertently filtering out valid rows and returning empty results.",
    explanation: "Classic production pitfall of uncontrolled natural joins.",
    hint: "Unintended common columns (like status) cause accidental equality filters.",
    level: "moderate"
  },
  {
    question: "Is the Natural Join commutative ($R \\bowtie S \\equiv S \\bowtie R$)?",
    shortAnswer: "Yes. In pure Relational Algebra, relations are sets of named attributes, making $R \\bowtie S \\equiv S \\bowtie R$.",
    explanation: "Commutative law of natural join.",
    hint: "Yes, natural join is commutative.",
    level: "basic"
  },
  {
    question: "Is the Natural Join associative: $(R \\bowtie S) \\bowtie T \\equiv R \\bowtie (S \\bowtie T)$?",
    shortAnswer: "Yes. Multiple natural joins can be grouped in any order without changing the final result set.",
    explanation: "Associative law of natural join.",
    hint: "Yes, natural join is associative.",
    level: "basic"
  },
  {
    question: "If relation $R(A, B)$ has 5 rows and relation $S(B, C)$ has 4 rows, what is the maximum cardinality of $R \\bowtie S$?",
    shortAnswer: "$$5 \\times 4 = 20$$ rows (if all rows in both relations share the exact same value for attribute $B$).",
    explanation: "Maximum cardinality bound.",
    hint: "|R| * |S| = 20.",
    level: "basic"
  },
  {
    question: "If relation $R(A, B)$ has $B$ as its PRIMARY KEY, what is the maximum cardinality of $R(A, B) \\bowtie S(B, C)$?",
    shortAnswer: "$$|S|$$ (at most 1 row in $R$ matches each foreign key in $S$).",
    explanation: "1:N Primary-Foreign key cardinality bound.",
    hint: "At most |S| rows.",
    level: "moderate"
  },
  {
    question: "If relation $R(A, B)$ and relation $S(B, C)$ both have $B$ as their PRIMARY KEY, what is the maximum cardinality of $R \\bowtie S$?",
    shortAnswer: "$$\\min(|R|, |S|)$$ (a 1:1 join).",
    explanation: "1:1 Primary-to-Primary key cardinality bound.",
    hint: "min(|R|, |S|).",
    level: "moderate"
  },
  {
    question: "How do you express a 3-table Natural Join in Relational Algebra connecting `Students`, `Enrollments`, and `Courses`?",
    shortAnswer: "$$\\text{Students} \\bowtie \\text{Enrollments} \\bowtie \\text{Courses}$$.",
    explanation: "Chained natural join expression.",
    hint: "Students ⨝ Enrollments ⨝ Courses.",
    level: "basic",
    codeExample: "SELECT * FROM students\nNATURAL JOIN enrollments\nNATURAL JOIN courses;"
  },
  {
    question: "How does the output column order of `SELECT * FROM R NATURAL JOIN S` differ from `SELECT * FROM R INNER JOIN S ON ...` in MySQL?",
    shortAnswer: "In `NATURAL JOIN`, the common matching column(s) appear FIRST in the output column list, followed by the remaining non-common columns of $R$ and $S$.",
    explanation: "SQL column ordering standard for natural joins.",
    hint: "Common matching column appears first in output.",
    level: "moderate"
  },
  {
    question: "Can Natural Join be performed if common attributes have identical names but incompatible data types (e.g. `VARCHAR` vs `DATE`)?",
    shortAnswer: "MySQL will attempt implicit type coercion, but if conversion fails, the query returns an error or empty result. Best practice requires explicit casting.",
    explanation: "Data type mismatch on matching column names.",
    hint: "May fail with conversion error; incompatible types should not be natural joined.",
    level: "moderate"
  },
  {
    question: "What is a 'Lossless Join Decomposition' in relation to Natural Join?",
    shortAnswer: "A decomposition of relation $R$ into $R_1$ and $R_2$ is lossless if and only if $R_1 \\bowtie R_2 \\equiv R$ (no spurious tuples are generated upon natural join).",
    explanation: "Foundation of relational normalization theory.",
    hint: "Decomposition where R1 ⨝ R2 produces the exact original relation R.",
    level: "expert"
  },
  {
    question: "What condition guarantees that decomposing $R(A, B, C)$ into $R_1(A, B)$ and $R_2(B, C)$ is Lossless?",
    shortAnswer: "The common attribute $B$ MUST be a superkey of either $R_1$ ($B \\rightarrow A$) or $R_2$ ($B \\rightarrow C$).",
    explanation: "Theorem for lossless join decomposition.",
    hint: "Common attribute must be a superkey of at least one sub-relation.",
    level: "expert"
  },
  {
    question: "What are 'Spurious Tuples' in relational join theory?",
    shortAnswer: "False, invalid rows generated by performing a Natural Join on a decomposition that lacks a candidate key on the common attribute.",
    explanation: "Definition of spurious tuples in lossy joins.",
    hint: "False/phantom rows generated by a lossy natural join.",
    level: "expert"
  },
  {
    question: "How do you project student names and course titles from a 3-table Natural Join?",
    shortAnswer: "$$\\pi_{\\text{full\\_name, course\\_title}}(\\text{Students} \\bowtie \\text{Enrollments} \\bowtie \\text{Courses})$$.",
    explanation: "Composition of Natural Joins followed by Projection.",
    hint: "π_{full_name, course_title}(Students ⨝ Enrollments ⨝ Courses).",
    level: "basic"
  },
  {
    question: "How does Natural Join eliminate duplicate columns internally without writing explicit projection lists in SQL?",
    shortAnswer: "The SQL engine parser automatically detects common column names and outputs a coalesced single column in the result table schema.",
    explanation: "Engine-level header coalescence in natural join.",
    hint: "Engine automatically coalesces common columns into a single column.",
    level: "basic"
  },
  {
    question: "What is the relationship between Semijoin (⋉) and Natural Join (⨝)?",
    shortAnswer: "$$R \\ltimes S = \\pi_{\\text{Attrs}(R)}(R \\bowtie S)$$ (Natural join projected back to the attributes of $R$ only).",
    explanation: "Definition of semijoin via natural join and projection.",
    hint: "R ⋉ S = π_{Attrs(R)}(R ⨝ S).",
    level: "expert"
  },
  {
    question: "Can an RDBMS execute a Natural Join using an index?",
    shortAnswer: "Yes! If the common attribute in the right-side relation is indexed, MySQL uses an Index Nested Loop Join or Hash Join.",
    explanation: "Index utilization during natural join.",
    hint: "Yes, uses indexes on the common attribute.",
    level: "basic"
  },
  {
    question: "Why do most corporate SQL style guides discourage `NATURAL JOIN` in production codebases?",
    shortAnswer: "Because schema migrations (adding a column to one table) can silently introduce an unintended common column, breaking existing production queries without any syntax error!",
    explanation: "Schema evolution vulnerability of natural join.",
    hint: "Adding new columns during schema migrations can silently break queries.",
    level: "expert"
  },
  {
    question: "What is the difference between `JOIN ... ON s.id = e.id` and `JOIN ... USING (id)` regarding output columns?",
    shortAnswer: "`ON` produces two separate columns `s.id` and `e.id` in `SELECT *`; `USING (id)` produces a SINGLE merged column `id` in `SELECT *`.",
    explanation: "Output column difference between ON and USING.",
    hint: "USING produces a single merged column; ON produces two separate columns.",
    level: "moderate"
  },
  {
    question: "What is the degree of $\\text{Degree}(\\text{Orders}(5) \\bowtie \\text{LineItems}(6))$ if they share 2 common columns `(order_id, branch_id)`?",
    shortAnswer: "$$5 + 6 - 2 = 9$$ columns.",
    explanation: "Multi-attribute degree calculation.",
    hint: "5 + 6 - 2 = 9.",
    level: "basic"
  },
  {
    question: "If relation $R$ has 0 tuples ($|R| = 0$), what is the result of $R \\bowtie S$?",
    shortAnswer: "The empty relation $\\emptyset$ with 0 tuples and degree equal to $\\text{Deg}(R) + \\text{Deg}(S) - k$.",
    explanation: "Empty join result on empty input relation.",
    hint: "Empty relation ∅.",
    level: "basic"
  },
  {
    question: "What is the Identity Element for Natural Join?",
    shortAnswer: "A universal relation containing all possible tuples over the shared schema (or `TABLE_DEE` over empty common attributes).",
    explanation: "Identity property in relational lattice theory.",
    hint: "Universal relation over shared attributes.",
    level: "expert"
  },
  {
    question: "What is the master checklist for mastering the Natural Join (⨝)?",
    shortAnswer: "1) Define as Equijoin on all common attributes followed by duplicate removal. 2) Degree formula: $n + m - k$. 3) Degenerates to Cartesian product if $k = 0$, and to Intersection if schemas match. 4) Use `JOIN ... USING (col)` in production to avoid accidental column joins. 5) Understand its role in lossless join decomposition.",
    explanation: "Following these 5 rules establishes complete mastery over natural join mechanics.",
    hint: "Equijoin + duplicate removal, Degree n+m-k, Boundary cases, Prefer JOIN USING, Lossless decomposition.",
    level: "basic"
  }
];

export default questions;
